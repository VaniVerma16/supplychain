import React, { useState } from 'react';
import { LogOut, User, Settings, Shield, ChevronDown, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'upstream': return 'from-green-500 to-green-600';
      case 'downstream': return 'from-blue-500 to-blue-600';
      case 'admin': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'upstream': return '🌱';
      case 'downstream': return '🏪';
      case 'admin': return '⚙️';
      default: return '👤';
    }
  };

  const demoRoles = [
    { role: 'upstream', label: 'Upstream Participant', email: 'farmer@example.com' },
    { role: 'downstream', label: 'Downstream Participant', email: 'retailer@example.com' },
    { role: 'admin', label: 'System Administrator', email: 'admin@example.com' }
  ];

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Supply Chain
              </h1>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors duration-200"
            >
              <div className={`p-2 bg-gradient-to-br ${getRoleColor(user.role)} rounded-lg text-white text-sm`}>
                {getRoleIcon(user.role)}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role} User</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-br ${getRoleColor(user.role)} rounded-xl text-white text-lg`}>
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.company && (
                        <div className="flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{user.company}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Demo Role Switcher */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Demo: Switch Role</p>
                  <div className="space-y-1">
                    {demoRoles.map((roleOption) => (
                      <button
                        key={roleOption.role}
                        onClick={() => {
                          switchRole(roleOption.role);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          user.role === roleOption.role 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{getRoleIcon(roleOption.role)}</span>
                          <span>{roleOption.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu Items */}
                <div className="px-2 py-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                    Preferences
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;