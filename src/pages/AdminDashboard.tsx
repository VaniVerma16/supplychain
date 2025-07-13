import React, { useState } from 'react';
import { Users, Settings, BarChart3, Shield, AlertTriangle, CheckCircle, Download, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { mockProducts } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock admin data
  const systemStats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'blue', change: '+12%' },
    { label: 'Active Batches', value: '89', icon: BarChart3, color: 'green', change: '+5%' },
    { label: 'System Alerts', value: '23', icon: AlertTriangle, color: 'yellow', change: '-8%' },
    { label: 'Compliance Rate', value: '96.2%', icon: Shield, color: 'purple', change: '+2%' }
  ];

  const recentUsers = [
    { id: 1, name: 'John Farmer', email: 'farmer@example.com', role: 'upstream', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Store', email: 'retailer@example.com', role: 'downstream', status: 'active', lastLogin: '4 hours ago' },
    { id: 3, name: 'Mike Transport', email: 'transport@example.com', role: 'upstream', status: 'inactive', lastLogin: '2 days ago' },
    { id: 4, name: 'Lisa Quality', email: 'quality@example.com', role: 'downstream', status: 'active', lastLogin: '1 hour ago' }
  ];

  const systemAlerts = [
    { id: 1, type: 'security', message: 'Unusual login pattern detected', severity: 'high', time: '15 min ago' },
    { id: 2, type: 'performance', message: 'Database query performance degraded', severity: 'medium', time: '1 hour ago' },
    { id: 3, type: 'compliance', message: 'Audit report ready for review', severity: 'low', time: '2 hours ago' },
    { id: 4, type: 'blockchain', message: 'Blockchain sync completed successfully', severity: 'info', time: '3 hours ago' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'alerts', label: 'System Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'info': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">नमस्ते {user?.name}! ⚙️</h1>
              <p className="text-xl text-purple-100 mb-4">System Administrator Dashboard</p>
              <p className="text-purple-100">
                Monitor system health, manage users, configure alerts, and ensure compliance across the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 font-medium transition-colors duration-200 ${
                      selectedTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* System Health */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">System Health</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">Blockchain Network</span>
                        </div>
                        <span className="text-green-600 font-semibold">Operational</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-900">Database</span>
                        </div>
                        <span className="text-green-600 font-semibold">Healthy</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-yellow-900">API Response Time</span>
                        </div>
                        <span className="text-yellow-600 font-semibold">Degraded</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {systemAlerts.slice(0, 4).map((alert) => (
                        <div key={alert.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity).split(' ')[1]}`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-2xl transition-all duration-200 group">
                      <Download className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-semibold text-purple-700">Export Reports</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-2xl transition-all duration-200 group">
                      <Settings className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-semibold text-blue-700">Configure Alerts</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 rounded-2xl transition-all duration-200 group">
                      <Eye className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-semibold text-green-700">View All Data</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-200">
                    Add User
                  </button>
                </div>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </div>
                        <span className="text-sm text-gray-500">{user.lastLogin}</span>
                        <button className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-colors duration-200">
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'alerts' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">System Alerts</h3>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 border-2 rounded-xl ${getSeverityColor(alert.severity)}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                          </div>
                          <p className="font-medium text-gray-900">{alert.message}</p>
                          <p className="text-sm text-gray-600 capitalize">Type: {alert.type}</p>
                        </div>
                        <button className="px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'settings' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">System Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Alert Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-700">Temperature Threshold</span>
                        <input type="number" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" defaultValue="8" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-700">Humidity Threshold</span>
                        <input type="number" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" defaultValue="95" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-700">Alert Frequency</span>
                        <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                          <option>Immediate</option>
                          <option>Hourly</option>
                          <option>Daily</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">System Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-700">Blockchain Sync</span>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                          Enabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-700">Auto Backup</span>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                          Daily
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-700">Data Retention</span>
                        <span className="text-gray-600 text-sm">365 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;