// pages/AdminPanel.js
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../_utils/AuthContext";
import {
  Users,
  BarChart,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Admin sub-pages (these would be in separate files in a real app)
//import UsersPage from "./admin/UsersPage";
//import StatsPage from "./admin/StatsPage";
//import AdminSettingsPage from "./admin/AdminSettingsPage";

export default function AdminPanel() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const menuItems = [
    {
      id: "users",
      label: "User Management",
      icon: <Users size={20} />,
      path: "/admin",
    },
    {
      id: "stats",
      label: "Statistics",
      icon: <BarChart size={20} />,
      path: "/admin/stats",
    },
    {
      id: "settings",
      label: "Admin Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-gray-800 text-white">
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-gray-800 text-white md:flex flex-col transition-all ${
          isMobileMenuOpen ? "flex" : "hidden"
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center">
          <Shield size={24} className="mr-2 text-yellow-400" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <div className="flex flex-col flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center p-4 hover:bg-gray-700 transition-colors ${
                window.location.pathname === item.path
                  ? "bg-gray-700 border-l-4 border-yellow-400"
                  : ""
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <button
            onClick={handleBackToDashboard}
            className="flex items-center p-4 hover:bg-gray-700 transition-colors mt-4 text-gray-300"
          >
            <span className="mr-3">←</span>
            Back to Dashboard
          </button>
        </div>

        <div className="p-4 border-t border-gray-700 mt-auto">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-yellow-400 mr-2 flex items-center justify-center">
              <Shield size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {currentUser?.email || "Admin"}
              </p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full p-2 text-red-400 hover:bg-gray-700 rounded"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/settings" element={<AdminSettingsPage />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
    </div>
  );
}
