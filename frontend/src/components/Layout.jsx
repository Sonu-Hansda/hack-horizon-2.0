import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from './ui/ConfirmationModal';
import {
  ShieldPlus, LayoutDashboard, FolderOpen, Pill, BarChart2, Activity,
  QrCode, Settings, Plus, Bell, HelpCircle, Menu, X, Search,
  LogOut, User
} from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'Welcome';
    
    if (user.full_name) {
      return user.full_name.split(' ')[0]; // First name only
    }
    
    if (user.email) {
      return user.email.split('@')[0]; // Username part of email
    }
    
    return 'User';
  };

  return (
    <div className="flex h-screen bg-[#F4F7FB] font-sans text-slate-800 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative top-0 left-0 w-72 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-full shadow-[2px_0_12px_-6px_rgba(0,0,0,0.1)] z-50 shrink-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Logo */}
          <div className="px-6 lg:px-7 py-6 lg:py-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                {/* <ShieldPlus size={22} strokeWidth={2.5} /> */}
                <img src='./logo.png' className='h-8'></img>
              </div>
              <div>
                <h1 className="font-extrabold text-[17px] tracking-tight text-slate-900">Medi Sync</h1>
                <p className="text-[10px] font-bold tracking-[0.2em] text-teal-600 uppercase mt-0.5">Track & Care</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button className="lg:hidden text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-lg" onClick={() => setIsSidebarOpen(false)}>
               <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5 mt-2">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => handleTabChange('Dashboard')} />
            <SidebarItem icon={FolderOpen} label="Medical Records" active={activeTab === 'Medical Records'} onClick={() => handleTabChange('Medical Records')} />
            <SidebarItem icon={Pill} label="Medications" active={activeTab === 'Medications'} onClick={() => handleTabChange('Medications')} />
            <SidebarItem icon={BarChart2} label="Reports" active={activeTab === 'Reports'} onClick={() => handleTabChange('Reports')} />
            <SidebarItem icon={Activity} label="History" active={activeTab === 'History'} onClick={() => handleTabChange('History')} />
            <SidebarItem icon={QrCode} label="Share QR" active={activeTab === 'Share QR'} onClick={() => handleTabChange('Share QR')} />
          </nav>

          <div className="px-4 pb-6 mt-8">
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => handleTabChange('Settings')} />
          </div>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0 space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 rounded-[12px] bg-slate-50">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <User size={20} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-slate-800 truncate">
                  {getUserDisplayName()}
                </p>
                <p className="text-[11px] text-slate-500 font-medium truncate">
                  {user?.email || 'Patient'}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[12px] text-[13px] font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all"
            >
              <LogOut size={16} strokeWidth={2} />
              Sign Out
            </button>

            {/* New Record Button */}
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
              <Plus size={18} strokeWidth={2.5} />
              New Record
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        {/* Header */}
        <header className="h-[76px] lg:h-[96px] flex items-center justify-between px-5 lg:px-10 shrink-0 z-10 w-full pt-1 lg:pt-2">
          <div className="flex items-center gap-3 lg:gap-8 flex-1">
            <button className="lg:hidden p-2 -ml-2 text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm active:scale-95 transition-transform" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={22} strokeWidth={2.5} />
            </button>

            {activeTab === 'Dashboard' ? (
              <h2 className="text-[18px] lg:text-[22px] font-bold text-slate-800 tracking-tight truncate max-w-[160px] sm:max-w-[280px] md:max-w-none">
                Welcome, {getUserDisplayName()}
              </h2>
            ) : (
              <div className="hidden sm:flex items-center gap-6 w-full opacity-100 transition-opacity duration-300">
                <div className="font-extrabold text-slate-700 text-[16px] tracking-tight whitespace-nowrap">Clinical Curator</div>
                <div className="flex items-center bg-white/60 border border-slate-200/80 rounded-full px-5 py-2 w-full max-w-lg shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] focus-within:bg-white focus-within:border-teal-500/30 transition-all">
                  <Search size={16} className="text-slate-400 mr-3" />
                  <input type="text" placeholder="Search records, doctors, or results..." className="w-full bg-transparent outline-none text-[14px] font-medium placeholder:text-slate-400 text-slate-700" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6 ml-4">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors hidden sm:block">
              <Bell size={22} strokeWidth={2} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-[#F4F7FB] rounded-full translate-x-0.5 -translate-y-0.5"></span>
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-200/60 p-2.5 rounded-full hidden sm:block">
              <HelpCircle size={20} className="fill-slate-200" strokeWidth={2} />
            </button>
            <div className="flex items-center gap-3 cursor-pointer sm:pl-6 sm:border-l border-slate-300 group">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-slate-200 overflow-hidden border-[3px] border-white shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
                {user?.email ? (
                  <div className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <img src="/doctor_avatar.png" alt="User" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Patient&background=475569&color=fff' }} />
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-[14px] font-bold text-slate-800 leading-tight">
                  {getUserDisplayName()}
                </p>
                <p className="text-[12px] text-slate-500 font-medium mt-0.5">
                  {user?.email ? 'Patient' : 'Guest'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Wrapper */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-10 pb-8 custom-scrollbar">
            {children}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out? You'll need to sign in again to access your health records."
        confirmText="Sign Out"
        cancelText="Cancel"
        confirmVariant="danger"
        cancelVariant="outline"
      />
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`cursor-pointer w-full flex items-center space-x-3.5 px-4 py-3 rounded-[12px] text-[14.5px] font-semibold transition-all ${active ? 'bg-teal-50/80 text-[#0E7B62]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
      <Icon className={`w-[20px] h-[20px] ${active ? 'text-[#0E7B62]' : 'text-slate-400'}`} strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </button>
  );
}