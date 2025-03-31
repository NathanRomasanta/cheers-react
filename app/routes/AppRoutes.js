"use client";

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../_utils/AuthContext";
import dynamic from "next/dynamic";
import LoadingScreen from "../_utils/LoadingScreen";
import { db } from "../_utils/Firebase";
import { doc, getDoc } from "firebase/firestore";

// Dynamic imports
const Inventory = dynamic(() => import("../inventory/page"), { ssr: false });
const AdminPanel = dynamic(() => import("../admin/page"), { ssr: false });
const Cashout = dynamic(() => import("../cashout/page"), { ssr: false });
const Login = dynamic(() => import("../login/page"), { ssr: false });

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();
  const [roles, setRoles] = useState({
    isAdmin: false,
    isCashout: false,
    isInventory: false,
  });
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setCheckingStatus(false);
      return;
    }

    const fetchRoles = async () => {
      try {
        const userDoc = await getDoc(doc(db, "Accounts", currentUser.email));
        if (userDoc.exists()) {
          const { accountType } = userDoc.data();
          setRoles({
            isAdmin: accountType === "Super Admin",
            isInventory: accountType === "Inventory Admin",
            isCashout: accountType === "Cashout Admin",
          });
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setCheckingStatus(false); // Make sure to set this false after fetching roles
      }
    };
    fetchRoles();
  }, [currentUser]);

  if (loading || checkingStatus) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          currentUser && roles.isAdmin ? (
            <AdminPanel />
          ) : (
            <Navigate to="/denied" replace />
          )
        }
      />
      <Route
        path="/cashout"
        element={
          currentUser && roles.isCashout ? (
            <Cashout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/inventory"
        element={
          currentUser && roles.isInventory ? (
            <Inventory />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={
          <Navigate
            to={
              currentUser
                ? roles.isAdmin
                  ? "/admin"
                  : roles.isCashout
                  ? "/cashout"
                  : roles.isInventory
                  ? "/inventory"
                  : "/denied" // Handle all denied roles here
                : "/login"
            }
            replace
          />
        }
      />
    </Routes>
  );
};

export default dynamic(() => Promise.resolve(AppRoutes), { ssr: false });
