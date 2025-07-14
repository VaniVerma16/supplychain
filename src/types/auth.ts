export interface User {
  id: string;
  email: string;
  name: string;
  role: 'external' | 'upstream' | 'downstream' | 'admin';
  company?: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type UserRole = 'external' | 'upstream' | 'downstream' | 'admin';

export interface LoginCredentials {
  email: string;
  password: string;
}