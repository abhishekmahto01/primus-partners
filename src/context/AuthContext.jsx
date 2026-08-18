import React, { createContext, useContext, useState, useEffect } from 'react';
import { STATIC_CREDENTIALS, STATIC_OTP, STORAGE_KEYS } from '../config/authConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setIsAuthenticated(parsed.isAuthenticated || false);
        setIsOtpVerified(parsed.isOtpVerified || false);
        setUser(parsed.user || null);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
      }
    }
  }, []);

  const saveAuthState = (auth, otp, userData) => {
    setIsAuthenticated(auth);
    setIsOtpVerified(otp);
    setUser(userData);
    localStorage.setItem(
      STORAGE_KEYS.AUTH_STATE,
      JSON.stringify({ isAuthenticated: auth, isOtpVerified: otp, user: userData })
    );
  };

  const login = (userId, password) => {
    if (userId === STATIC_CREDENTIALS.userId && password === STATIC_CREDENTIALS.password) {
      saveAuthState(true, false, { userId, name: "Admin User" });
      return { success: true };
    }
    return { success: false, message: "Invalid User ID or password." };
  };

  const verifyOtp = (otp) => {
    if (otp === STATIC_OTP) {
      saveAuthState(true, true, user || { userId: "admin", name: "Admin User" });
      return { success: true };
    }
    return { success: false, message: "Invalid OTP. Please try again." };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsOtpVerified(false);
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isOtpVerified, user, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
