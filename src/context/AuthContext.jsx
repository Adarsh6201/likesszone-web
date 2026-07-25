import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('likesszon_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('likesszon_dark_mode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync dark mode class & localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('likesszon_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('likesszon_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('likesszon_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@likesszon.com' && password === 'admin123') {
          const adminUser = {
            id: 'u-admin',
            name: 'Admin Boss',
            email: 'admin@likesszon.com',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          };
          setUser(adminUser);
          setLoading(false);
          resolve(adminUser);
        } else if (email === 'user@likesszon.com' && password === 'user123') {
          const customerUser = {
            id: 'u-cust',
            name: 'Jane Doe',
            email: 'user@likesszon.com',
            role: 'customer',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
          };
          setUser(customerUser);
          setLoading(false);
          resolve(customerUser);
        } else {
          setLoading(false);
          const errMsg = 'Invalid email or password. Use admin@likesszon.com / admin123 or user@likesszon.com / user123';
          setError(errMsg);
          reject(new Error(errMsg));
        }
      }, 500);
    });
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `u-${Date.now()}`,
          name,
          email,
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        };
        setUser(newUser);
        setLoading(false);
        resolve(newUser);
      }, 500);
    });
  };

  const updateProfile = async (updatedData) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser((prev) => {
          const next = { ...prev, ...updatedData };
          localStorage.setItem('likesszon_user', JSON.stringify(next));
          return next;
        });
        setLoading(false);
        resolve();
      }, 300);
    });
  };

  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 400);
    });
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isDarkMode,
    setIsDarkMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
