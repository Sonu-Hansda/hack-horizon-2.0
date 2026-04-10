import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from './ui/ConfirmationModal';
import {
  LayoutDashboard, FolderOpen, Activity,
  QrCode, Settings, Plus, Menu, X, Search,
  LogOut, RefreshCcw
} from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveTab('Dashboard');
    } else if (path === '/medical-records') {
      setActiveTab('Medical Records');
    } else if (path === '/medicalreport') {
      setActiveTab('Reports');
    } else if (path === '/history') {
      setActiveTab('History');
    } else if (path === '/share') {
      setActiveTab('Share QR')
    }
    else if (path === '/settings') {
      setActiveTab('Settings')
    }
  }, [location]);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);

    switch (tab) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Medical Records':
        navigate('/medical-records');
        break;
      case 'Reports':
        navigate('/medicalreport');
        break;
      case 'History':
        navigate('/history');
        break;
      case 'Medications':
        navigate('/dashboard');
        break;
      case 'Share QR':
        navigate('/share');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      default:
        navigate('/dashboard');
    }
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

  // Get user display name (First Name for greetings)
  const getUserDisplayName = () => {
    if (!user) return 'User';

    if (user.full_name) {
      return user.full_name.split(' ')[0];
    }

    if (user.email) {
      const nameFromEmail = user.email.split('@')[0];
      return nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    }

    return 'User';
  };

  // Get full name for profile sections
  const getFullDisplayName = () => {
    if (!user) return 'User';
    return user.full_name || user.email?.split('@')[0] || 'User';
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-inter text-slate-800 overflow-hidden">

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:relative top-0 left-0 w-72 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-full shadow-[2px_0_12px_-6px_rgba(0,0,0,0.1)] z-50 shrink-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Logo */}
          <div className="px-6 lg:px-7 py-6 lg:py-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2 rounded-xl flex items-center justify-center shadow-sm shrink-0">
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
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => handleNavigation('Dashboard')} />
            <SidebarItem icon={FolderOpen} label="Records" active={activeTab === 'Medical Records'} onClick={() => handleNavigation('Medical Records')} />
            <SidebarItem icon={Activity} label="History" active={activeTab === 'History'} onClick={() => handleNavigation('History')} />
            <SidebarItem icon={QrCode} label="Share QR" active={activeTab === 'Share QR'} onClick={() => handleNavigation('Share QR')} />
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => handleNavigation('Settings')} />
          </nav>

          <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0 space-y-4">

            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[12px] text-[13px] font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all"
            >
              <LogOut size={16} strokeWidth={2} />
              Sign Out
            </button>

            {/* New Record Button */}
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]" onClick={() => navigate("/medical-records")}>
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
              <div className="flex items-center gap-4 flex-1">
                <h2 className="text-[18px] lg:text-[22px] font-black text-slate-800 tracking-tight truncate max-w-[160px] sm:max-w-[280px] md:max-w-none">
                  Welcome, {getUserDisplayName()}
                </h2>
                <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100/50 group cursor-pointer hover:bg-emerald-100 transition-all active:scale-95 shadow-sm">
                  <RefreshCcw size={14} className="text-[#00BFA5] group-hover:rotate-180 transition-transform duration-700" strokeWidth={3} />
                  <span className="text-[10px] font-black text-[#00BFA5] uppercase tracking-widest whitespace-nowrap">Sync Data</span>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-6 w-full opacity-100 transition-opacity duration-300 max-w-md">
                <div className="flex items-center bg-white border border-slate-200 rounded-[18px] px-5 py-2.5 w-full shadow-sm focus-within:ring-2 focus-within:ring-teal-500/10 focus-within:border-teal-500/30 transition-all">
                  <Search size={16} className="text-slate-400 mr-3" strokeWidth={2.5} />
                  <input type="text" placeholder="Search your health vault..." className="w-full bg-transparent outline-none text-[14px] font-semibold placeholder:text-slate-400 text-slate-700" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 lg:gap-6 ml-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm overflow-hidden">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${language === 'EN'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('HI')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${language === 'HI'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
              >
                हि
              </button>
            </div>

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
                  {getFullDisplayName()}
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
        cancelVariant="outline"
      />
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer w-full flex items-center space-x-4 px-6 py-4 transition-all duration-300 overflow-hidden ${active
          ? 'text-[#00BFA5]'
          : 'text-slate-400 hover:text-slate-700'
        }`}
    >
      {active && (
        <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#00BFA5] rounded-r-xl shadow-[2px_0_12px_rgba(0,191,165,0.4)]"></div>
      )}
      <Icon className={`w-[22px] h-[22px] transition-all duration-500 ${active ? 'text-[#00BFA5] scale-110' : 'text-slate-300'}`} strokeWidth={active ? 2.5 : 2} />
      <span className={`text-[15.5px] tracking-tight transition-all duration-300 ${active ? 'font-black' : 'font-bold'}`}>
        {label}
      </span>
    </button>
  );
}
