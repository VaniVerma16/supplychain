import React, { useState } from 'react';
import { LogIn, User, Lock, Eye, EyeOff, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const demoUsers = [
  {
    email: 'farmer@supply.com',
    name: 'Rajesh Kumar',
    role: 'upstream',
    company: 'Green Valley Farms, Punjab',
    color: 'from-green-500 to-green-600',
    icon: '🌱'
  },
  {
    email: 'retailer@supply.com',
    name: 'Priya Sharma',
    role: 'downstream',
    company: 'Fresh Mart Mumbai',
    color: 'from-blue-500 to-blue-600',
    icon: '🏪'
  },
  {
    email: 'admin@supply.com',
    name: 'Arjun Patel',
    role: 'admin',
    company: 'SupplyChain India Ltd',
    color: 'from-purple-500 to-purple-600',
    icon: '⚙️'
  }
];

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(credentials);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please use one of the demo accounts below for your role.');
    }
  };

  const quickLogin = (email: string) => {
    setCredentials({ email, password: 'demo123' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-lg">
              <Package className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">Supply Tracker</h1>
              <p className="text-xl text-blue-100 font-medium">Cold Chain Traceability Platform</p>
            </div>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Track your food products from farm to table. Verify quality, check for tampering, and ensure food safety with blockchain technology.
          </p>
        </div>
      </div>
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Participant Login</h2>
            <p className="text-gray-600 text-lg">For farmers, retailers, transporters, and administrators</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl inline-block mb-4">
                  <LogIn className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
                <p className="text-gray-600">Sign in to access your dashboard</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      placeholder="Any password for demo"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            </div>
            {/* Demo Users by Role */}
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Demo Accounts</h4>
                <p className="text-gray-600">Click a user for quick login</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Upstream/Downstream Participants</h5>
                <div className="space-y-4 mb-6">
                  {demoUsers.filter(u => u.role !== 'admin').map((user, index) => (
                    <button
                      key={user.email}
                      onClick={() => quickLogin(user.email)}
                      className="w-full p-6 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-2xl text-left transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-4 bg-gradient-to-br ${user.color} rounded-2xl text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          {user.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{user.name}</h4>
                          <p className="text-sm font-medium text-gray-600">{user.role}</p>
                          <p className="text-sm text-gray-500">{user.company}</p>
                          <p className="text-xs text-blue-600 font-mono mt-1">{user.email}</p>
                        </div>
                        <div className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200">
                          <LogIn className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <h5 className="font-semibold text-gray-700 mb-2">Admin</h5>
                <div>
                  {demoUsers.filter(u => u.role === 'admin').map(user => (
                    <button
                      key={user.email}
                      onClick={() => quickLogin(user.email)}
                      className="w-full p-6 bg-white hover:bg-gray-50 border border-purple-200 hover:border-purple-400 rounded-2xl text-left transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-4 bg-gradient-to-br ${user.color} rounded-2xl text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          {user.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-800 transition-colors duration-200">{user.name}</h4>
                          <p className="text-sm font-medium text-gray-600">{user.role}</p>
                          <p className="text-sm text-gray-500">{user.company}</p>
                          <p className="text-xs text-purple-700 font-mono mt-1">{user.email}</p>
                        </div>
                        <div className="text-gray-400 group-hover:text-purple-700 transition-colors duration-200">
                          <LogIn className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-green-900">Need to Track a Product?</h4>
                </div>
                <p className="text-sm text-green-700 mb-4">Consumers, regulators, and auditors can track products without logging in.</p>
                <Link
                  to="/external"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors duration-200"
                >
                  <Package className="w-4 h-4" />
                  Track Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
