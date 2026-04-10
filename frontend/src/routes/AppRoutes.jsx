import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import MedicalReportPage from '../pages/MedicalReportPage';
import HistoryPage from '../pages/HistoryPage';
import MedicalRecordsPage from '../pages/MedicalRecordsPage';
import ShareQRPage from '../pages/ShareQRPage';
import SettingsPage from '../pages/SettingsPage';
import SharedRecordPage from '../pages/SharedRecordPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/shared/:token" element={<SharedRecordPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/medicalreport"
            element={
              <ProtectedRoute>
                <MedicalReportPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/medical-records"
            element={
              <ProtectedRoute>
                <MedicalReportPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/share"
            element={
              <ProtectedRoute>
                <ShareQRPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;