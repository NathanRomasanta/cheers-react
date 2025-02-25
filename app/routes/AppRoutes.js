// routes/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../_utils/AuthContext";
import Dashboard from "../pages/Dashboard";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";
import LoadingScreen from "../_utils/LoadingScreen";

// Protected route wrapper for regular users
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!currentUser) {
    return <Navigate to="../pages/login" />;
  }

  return children;
};

// Admin route wrapper
const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!currentUser) {
    return <Navigate to="../pages/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="../pages/dashboard" />;
  }

  return children;
};

export default function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="../pages/dashboard*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="../pages/admin*"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />

      <Route path="/" element={<Navigate to="../pages/dashboard" />} />
      <Route path="*" element={<Navigate to="../pages/dashboard" />} />
    </Routes>
  );
}
