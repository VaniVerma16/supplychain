import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'farmer@supply.com',
    name: 'Rajesh Kumar',
    role: 'upstream',
    company: 'Green Valley Farms, Punjab',
    permissions: ['view_batches', 'update_batch_metadata', 'confirm_handoff']
  },
  {
    id: '2',
    email: 'retailer@supply.com',
    name: 'Priya Sharma',
    role: 'downstream',
    company: 'Fresh Mart Mumbai',
    permissions: ['view_batches', 'trigger_alerts', 'receive_batches']
  },
  {
    id: '3',
    email: 'admin@supply.com',
    name: 'Arjun Patel',
    role: 'admin',
    company: 'SupplyChain India Ltd',
    permissions: ['manage_users', 'view_all_data', 'configure_alerts', 'export_reports']
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any of the demo emails with any password
    const user = mockUsers.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
    
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('currentUser');
  };

  const switchRole = (role: string) => {
    // For demo purposes - switch between roles
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setAuthState(prev => ({
        ...prev,
        user
      }));
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};