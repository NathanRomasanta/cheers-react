'use client';

import React, { useState, useEffect } from 'react';
import { auth, db } from '/app/_utils/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '/app/_utils/AuthContext';
import { useRouter } from 'next/navigation';
import { ShieldX } from 'lucide-react';
import {
  Mail,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  Airplay,
  Send,
  FilePlus,
  Table,
  Receipt,
  BookMarked,
  Accessibility,
  UserPlus,
} from 'lucide-react';

import { getAuth, signOut } from 'firebase/auth';
import CashOutPg from '@/admin/CashOutScreen/page';
import ControlPanel from '@/admin/control-panel/page';
export default function CashoutAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const { currentUser } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: <Airplay size={27} />,
      path: '/dashboard/documents',
    },
    {
      id: 'Cashout',
      label: 'Cashout',
      icon: <Receipt size={27} />,
      path: '/dashboard/settings',
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: <Settings size={27} />,
      path: '/dashboard/settings',
    },
  ];
  const renderContent = () => {
    switch (activeItem) {
      case 'Cashout':
        return <CashOutPg />;
      case 'Dashboard':
        return <ControlPanel />;
      case 'Settings':
        return (
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Settings</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span>Dark Mode</span>
                <div className='w-12 h-6 bg-gray-300 rounded-full px-1 flex items-center'>
                  <div className='w-4 h-4 bg-white rounded-full'></div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span>Notifications</span>
                <div className='w-12 h-6 bg-blue-500 rounded-full px-1 flex items-center justify-end'>
                  <div className='w-4 h-4 bg-white rounded-full'></div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span>Email Updates</span>
                <div className='w-12 h-6 bg-blue-500 rounded-full px-1 flex items-center justify-end'>
                  <div className='w-4 h-4 bg-white rounded-full'></div>
                </div>
              </div>
            </div>
          </div>
        );
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
              <p className='text-sm font-semibold text-black'>
                {currentUser?.email || 'User'}
              </p>
              <p className='text-xs text-gray-500'>Cashout Admin</p>
            </div>
          </div>
          <button
            name='signout'
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
