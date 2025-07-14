import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, CheckCircle, Plus, Upload, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { mockProducts } from '../data/mockData';
import { useToast } from '../components/Navbar';
import LiveSensorPanel from '../components/LiveSensorPanel';

const UpstreamDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const toast = useToast();

  // Mock data for upstream participants
  const myBatches = mockProducts.filter(p => p.productType === 'milk' || p.productType === 'strawberries');
  const recentActivity = [
    { id: 1, action: 'Batch Created', batch: 'BATCH_M_045', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Quality Check', batch: 'BATCH_S_089', time: '4 hours ago', status: 'warning' },
    { id: 3, action: 'Handoff Confirmed', batch: 'BATCH_M_044', time: '6 hours ago', status: 'success' },
    { id: 4, action: 'Temperature Alert', batch: 'BATCH_S_088', time: '8 hours ago', status: 'error' }
  ];

  const stats = [
    { label: 'Active Batches', value: '12', icon: Package, color: 'blue' },
    { label: 'Quality Score', value: '94%', icon: TrendingUp, color: 'green' },
    { label: 'Alerts Today', value: '3', icon: AlertTriangle, color: 'yellow' },
    { label: 'Completed', value: '8', icon: CheckCircle, color: 'purple' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">नमस्ते {user?.name}! 🌱</h1>
              <p className="text-xl text-green-100 mb-4">Upstream Participant Dashboard</p>
              <p className="text-green-100">
                Manage your batches, monitor quality, and ensure seamless handoffs to the next stage.
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
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button onClick={() => toast('Batch delivery confirmed! (demo)')} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-2xl transition-all duration-200 group">
                  <Plus className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-green-700">Confirm Handoff</span>
                </button>
                <button onClick={() => toast('Batch metadata uploaded! (demo)')} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-2xl transition-all duration-200 group">
                  <Upload className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-blue-700">Upload Metadata</span>
                </button>
                <button onClick={() => toast('Quality assurance update triggered! (demo)')} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-2xl transition-all duration-200 group">
                  <CheckCircle className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold text-purple-700">Trigger QA Update</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status).split(' ')[1]}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.batch} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Batches */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Batches</h2>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors duration-200">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {myBatches.map((batch) => {
                  const latestReading = batch.sensorReadings[batch.sensorReadings.length - 1];
                  const isSelected = selectedBatch === batch.batchId;
                  
                  return (
                    <div
                      key={batch.batchId}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                      }`}
                      onClick={() => setSelectedBatch(isSelected ? null : batch.batchId)}
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
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              batch.tamperingDetected 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {batch.tamperingDetected ? 'Alert' : 'Normal'}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 truncate">{latestReading.location}</span>
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
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button onClick={() => toast('Handoff flagged as issue! (demo)')} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors duration-200">
                              Flag Handoff Issue
                            </button>
                            <button onClick={() => toast('Validation/tamper check complete! (demo)')} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-colors duration-200">
                              Validate/Tamper Check
                            </button>
                            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors duration-200">
                              Confirm Handoff
                            </button>
                          </div>
                          {/* Live Sensor Panel: Only show for upstream user */}
                          {user?.role === 'upstream' && (
                            <div className="mt-8">
                              <LiveSensorPanel />
                            </div>
                          )}
                        </div>
                      )}
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

export default UpstreamDashboard;