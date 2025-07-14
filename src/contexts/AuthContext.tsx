import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, LoginCredentials, User } from '../types/auth';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'farmer@terratrace.com',
    name: 'Rajesh Kumar',
    role: 'upstream',
    company: 'TerraTrace',
    permissions: ['view_upstream', 'track_products']
  },
  {
    id: '2',
    email: 'retailer@terratrace.com',
    name: 'Priya Sharma',
    role: 'downstream',
    company: 'TerraTrace',
    permissions: ['view_downstream', 'track_products']
  },
  {
    id: '3',
    email: 'admin@terratrace.com',
    name: 'Arjun Patel',
    role: 'admin',
    company: 'TerraTrace',
    permissions: ['manage_users', 'view_all_data', 'configure_alerts', 'export_reports']
  }
];

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  // Only allow login for known demo users (by email)
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

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
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setAuthState(prev => ({
        ...prev,
        user
      }));
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
