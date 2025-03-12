"use client";

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../_utils/AuthContext";
import Inventory from "../inventory/page"; // Assuming this is your inventory page component

import Login from "../pages/login/page";
import LoadingScreen from "../_utils/LoadingScreen";
import { db } from "../_utils/Firebase";
import { doc, getDoc } from "firebase/firestore";
import AdminPanel from "../admin/page";
const AppRoutes = () => {
  const { currentUser, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdminStatus, setCheckingAdminStatus] = useState(true);

  // Check if user is admin by reading from Firestore
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser) {
        setCheckingAdminStatus(false);
        return;
      }

      try {
        // Get user document from Firestore
        const userDocRef = doc(db, "Accounts", currentUser.email);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          // Check if the isAdmin field is true
          const userData = userSnapshot.data();
          setIsAdmin(userData && userData.Admin === true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setCheckingAdminStatus(false);
      }
    };

    if (currentUser) {
      checkAdminStatus();
    } else if (!loading) {
      setCheckingAdminStatus(false);
    }
  }, [currentUser, loading]);

  // Component for protected routes (requires authentication)
  const ProtectedRoute = ({ children }) => {
    if (loading || checkingAdminStatus) {
      return <LoadingScreen />;
    }

    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  // Component for admin routes
  const AdminRoute = ({ children }) => {
    if (loading || checkingAdminStatus) {
      return <LoadingScreen />;
    }

    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
      return <Navigate to="/inventory" replace />;
    }

    return children;
  };

  // Component for regular user routes (non-admin only)
  const RegularUserRoute = ({ children }) => {
    if (loading || checkingAdminStatus) {
      return <LoadingScreen />;
    }

    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }

    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    }

    return children;
  };

  // Show loading screen while authentication status is being determined
  if (loading || checkingAdminStatus) {
    return <LoadingScreen />;
  }

  // Main routes
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/inventory/*"
        element={
          <RegularUserRoute>
            <Inventory />
          </RegularUserRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />

      <Route
        path="/"
        element={
          currentUser ? (
            isAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/inventory" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to={currentUser ? (isAdmin ? "/admin" : "/inventory") : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
