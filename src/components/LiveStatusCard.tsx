import React from 'react';
import { Thermometer, Droplets, Clock, Wifi, AlertTriangle, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { SensorReading, StatusType } from '../types';
import { format } from 'date-fns';

interface LiveStatusCardProps {
  latestReading: SensorReading;
  status: StatusType;
  productName: string;
}

const LiveStatusCard: React.FC<LiveStatusCardProps> = ({ latestReading, status, productName }) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-200',
          message: 'Optimal Conditions',
          pulse: 'animate-pulse'
        };
      case 'caution':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
          border: 'border-yellow-200',
          message: 'Slightly Out of Range',
          pulse: 'animate-pulse'
        };
      case 'critical':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          border: 'border-red-200',
          message: 'Critical Breach Detected',
          pulse: 'animate-bounce'
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`bg-white rounded-3xl shadow-lg border-2 ${statusConfig.border} p-6 lg:p-8 relative overflow-hidden h-full flex flex-col`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-12 translate-x-12 lg:-translate-y-16 lg:translate-x-16 opacity-30"></div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 flex-shrink-0" />
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">Live Status</h3>
            </div>
            <p className="text-gray-600 font-medium text-sm lg:text-base truncate">{productName}</p>
          </div>
          <div className={`p-3 lg:p-4 ${statusConfig.bg} rounded-2xl shadow-sm ${statusConfig.pulse} flex-shrink-0 ml-4`}>
            <StatusIcon className={`w-6 h-6 lg:w-8 lg:h-8 ${statusConfig.color}`} />
          </div>
        </div>

        <div className={`mb-6 lg:mb-8 p-4 lg:p-6 ${statusConfig.bg} rounded-2xl border-2 ${statusConfig.border} shadow-sm`}>
          <div className="flex items-center gap-3">
            <StatusIcon className={`w-5 h-5 lg:w-6 lg:h-6 ${statusConfig.color} flex-shrink-0`} />
            <span className={`text-base lg:text-lg font-bold ${statusConfig.color} truncate`}>
              {statusConfig.message}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8 flex-1">
          <div className="group">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 lg:p-6 border border-blue-200 hover:shadow-md transition-all duration-300 h-full">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-blue-600 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Thermometer className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-blue-700 mb-1">Temperature</p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-900 truncate">
                    {latestReading.temperature.toFixed(1)}°C
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-4 lg:p-6 border border-cyan-200 hover:shadow-md transition-all duration-300 h-full">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-cyan-600 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Droplets className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-cyan-700 mb-1">Humidity</p>
                  <p className="text-2xl lg:text-3xl font-bold text-cyan-900 truncate">
                    {latestReading.humidity}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 lg:space-y-4 text-sm">
          <div className="flex items-center gap-3 p-3 lg:p-4 bg-gray-50 rounded-xl">
            <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-medium text-gray-700">Last updated:</span>
              <span className="ml-2 text-gray-900 text-xs lg:text-sm">{format(new Date(latestReading.timestamp), 'PPp')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 lg:p-4 bg-gray-50 rounded-xl">
            <Wifi className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-medium text-gray-700">Sensor:</span>
              <span className="ml-2 text-gray-900 font-mono text-xs lg:text-sm truncate">{latestReading.sensorId}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 lg:p-4 bg-gray-50 rounded-xl">
            <span className="w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center text-base lg:text-lg flex-shrink-0">📍</span>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-gray-700">Location:</span>
              <span className="ml-2 text-gray-900 text-xs lg:text-sm truncate">{latestReading.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatusCard;