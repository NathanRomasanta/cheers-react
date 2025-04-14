'use client';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '/app/_utils/AuthContext';
import { Toast } from 'primereact/toast';
import {
  LogOut,
  Shield,
  Menu,
  X,
  Airplay,
  FilePlus,
  UserPlus,
  Send,
  LayoutDashboard,
  Sheet,
} from 'lucide-react';
import AddInventory from '@/admin/create-inventory/page';
import ControlPanel from '@/admin/control-panel/page';
import ItemsListView from '@/admin/inventory-screen/page';
import CreateUsers from '@/admin/create-users/page';
import Orders from '@/admin/orders/page';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const router = useRouter();
  const toast = useRef(null);

  const [activeItem, setActiveItem] = useState('home');

  // Create a reference to the Toast component

  // Function to show a success toast
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Your action was completed successfully',
      life: 3000,
    });
  };

  // Function to show an info toast
  const showInfo = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Info',
      detail: 'Here is some important information',
      life: 3000,
    });
  };

  // Function to show a warning toast
  const showWarn = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Something might need your attention',
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
      life: 3000,
    });
  };

  const handleSignOut = async () => {
    try {
      await logout();

      router.push('./login'); // Redirect to /login after router is initialized
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={27} />,
      path: '/dashboard/documents',
    },
    {
      id: 'Inventory',
      label: 'Inventory',
      icon: <Sheet size={27} />,
      path: '/dashboard/documents',
    },
    {
      id: 'Orders',
      label: 'Orders',
      icon: <Send size={27} />,
      path: '/dashboard/settings',
    },
    {
      id: 'Add Inventory',
      label: 'Add Inventory',
      icon: <FilePlus size={27} />,
      path: '/dashboard/settings',
    },
  ];

  // Add admin option if the user is an admin
  if (isAdmin) {
    menuItems.push(
      {
        id: 'admin',
        label: 'Admin Panel',
        icon: <Shield size={20} />,
        path: '/admin',
      },
      {
        id: 'Create New Users',
        label: 'Add Users',
        icon: <UserPlus size={27} />,
        path: '/dashboard/settings',
      }
    );
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'Inventory':
        return <ItemsListView />;

      case 'Add Inventory':
        return <AddInventory />;
      case 'Dashboard':
        return <ControlPanel />;
      case 'Create New Users':
        return <CreateUsers />;
      case 'Orders':
        return <Orders />;
      default:
        return <ControlPanel />;
    }
  };

  return (
    <div className='flex flex-col h-screen bg-gray-100 md:flex-row'>
      {/* Mobile Menu Button */}
      <div className='md:hidden p-4 bg-white border-b'>
        <button
          onClick={toggleMobileMenu}
          className='text-gray-700'>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-white border-r shadow-sm md:flex flex-col transition-all ${
          isMobileMenuOpen ? 'flex' : 'hidden'
        }`}>
        <div className='p-4 border-b flex items-center gap-2'>
          <img
            src='/Logo.svg'
            alt='Logo'
            className='w-11 h-11'
          />
          <h1 className='text-xl font-bold text-[#FF6E1F]'>Cheers</h1>
        </div>

        <div className='flex flex-col flex-grow p-5 '>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center p-4 hover:bg-gray-100 transition-colors ${
                activeItem === item.id
                  ? 'rounded-xl bg-[#FF6E1F20] text-[#FF6E1F] p-10 font-bold'
                  : 'text-gray-700'
              }`}>
              <span className='mr-3'>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className='p-4 border-t mt-auto'>
          <div className='flex items-center mb-4'>
            <div className='w-8 h-8 rounded-full bg-[#FF6E1F] mr-2'></div>
            <div>
              <p className='text-sm font-semibold'>
                {currentUser?.email || 'User'}
              </p>
              <p className='text-xs text-gray-500'>
                {isAdmin ? 'Administrator' : 'Standard User'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className='flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded'>
            <LogOut
              size={16}
              className='mr-2'
            />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-grow overflow-auto '>{renderContent()}</div>
    </div>
  );
}
