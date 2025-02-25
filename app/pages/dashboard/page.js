// pages/Dashboard.js

"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useAuth } from "@/app/_utils/AuthContext";
import {
  Home,
  FileText,
  Mail,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
} from "lucide-react";

// Dashboard sub-pages
//import HomePage from "./dashboard/HomePage";
//import DocumentsPage from "./dashboard/DocumentsPage";
//import MessagesPage from "./dashboard/MessagesPage";
//import SettingsPage from "./dashboard/SettingsPage";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("../pages/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: <Home size={20} />, path: "/dashboard" },
    {
      id: "documents",
      label: "Documents",
      icon: <FileText size={20} />,
      path: "/dashboard/documents",
    },
    {
      id: "messages",
      label: "Messages",
      icon: <Mail size={20} />,
      path: "/dashboard/messages",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  // Add admin option if the user is an admin
  if (isAdmin) {
    menuItems.push({
      id: "admin",
      label: "Admin Panel",
      icon: <Shield size={20} />,
      path: "/admin",
    });
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-white border-b">
        <button onClick={toggleMobileMenu} className="text-gray-700">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-white border-r shadow-sm md:flex flex-col transition-all ${
          isMobileMenuOpen ? "flex" : "hidden"
        }`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">My Dashboard</h1>
        </div>

        <div className="flex flex-col flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center p-4 hover:bg-gray-100 transition-colors ${
                window.location.pathname === item.path
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t mt-auto">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
            <div>
              <p className="text-sm font-semibold">
                {currentUser?.email || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {isAdmin ? "Administrator" : "Standard User"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-auto"></div>
    </div>
  );
}

//<Route path="/" element={<HomePage />} />
//<Route path="/documents" element={<DocumentsPage />} />
//<Route path="/messages" element={<MessagesPage />} />
//<Route path="/settings" element={<SettingsPage />} />
//<Route path="*" element={<Navigate to="/dashboard" />} />
