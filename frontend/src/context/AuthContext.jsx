import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        // Validate token by fetching user profile
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Clear invalid auth data
      authAPI.logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login({
        username: email,
        password,
      });

      // Store auth data
      authAPI.setAuthData(response.access_token, response.user || { email });

      // Update state
      setUser(response.user || { email });
      setIsAuthenticated(true);

      return { success: true, data: response };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.detail || 'Login failed. Please check your credentials.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.signup(userData);

      // Auto-login after successful signup
      if (response.access_token) {
        authAPI.setAuthData(response.access_token, response);
        setUser(response);
        setIsAuthenticated(true);
      }

      return { success: true, data: response };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error.detail || 'Registration failed. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };


  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const refreshUser = async () => {
    try {
      const userData = await authAPI.getCurrentUser();
      updateUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;