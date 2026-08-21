import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Login } from './pages/Login';
import { OtpVerification } from './pages/OtpVerification';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { HrmsLayout } from './components/layout/HrmsLayout';
import { OnboardingPage } from './pages/hrms/OnboardingPage';
import { DummyModulePage } from './pages/hrms/DummyModulePage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/otp-verification" element={<OtpVerification />} />

            {/* Main Dashboard Portal */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* HRMS Portal Routes (Top Navbar + Collapsible Sidebar Menu) */}
            <Route
              path="/hrms"
              element={
                <ProtectedRoute>
                  <HrmsLayout />
                </ProtectedRoute>
              }
            >
              {/* Default HRMS route opens Onboarding workspace */}
              <Route index element={<OnboardingPage />} />
              <Route path="onboarding" element={<OnboardingPage />} />
              <Route path="module/:moduleId" element={<DummyModulePage />} />
              <Route path="*" element={<Navigate to="/hrms/onboarding" replace />} />
            </Route>

            {/* Fallback Wildcard Route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
