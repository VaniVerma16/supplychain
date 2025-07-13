import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Hash, Clock, Database } from 'lucide-react';
import { Product } from '../types';
import { format } from 'date-fns';

interface BlockchainVerificationCardProps {
  product: Product;
}

const BlockchainVerificationCard: React.FC<BlockchainVerificationCardProps> = ({ product }) => {
  const tamperedReadings = product.sensorReadings.filter(reading => reading.tampered);
  const latestReading = product.sensorReadings[product.sensorReadings.length - 1];

  const getVerificationStatus = () => {
    if (product.tamperingDetected) {
      return {
        icon: AlertTriangle,
        color: 'text-red-600',
        bg: 'bg-gradient-to-br from-red-50 to-red-100',
        border: 'border-red-200',
        title: 'Data Tampering Detected',
        message: 'Blockchain verification failed - data integrity compromised',
        pulse: 'animate-bounce'
      };
    }
    return {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-200',
      title: 'Blockchain Verified',
      message: 'All data integrity checks passed',
      pulse: 'animate-pulse'
    };
  };

  const status = getVerificationStatus();
  const StatusIcon = status.icon;

  return (
    <div className={`bg-white rounded-3xl shadow-lg border-2 ${status.border} p-6 lg:p-8 relative overflow-hidden h-full flex flex-col`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-12 translate-x-12 lg:-translate-y-16 lg:translate-x-16 opacity-30"></div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className={`p-3 lg:p-5 ${status.bg} rounded-3xl shadow-sm ${status.pulse} flex-shrink-0`}>
            <StatusIcon className={`w-8 h-8 lg:w-10 lg:h-10 ${status.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 flex-shrink-0" />
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">Blockchain</h3>
            </div>
            <p className={`text-lg lg:text-xl font-bold ${status.color} truncate`}>{status.title}</p>
          </div>
        </div>

        <div className={`p-4 lg:p-6 ${status.bg} rounded-2xl border-2 ${status.border} mb-6 lg:mb-8 shadow-sm`}>
          <p className="text-gray-800 leading-relaxed text-base lg:text-lg font-medium">{status.message}</p>
        </div>

        <div className="space-y-4 lg:space-y-6 flex-1">
          <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-3 lg:gap-4">
              <div className="p-2 lg:p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Hash className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1">Latest Block Hash</p>
                <p className="text-xs lg:text-sm font-mono text-gray-900 break-all leading-relaxed">{latestReading.blockchainHash}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Database className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Total Readings</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{product.sensorReadings.length}</p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className={`p-2 lg:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ${
                  tamperedReadings.length > 0 ? 'bg-gradient-to-br from-red-100 to-red-200' : 'bg-gradient-to-br from-green-100 to-green-200'
                }`}>
                  <AlertTriangle className={`w-5 h-5 lg:w-6 lg:h-6 ${tamperedReadings.length > 0 ? 'text-red-600' : 'text-green-600'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Tampered Records</p>
                  <p className={`text-xl lg:text-2xl font-bold ${tamperedReadings.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {tamperedReadings.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {product.tamperingDetected && (
          <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 lg:p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-red-500 flex-shrink-0" />
                <span className="font-bold text-red-800">Security Alert</span>
              </div>
              <p className="text-xs lg:text-sm text-red-700 mb-2">
                Data tampering detected at {tamperedReadings.length} checkpoint(s). 
                Blockchain verification failed for sensor readings.
              </p>
              <div className="text-xs text-red-600">
                <span className="font-medium">Last verified:</span>
                <span className="ml-2">{format(new Date(latestReading.timestamp), 'PPp')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainVerificationCard;