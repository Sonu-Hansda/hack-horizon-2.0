import React, { useState } from 'react';
import {
  ShieldPlus, LayoutDashboard, FolderOpen, Pill, BarChart2, Activity,
  QrCode, Settings, Plus, Bell, HelpCircle, PillBottle, Calendar, FileText,
  ArrowRight, CloudUpload, TestTube, Stethoscope, ClipboardPlus, ChevronRight,
  Menu, X
} from 'lucide-react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                <ShieldPlus size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="font-extrabold text-[17px] tracking-tight text-slate-900">HealthRecord</h1>
                <p className="text-[10px] font-bold tracking-[0.2em] text-teal-600 uppercase mt-0.5">Precision Care</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button className="lg:hidden text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-lg" onClick={() => setIsSidebarOpen(false)}>
               <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5 mt-2">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={FolderOpen} label="Medical Records" />
            <SidebarItem icon={Plus} label="Medications" />
            <SidebarItem icon={BarChart2} label="Reports" />
            <SidebarItem icon={Activity} label="History" />
            <SidebarItem icon={QrCode} label="Share QR" />
          </nav>

          <div className="px-4 pb-6 mt-8">
            <SidebarItem icon={Settings} label="Settings" />
          </div>

          {/* New Record Button */}
          <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0">
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
              <Plus size={18} strokeWidth={2.5} />
              New Record
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        {/* Header */}
        <header className="h-[76px] lg:h-[96px] flex items-center justify-between px-5 lg:px-10 shrink-0 z-10 w-full pt-1 lg:pt-2">
          <div className="flex items-center gap-3 lg:gap-0">
            <button className="lg:hidden p-2 -ml-2 text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm active:scale-95 transition-transform" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={22} strokeWidth={2.5} />
            </button>
            <h2 className="text-[18px] lg:text-[22px] font-bold text-slate-800 tracking-tight truncate max-w-[160px] sm:max-w-[280px] md:max-w-none">
              Welcome, Rishit
            </h2>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors hidden sm:block">
              <Bell size={22} strokeWidth={2} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-[#F4F7FB] rounded-full translate-x-0.5 -translate-y-0.5"></span>
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-200/60 p-2.5 rounded-full hidden sm:block">
              <HelpCircle size={20} className="fill-slate-200" strokeWidth={2} />
            </button>
            <div className="flex items-center gap-3 cursor-pointer sm:pl-6 sm:border-l border-slate-300 group">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-slate-200 overflow-hidden border-[3px] border-white shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img src="/doctor_avatar.png" alt="User" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Julian+Vance&background=475569&color=fff' }} />
              </div>
              <div className="hidden md:block">
                <p className="text-[14px] font-bold text-slate-800 leading-tight">Julian Vance</p>
                <p className="text-[12px] text-slate-500 font-medium mt-0.5">Internal Medicine</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content grid */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-10 pb-8">
          <div className="max-w-[1200px] mx-auto space-y-6 lg:space-y-7 pb-8 pt-2 lg:pt-4">
            
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              <StatCard icon={PillBottle} value="04" label="Active Medications" badge="ACTIVE" badgeColor="text-teal-600" />
              <StatCard icon={Calendar} value="12" label="Recent Visits (30d)" badge="RECENT" badgeColor="text-slate-400" />
              <StatCard icon={FileText} value="87" label="Reports Uploaded" badge="TOTAL" badgeColor="text-slate-400" className="sm:col-span-2 md:col-span-1" />
            </div>

            {/* Banner Row Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <BannerCard 
                title="Upload New Record"
                description="Securely add lab results, imaging, or clinician notes."
                action="Start Uploading"
                bg="bg-slate-800 hover:bg-slate-900"
                icon={CloudUpload}
              />
              <BannerCard 
                title="Generate Access QR"
                description="Create a secure link for medical professionals to view your files."
                action="Create Token"
                bg="bg-teal-700 hover:bg-teal-800"
                icon={QrCode}
              />
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 lg:gap-8">
              {/* Left Column - Recent Activity */}
              <div className="space-y-4 lg:space-y-5">
                <div className="flex items-center justify-between px-1 lg:px-2">
                  <h3 className="text-[16px] lg:text-[17px] font-bold text-slate-800 tracking-tight">Recent Activity</h3>
                  <button className="text-[12px] lg:text-[13px] font-bold text-teal-600 hover:text-teal-700 transition-colors tracking-wide">View All Activity</button>
                </div>

                <div className="bg-white rounded-[20px] lg:rounded-[24px] p-2 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 overflow-hidden">
                  <ActivityItem 
                    icon={TestTube}
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                    title="Blood Panel Results Uploaded"
                    time="2 hours ago"
                    description="Comprehensive Metabolic Panel (CMP) results from City Central Lab added to Medical Records."
                    tags={['LABS', 'PDF']}
                  />
                  <div className="h-[1px] bg-slate-100 mx-5" />
                  <ActivityItem 
                    icon={Stethoscope}
                    iconBg="bg-slate-100"
                    iconColor="text-slate-600"
                    title="Cardiology Follow-up Visit"
                    time="Yesterday"
                    description="Routine consultation with Dr. Amelia Zhang. Vitals stable. Follow-up notes available for review."
                    tags={['VISIT']}
                  />
                  <div className="h-[1px] bg-slate-100 mx-5" />
                  <ActivityItem 
                    icon={ClipboardPlus}
                    iconBg="bg-orange-50"
                    iconColor="text-orange-600"
                    title="Prescription Renewal"
                    time="Jan 12, 2024"
                    description="Lisinopril 10mg renewed for 90 days. Next refill eligible on April 15."
                    tags={['PHARMACY']}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Record Completion */}
                <div className="bg-white rounded-[20px] lg:rounded-[24px] p-6 lg:p-7 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60">
                  <h4 className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-4 lg:mb-5">Record Completion</h4>
                  <div className="flex justify-between items-end mb-2.5">
                    <span className="text-[11px] font-bold text-teal-600 tracking-wider">GOOD STANDINGS</span>
                    <span className="text-sm font-bold text-slate-700">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full mb-5 lg:mb-6 overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-[13px] text-slate-500 mb-5 lg:mb-6 leading-relaxed font-medium">
                    Your profile is missing clinical imaging from 2023. Link your radiology provider to reach 100%.
                  </p>
                  <button className="w-full py-3 rounded-[12px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                    Complete Profile
                  </button>
                </div>

                {/* Quick Access */}
                <div className="bg-white rounded-[20px] lg:rounded-[24px] p-6 lg:p-7 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60">
                  <div className="flex items-center gap-2.5 mb-5 lg:mb-6">
                    <div className="w-[3px] h-4 bg-teal-500 rounded-full"></div>
                    <h4 className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase">Quick Access</h4>
                  </div>
                  <div className="space-y-1">
                    <QuickAccessItem title="Vaccination Record 2..." time="Updated 2d ago" icon={FileText} />
                    <QuickAccessItem title="Recent EKG Results" time="Updated 2w ago" icon={Activity} border={false} />
                  </div>
                </div>

                {/* Need Assistance */}
                <div className="rounded-[20px] lg:rounded-[24px] bg-gradient-to-br from-[#1C2532] to-[#0D1520] p-6 lg:p-7 shadow-lg border border-slate-800 relative overflow-hidden group min-h-[150px] lg:min-h-[160px] flex items-center">
                  <div className="absolute -right-2 -bottom-2 lg:right-0 lg:bottom-0 w-28 h-28 lg:w-32 lg:h-32 transform translate-x-4 translate-y-3 transition-transform duration-500 group-hover:scale-110">
                     <img src="/support_agent.png" alt="Assistant" className="w-full h-full object-cover rounded-full border-[3px] border-slate-800/50 shadow-2xl" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                  <div className="relative z-10 w-[65%] lg:w-2/3">
                    <h4 className="text-[15px] lg:text-[16px] font-bold text-white mb-2 tracking-wide">Need Assistance?</h4>
                    <p className="text-[12px] lg:text-[13px] text-slate-400 leading-relaxed font-medium">
                      Our care team is available 24/7 for record retrieval help.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <footer className="flex flex-col md:flex-row justify-between items-center text-[12px] text-slate-400 font-medium py-6 mt-4 border-t border-slate-200/60 gap-4">
              <div className="flex items-center gap-2 lg:gap-4 flex-wrap justify-center">
                <span className="font-extrabold text-slate-600 text-[13px]">Clinical Curator</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="text-slate-400 text-center">&copy; 2024 Clinical Curator SaaS. HIPAA Compliant.</span>
              </div>
              <div className="flex items-center gap-4 lg:gap-8 flex-wrap justify-center text-[11px] lg:text-[12px]">
                <a href="#" className="hover:text-slate-700 transition-colors">Privacy</a>
                <a href="#" className="hover:text-slate-700 transition-colors">Terms</a>
                <a href="#" className="hover:text-slate-700 transition-colors">Security</a>
                <a href="#" className="hover:text-slate-700 transition-colors">Support</a>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents
function SidebarItem({ icon: Icon, label, active }) {
  return (
    <button className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-[12px] text-[14.5px] font-semibold transition-all ${active ? 'bg-teal-50/80 text-teal-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
      <Icon className={`w-[20px] h-[20px] ${active ? 'text-teal-600' : 'text-slate-400'}`} strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </button>
  );
}

function StatCard({ icon: Icon, value, label, badge, badgeColor, className = '' }) {
  return (
    <div className={`bg-white rounded-[20px] lg:rounded-[24px] p-5 lg:p-6 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 flex flex-col justify-between h-[140px] lg:h-[150px] group hover:border-slate-300 transition-colors ${className}`}>
      <div className="flex justify-between items-start">
        <div className={`p-2.5 lg:p-3 rounded-[12px] lg:rounded-[14px] bg-[#F4F7FB] text-slate-400 group-hover:text-teal-600 transition-colors`}>
          <Icon size={22} strokeWidth={2} />
        </div>
        <span className={`text-[9px] lg:text-[10px] font-bold tracking-[0.15em] pt-1 uppercase ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <div>
        <h3 className="text-[28px] lg:text-[32px] font-black text-slate-800 mb-0 lg:mb-0.5 tracking-tight">{value}</h3>
        <p className="text-[12.5px] lg:text-[13.5px] font-semibold text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function BannerCard({ title, description, action, bg, icon: Icon }) {
  return (
    <div className={`${bg} rounded-[20px] lg:rounded-[24px] p-6 lg:p-9 relative overflow-hidden group cursor-pointer shadow-md transition-all duration-300 transform`}>
      <Icon className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-[120px] h-[120px] lg:w-[160px] lg:h-[160px] text-white/5 group-hover:rotate-12 transition-transform duration-700 pointer-events-none" strokeWidth={1} />
      <div className="relative z-10 pr-10 lg:pr-16">
        <h3 className="text-white text-[18px] lg:text-[20px] font-bold mb-2 lg:mb-3 tracking-wide">{title}</h3>
        <p className="text-white/70 text-[13px] lg:text-[14.5px] font-medium leading-relaxed mb-6 lg:mb-8 max-w-[280px] lg:max-w-[300px]">
          {description}
        </p>
        <button className="text-white font-bold text-[13px] lg:text-[14px] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          {action} <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, iconBg, iconColor, title, time, description, tags }) {
  return (
    <div className="p-4 lg:p-5 lg:px-6 hover:bg-slate-50/80 transition-colors first:rounded-t-[18px] lg:first:rounded-t-[22px] last:rounded-b-[18px] lg:last:rounded-b-[22px] flex flex-col sm:flex-row gap-4 lg:gap-5 cursor-pointer">
      <div className={`w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] rounded-[14px] lg:rounded-[16px] ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-sm border border-black/5`}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="flex-1 mt-0 sm:mt-0.5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1.5 lg:mb-1.5 gap-1 sm:gap-0">
          <h4 className="text-[14.5px] lg:text-[15px] font-bold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-[11px] lg:text-[12px] font-bold text-slate-400 sm:text-slate-300 shrink-0 sm:ml-4 sm:pt-0.5">{time}</span>
        </div>
        <p className="text-[13px] lg:text-[13.5px] text-slate-500 leading-relaxed mb-3 lg:mb-4 max-w-[500px]">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 lg:gap-2.5">
          {tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-[6px] lg:rounded-[8px] bg-[#F4F7FB] text-slate-500 text-[9px] lg:text-[10px] font-bold tracking-widest uppercase border border-slate-200/80">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickAccessItem({ title, time, icon: Icon, border = true }) {
  return (
    <div className={`group flex items-center justify-between pb-3 lg:pb-4 ${border ? 'border-b border-slate-100' : ''} cursor-pointer pt-2`}>
      <div className="flex items-center gap-3 lg:gap-4 text-slate-500 group-hover:text-slate-800 transition-colors">
        <div className="p-2 rounded-xl bg-[#F4F7FB] border border-slate-100/50 group-hover:bg-slate-100 transition-colors">
           <Icon size={18} strokeWidth={2} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
        <div>
          <h5 className="text-[13px] lg:text-[13.5px] font-bold text-slate-700 mb-0.5 tracking-tight">{title}</h5>
          <p className="text-[11px] lg:text-[12px] font-medium text-slate-400">{time}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );
}