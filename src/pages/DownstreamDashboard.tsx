import React, { useState } from 'react';
import { ShoppingCart, TrendingDown, AlertTriangle, CheckCircle, Bell, Eye, Package, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { mockProducts } from '../data/mockData';

const DownstreamDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  // Mock data for downstream participants
  const receivedBatches = mockProducts.filter(p => p.productType === 'chicken' || p.productType === 'milk');
  const alerts = [
    { 
      id: 1, 
      type: 'temperature', 
      batch: 'BATCH_M_045', 
      message: 'Temperature exceeded safe range for 2 hours', 
      severity: 'high',
      time: '30 min ago',
      product: 'Pasteurized Cow Milk'
    },
    { 
      id: 2, 
      type: 'spoilage', 
      batch: 'BATCH_S_089', 
      message: 'High spoilage risk detected', 
      severity: 'medium',
      time: '1 hour ago',
      product: 'Organic Strawberries'
    },
    { 
      id: 3, 
      type: 'recall', 
      batch: 'BATCH_C_123', 
      message: 'Quality assurance update required', 
      severity: 'low',
      time: '2 hours ago',
      product: 'Free Range Chicken'
    }
  ];

  const stats = [
    { label: 'Received Batches', value: '24', icon: ShoppingCart, color: 'blue' },
    { label: 'Spoilage Risk', value: '8%', icon: TrendingDown, color: 'red' },
    { label: 'Active Alerts', value: '5', icon: AlertTriangle, color: 'yellow' },
    { label: 'Quality Passed', value: '92%', icon: CheckCircle, color: 'green' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">नमस्ते {user?.name}! 🏪</h1>
              <p className="text-xl text-blue-100 mb-4">Downstream Participant Dashboard</p>
              <p className="text-blue-100">
                Monitor incoming batches, track spoilage risks, and manage quality alerts for your inventory.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alerts & Notifications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
              </div>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedAlert === alert.id.toString()
                        ? getSeverityColor(alert.severity)
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAlert(
                      selectedAlert === alert.id.toString() ? null : alert.id.toString()
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </div>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{alert.product}</h4>
                    <p className="text-sm text-gray-600 mb-2">{alert.batch}</p>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                    
                    {selectedAlert === alert.id.toString() && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors duration-200">
                            View Details
                          </button>
                          <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors duration-200">
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-2xl transition-all duration-200 group">
                  <Bell className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-blue-700">Trigger Alert</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-2xl transition-all duration-200 group">
                  <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-green-700">Receive Batch</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-2xl transition-all duration-200 group">
                  <Eye className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-purple-700">Monitor Freshness</span>
                </button>
              </div>
            </div>
          </div>

          {/* Received Batches */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Received Batches</h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {receivedBatches.map((batch) => {
                  const latestReading = batch.sensorReadings[batch.sensorReadings.length - 1];
                  const hasAlert = alerts.some(alert => alert.batch === batch.batchId);
                  
                  return (
                    <div
                      key={batch.batchId}
                      className={`p-6 border-2 rounded-2xl transition-all duration-200 ${
                        hasAlert 
                          ? 'border-red-200 bg-red-50' 
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={batch.imageUrl}
                          alt={batch.productName}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{batch.productName}</h3>
                              <p className="text-sm text-gray-600">{batch.batchId}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {hasAlert && (
                                <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                  Alert
                                </div>
                              )}
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                batch.tamperingDetected 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {batch.tamperingDetected ? 'Tampered' : 'Verified'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">ID: {batch.productId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {new Date(latestReading.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-gray-600">
                              Temp: {latestReading.temperature.toFixed(1)}°C
                            </div>
                            <div className="text-gray-600">
                              Humidity: {latestReading.humidity}%
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200 text-sm">
                              View Journey
                            </button>
                            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors duration-200 text-sm">
                              Check Freshness
                            </button>
                            {hasAlert && (
                              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors duration-200 text-sm">
                                View Alert
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownstreamDashboard;