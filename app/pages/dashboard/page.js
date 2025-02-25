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
import CreatePOSItem from "./create-pos-item-screen/page";
import KurtInventoryPage from "./inventory-page/page";

// Dashboard sub-pages
//import HomePage from "./dashboard/HomePage";
//import DocumentsPage from "./dashboard/DocumentsPage";
//import MessagesPage from "./dashboard/MessagesPage";
//import SettingsPage from "./dashboard/SettingsPage";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const router = useRouter();

  const [activeItem, setActiveItem] = useState("home");

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
      id: "Inventory",
      label: "Inventory",
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
      id: "Kurt's Inventory Page",
      label: "Kurt's Inventory Page",
      icon: <Mail size={20} />,
      path: "/dashboard/messages",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },

    {
      id: "Inventory Nathans",
      label: "Inventory Nathasn",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
    {
      id: "Create POS Item",
      label: "Create POS Item",
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

  const renderContent = () => {
    switch (activeItem) {
      case "home":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome Home</h2>
            <p className="text-gray-600">
              This is the home page content. Click on different sidebar items to
              see this content change.
            </p>
          </div>
        );
      case "inventory":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">Project Report</h3>
                <p className="text-sm text-gray-500">Updated yesterday</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">Meeting Notes</h3>
                <p className="text-sm text-gray-500">Updated 3 days ago</p>
              </div>
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
                  <div>
                    <h3 className="font-bold">John Doe</h3>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p>Hey, just checking in about the project status.</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <h3 className="font-bold">Jane Smith</h3>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
                <p>The presentation looks great. Nice work!</p>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <div className="w-12 h-6 bg-gray-300 rounded-full px-1 flex items-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <div className="w-12 h-6 bg-blue-500 rounded-full px-1 flex items-center justify-end">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Updates</span>
                <div className="w-12 h-6 bg-blue-500 rounded-full px-1 flex items-center justify-end">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case "external":
        return <ExternalPage />;

      case "Create POS Item":
        return <CreatePOSItem />;

      case "Kurt's Inventory Page":
        return <KurtInventoryPage />;
      default:
        return <div>Select an item</div>;
    }
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
          <h1 className="text-xl font-bold text-blue-600">Cheers</h1>
        </div>

        <div className="flex flex-col flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center p-4 hover:bg-gray-100 transition-colors ${
                activeItem === item.id
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 p-10"
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
      <div className="flex-grow overflow-auto">{renderContent()}</div>
    </div>
  );
}

//<Route path="/" element={<HomePage />} />
//<Route path="/documents" element={<DocumentsPage />} />
//<Route path="/messages" element={<MessagesPage />} />
//<Route path="/settings" element={<SettingsPage />} />
//<Route path="*" element={<Navigate to="/dashboard" />} />
