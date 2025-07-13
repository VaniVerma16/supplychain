import React from 'react';
import { MapPin, Clock, Thermometer, Droplets, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { JourneyEvent, SensorReading } from '../types';
import { format } from 'date-fns';
import { getStatusFromReading } from '../utils/qualityAssessment';

interface JourneyTimelineProps {
  journeyLog: JourneyEvent[];
  sensorReadings: SensorReading[];
  idealTempRange: [number, number];
  idealHumidityRange: [number, number];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  journeyLog,
  sensorReadings,
  idealTempRange,
  idealHumidityRange
}) => {
  // Merge journey events with sensor readings for complete timeline
  const timelineData = journeyLog.map(event => {
    const sensorReading = sensorReadings.find(reading => 
      Math.abs(new Date(reading.timestamp).getTime() - new Date(event.timestamp).getTime()) < 30 * 60 * 1000 // Within 30 minutes
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
        sensorId: 'EVENT'
      };
      status = getStatusFromReading(mockReading, idealTempRange, idealHumidityRange);
    }

    return {
      ...event,
      sensorReading,
      status
    };
  });

  const getStatusConfig = (status: 'safe' | 'caution' | 'critical') => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-100',
          border: 'border-green-300',
          line: 'bg-green-400'
        };
      case 'caution':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          border: 'border-yellow-300',
          line: 'bg-yellow-400'
        };
      case 'critical':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bg: 'bg-red-100',
          border: 'border-red-300',
          line: 'bg-red-400'
        };
    }
  };

  return (
    <div className="relative">
      {timelineData.map((item, index) => {
        const config = getStatusConfig(item.status);
        const StatusIcon = config.icon;
        const isLast = index === timelineData.length - 1;

        return (
          <div key={index} className="relative flex gap-6 pb-8">
            {/* Timeline Line */}
            {!isLast && (
              <div className={`absolute left-6 top-12 w-0.5 h-full ${config.line} opacity-30`} />
            )}

            {/* Status Icon */}
            <div className={`flex-shrink-0 w-12 h-12 ${config.bg} ${config.border} border-2 rounded-full flex items-center justify-center z-10`}>
              <StatusIcon className={`w-6 h-6 ${config.color}`} />
            </div>

            {/* Content Card */}
            <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{item.event}</h3>
                    <span className={`px-3 py-1 ${config.bg} ${config.color} rounded-full text-sm font-medium capitalize`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{item.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(item.timestamp), 'PPp')}</span>
                  </div>

                  <p className="text-gray-700">{item.notes}</p>
                </div>

                {/* Environmental Data */}
                {(item.temperature || item.humidity || item.sensorReading) && (
                  <div className="flex-shrink-0 bg-gray-50 rounded-xl p-4 min-w-0 lg:min-w-[200px]">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Environmental Data</h4>
                    <div className="space-y-3">
                      {(item.temperature || item.sensorReading?.temperature) && (
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-900">
                            {(item.temperature || item.sensorReading?.temperature)?.toFixed(1)}°C
                          </span>
                        </div>
                      )}
                      {(item.humidity || item.sensorReading?.humidity) && (
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-cyan-600" />
                          <span className="text-sm text-gray-900">
                            {item.humidity || item.sensorReading?.humidity}%
                          </span>
                        </div>
                      )}
                      {item.sensorReading && (
                        <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                          Sensor: {item.sensorReading.sensorId}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JourneyTimeline;