import React, { useState } from 'react';
import { JourneyEvent } from '../types';
import { format } from 'date-fns';
import { Filter, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface JourneyLogTableProps {
  journeyLog: JourneyEvent[];
  idealTempRange: [number, number];
  idealHumidityRange: [number, number];
}

const JourneyLogTable: React.FC<JourneyLogTableProps> = ({ 
  journeyLog, 
  idealTempRange, 
  idealHumidityRange 
}) => {
  const [filter, setFilter] = useState<'all' | 'breaches' | 'normal'>('all');

  const getEventStatus = (event: JourneyEvent) => {
    if (!event.temperature || !event.humidity) return 'info';
    
    const tempBreach = event.temperature < idealTempRange[0] || event.temperature > idealTempRange[1];
    const humidityBreach = event.humidity < idealHumidityRange[0] || event.humidity > idealHumidityRange[1];
    
    if (tempBreach || humidityBreach) return 'breach';
    return 'normal';
  };

  const filteredLog = journeyLog.filter(event => {
    if (filter === 'all') return true;
    const status = getEventStatus(event);
    if (filter === 'breaches') return status === 'breach';
    if (filter === 'normal') return status === 'normal';
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'breach':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'normal':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getRowStyle = (status: string) => {
    switch (status) {
      case 'breach':
        return 'bg-red-50 border-l-4 border-red-400';
      case 'normal':
        return 'bg-green-50 border-l-4 border-green-400';
      default:
        return 'bg-white border-l-4 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Journey Log</h3>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'breaches' | 'normal')}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Events</option>
            <option value="breaches">Breaches Only</option>
            <option value="normal">Normal Events</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Timestamp</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Event</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Temperature</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Humidity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLog.map((event, index) => {
              const status = getEventStatus(event);
              return (
                <tr key={index} className={`${getRowStyle(status)} transition-all duration-200 hover:shadow-sm`}>
                  <td className="py-4 px-4">
                    {getStatusIcon(status)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {format(new Date(event.timestamp), 'MMM dd, HH:mm')}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {event.location}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {event.event}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {event.temperature ? `${event.temperature.toFixed(1)}°C` : '-'}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {event.humidity ? `${event.humidity}%` : '-'}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 max-w-xs">
                    {event.notes}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredLog.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No events match the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default JourneyLogTable;