import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { JourneyEvent, SensorReading } from '../types';
import { format } from 'date-fns';
import { getStatusFromReading } from '../utils/qualityAssessment';
import 'leaflet/dist/leaflet.css';

interface JourneyMapProps {
  journeyLog: JourneyEvent[];
  sensorReadings: SensorReading[];
  idealTempRange: [number, number];
  idealHumidityRange: [number, number];
}

// Custom marker icons
const createCustomIcon = (status: 'safe' | 'caution' | 'critical') => {
  const colors = {
    safe: '#10B981',
    caution: '#F59E0B',
    critical: '#EF4444'
  };

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${colors[status]}" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const JourneyMap: React.FC<JourneyMapProps> = ({
  journeyLog,
  sensorReadings,
  idealTempRange,
  idealHumidityRange
}) => {
  const mapRef = useRef<any>(null);

  // Create path coordinates
  const pathCoordinates: LatLngExpression[] = journeyLog.map(event => event.coordinates);

  // Get status for each journey event
  const journeyWithStatus = journeyLog.map(event => {
    const sensorReading = sensorReadings.find(reading => 
      Math.abs(new Date(reading.timestamp).getTime() - new Date(event.timestamp).getTime()) < 30 * 60 * 1000
    );

    let status: 'safe' | 'caution' | 'critical' = 'safe';
    if (sensorReading) {
      status = getStatusFromReading(sensorReading, idealTempRange, idealHumidityRange);
    } else if (event.temperature && event.humidity) {
      const mockReading: SensorReading = {
        timestamp: event.timestamp,
        temperature: event.temperature,
        humidity: event.humidity,
        location: event.location,
        sensorId: 'EVENT',
        coordinates: event.coordinates
      };
      status = getStatusFromReading(mockReading, idealTempRange, idealHumidityRange);
    }

    return { ...event, status };
  });

  // Calculate map bounds
  useEffect(() => {
    if (mapRef.current && pathCoordinates.length > 0) {
      const map = mapRef.current;
      const bounds = pathCoordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new (window as any).L.LatLngBounds(pathCoordinates[0], pathCoordinates[0]));
      
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [pathCoordinates]);

  const getStatusColor = (status: 'safe' | 'caution' | 'critical') => {
    switch (status) {
      case 'safe': return '#10B981';
      case 'caution': return '#F59E0B';
      case 'critical': return '#EF4444';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Journey Map</h3>
        <p className="text-gray-600">Interactive map showing the complete journey path with status indicators</p>
        
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Safe Conditions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Caution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Critical Breach</span>
          </div>
        </div>
      </div>

      <div className="h-96 relative">
        <MapContainer
          ref={mapRef}
          center={pathCoordinates[0] || [40.7128, -74.0060]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Journey path */}
          <Polyline
            positions={pathCoordinates}
            color="#3B82F6"
            weight={4}
            opacity={0.8}
            dashArray="10, 10"
          />

          {/* Journey markers */}
          {journeyWithStatus.map((event, index) => (
            <Marker
              key={index}
              position={event.coordinates}
              icon={createCustomIcon(event.status)}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(event.status) }}
                    ></div>
                    <h4 className="font-bold text-gray-900">{event.location}</h4>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Event:</span>
                      <span className="ml-2 text-gray-900">{event.event}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Time:</span>
                      <span className="ml-2 text-gray-900">
                        {format(new Date(event.timestamp), 'PPp')}
                      </span>
                    </div>
                    
                    {event.temperature && (
                      <div>
                        <span className="font-medium text-gray-700">Temperature:</span>
                        <span className="ml-2 text-gray-900">{event.temperature.toFixed(1)}°C</span>
                      </div>
                    )}
                    
                    {event.humidity && (
                      <div>
                        <span className="font-medium text-gray-700">Humidity:</span>
                        <span className="ml-2 text-gray-900">{event.humidity}%</span>
                      </div>
                    )}
                    
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span 
                        className="ml-2 px-2 py-1 rounded-full text-xs font-medium capitalize"
                        style={{ 
                          backgroundColor: getStatusColor(event.status) + '20',
                          color: getStatusColor(event.status)
                        }}
                      >
                        {event.status}
                      </span>
                    </div>
                    
                    {event.notes && (
                      <div className="pt-2 border-t border-gray-200">
                        <span className="font-medium text-gray-700">Notes:</span>
                        <p className="mt-1 text-gray-600">{event.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default JourneyMap;