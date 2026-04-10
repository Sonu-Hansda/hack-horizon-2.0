import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, Info, CheckCircle2, Circle, ChevronDown, 
  Activity, PillBottle, FlaskConical, ShieldCheck, Check
} from 'lucide-react';

export default function ShareQR() {
  const [timeLeft, setTimeLeft] = useState(1499); // 24:59
  const [isGenerating, setIsGenerating] = useState(false);
  const [accessMode, setAccessMode] = useState('Full Access');
  const [permissions, setPermissions] = useState({
    history: true,
    medications: true,
    labs: false
  });

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setTimeLeft(1800); // Reset to 30:00
      setIsGenerating(false);
    }, 800);
  };

  const togglePermission = (key) => {
    setPermissions(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (next.history && next.medications && next.labs) {
        setAccessMode('Full Access');
      } else {
        setAccessMode('Custom Access');
      }
      return next;
    });
  };

  const handleModeSwitch = (mode) => {
    setAccessMode(mode);
    if (mode === 'Full Access') {
      setPermissions({ history: true, medications: true, labs: true });
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto space-y-6 lg:space-y-8 pb-12 pt-2 xl:pt-4 fadeIn">
      
      {/* Header section */}
      <div className="mb-10 text-center lg:text-left pl-0 lg:pl-2">
         <h2 className="text-3xl lg:text-[38px] font-extrabold text-slate-800 tracking-tight mb-3">Secure Record Sharing</h2>
         <p className="text-slate-500 font-medium text-[15px] max-w-2xl leading-relaxed mx-auto lg:mx-0">
           Generate a dynamic, encrypted QR code to grant temporary access to medical records. Ensure the provider is authorized before sharing.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-10 items-start">
        
        {/* Left Column (QR UI) */}
        <div className="space-y-6">
          {/* Main QR Card */}
          <div className="bg-white rounded-[24px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-slate-100 p-8 pt-10 relative flex flex-col items-center group">
            {/* Active Badge */}
            <div className="absolute top-5 right-5 bg-teal-300 text-teal-900 text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full uppercase shadow-sm">
              Active
            </div>

            {/* QR Image Holder */}
            <div className={`w-[240px] h-[240px] lg:w-[280px] lg:h-[280px] bg-[#10141D] rounded-[20px] mb-8 overflow-hidden relative shadow-lg ${isGenerating ? 'animate-pulse opacity-50' : 'opacity-100'} transition-opacity duration-300 flex items-center justify-center p-6 border-4 border-slate-50`}>
               <img 
                 src="/qr_code.png" 
                 alt="QR Code" 
                 className={`w-full h-full object-contain ${isGenerating ? 'scale-95' : 'scale-105 group-hover:scale-110'} transition-transform duration-500 rounded-lg`} 
                 onError={(e) => { e.target.style.display='none'; }} 
               />
               {!isGenerating && (
                 <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[16px] m-4"></div>
               )}
            </div>

            <h3 className="text-[13px] font-extrabold tracking-[0.15em] text-slate-800 uppercase mb-2">Share with Provider</h3>
            <p className="text-[14px] text-slate-500 font-medium mb-8">
               Valid for next <span className={`${timeLeft < 60 ? 'text-red-500 font-bold' : 'text-[#0E7B62] font-extrabold'}`}>{formatTime(timeLeft)}</span>
            </p>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[#151D28] hover:bg-[#0B0F15] text-white py-4 rounded-[16px] font-bold text-[15px] flex items-center justify-center gap-3 transition-colors shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <RefreshCw size={18} className={`${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Regenerating...' : 'Generate New QR'}
            </button>
          </div>

          {/* How To Use */}
          <div className="bg-[#F8FAFC] rounded-[24px] p-6 lg:p-8 border border-slate-100/80">
            <h4 className="flex items-center gap-2.5 text-[15px] font-extrabold text-slate-800 mb-6">
               <div className="w-7 h-7 bg-[#0E7B62] rounded-full flex items-center justify-center text-white shrink-0">
                  <Info size={14} strokeWidth={3} />
               </div>
               How to use
            </h4>
            <ul className="space-y-5">
               <li className="flex gap-4">
                 <span className="font-extrabold text-slate-800 text-[14px] pt-0.5">01</span>
                 <p className="text-[13.5px] text-slate-600 font-medium leading-relaxed">
                   Set your desired access level and expiration time in the controls panel.
                 </p>
               </li>
               <li className="flex gap-4">
                 <span className="font-extrabold text-slate-800 text-[14px] pt-0.5">02</span>
                 <p className="text-[13.5px] text-slate-600 font-medium leading-relaxed">
                   Show the generated QR code to the healthcare professional.
                 </p>
               </li>
               <li className="flex gap-4">
                 <span className="font-extrabold text-slate-800 text-[14px] pt-0.5">03</span>
                 <p className="text-[13.5px] text-slate-600 font-medium leading-relaxed">
                   Access will automatically terminate once the timer expires.
                 </p>
               </li>
            </ul>
          </div>
        </div>

        {/* Right Column (Controls) */}
        <div className="space-y-6">
          <div className="bg-white rounded-[24px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 p-6 lg:p-8">
             <h3 className="text-[20px] font-extrabold text-slate-800 mb-6">Access Configuration</h3>

             {/* Segmented Control */}
             <div className="bg-[#F1F5F9] p-1.5 rounded-[16px] flex mb-8">
                <button 
                  onClick={() => handleModeSwitch('Full Access')}
                  className={`flex-1 py-2.5 rounded-[12px] text-[14px] font-bold transition-all ${accessMode === 'Full Access' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Full Access
                </button>
                <button 
                  onClick={() => handleModeSwitch('Custom Access')}
                  className={`flex-1 py-2.5 rounded-[12px] text-[14px] font-bold transition-all ${accessMode === 'Custom Access' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Custom Access
                </button>
             </div>

             {/* Permissions List */}
             <div className="space-y-3 mb-10">
                <PermissionCard 
                  title="Medical History"
                  desc="Past diagnoses, surgeries, and family history"
                  icon={Activity}
                  active={permissions.history}
                  onClick={() => togglePermission('history')}
                />
                <PermissionCard 
                  title="Medication List"
                  desc="Active prescriptions and dosage instructions"
                  icon={PillBottle}
                  active={permissions.medications}
                  onClick={() => togglePermission('medications')}
                />
                <PermissionCard 
                  title="Lab Results"
                  desc="Bloodwork, imaging reports, and pathology"
                  icon={FlaskConical}
                  active={permissions.labs}
                  onClick={() => togglePermission('labs')}
                />
             </div>

             {/* Session Duration */}
             <div className="mb-4">
                <h4 className="text-[11px] font-extrabold tracking-[0.15em] text-slate-400 uppercase mb-3">Session Duration</h4>
                <div className="relative group cursor-pointer">
                   <div className="w-full bg-[#F8FAFC] border border-slate-200 group-hover:border-slate-300 transition-colors rounded-[16px] p-4 flex items-center justify-between">
                      <span className="text-[14.5px] font-bold text-slate-800">30 Minutes (Standard Consultation)</span>
                      <ChevronDown size={18} className="text-slate-400" />
                   </div>
                </div>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-4 italic">
                  Access will be revoked automatically after the selected duration. You can manually terminate access anytime in History.
                </p>
             </div>
          </div>

          {/* Encryption Badge Row */}
          <div className="bg-[#EEFDF7] border border-[#C6F1E3] rounded-[20px] p-5 lg:p-6 flex items-start gap-4 shadow-sm">
             <div className="w-10 h-10 bg-[#0E7B62] rounded-full flex items-center justify-center shrink-0">
               <ShieldCheck size={20} className="text-white" />
             </div>
             <div>
               <h4 className="text-[15px] font-bold text-[#0A5D48] mb-1">AES-256 Dynamic Encryption</h4>
               <p className="text-[13px] text-[#0E7B62] opacity-80 font-medium leading-relaxed">
                 All shared links are unique and tracked for HIPAA compliance.
               </p>
             </div>
          </div>

        </div>

      </div>
    </div>
  )
}

function PermissionCard({ title, desc, icon: Icon, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`p-5 rounded-[16px] border flex items-center justify-between cursor-pointer transition-all duration-300 ${active ? 'bg-[#F8FAFC] border-slate-200 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)]' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-[46px] h-[46px] rounded-[14px] flex items-center justify-center transition-colors ${active ? 'bg-[#E6F4F1]' : 'bg-slate-100'}`}>
          <Icon size={22} strokeWidth={2} className={`${active ? 'text-[#0E7B62]' : 'text-slate-400'}`} />
        </div>
        <div>
          <h4 className="text-[14.5px] font-bold text-slate-800 mb-0.5">{title}</h4>
          <p className="text-[12.5px] text-slate-500 font-medium">{desc}</p>
        </div>
      </div>
      <div className="pl-4 shrink-0">
        {active ? (
           <CheckCircle2 size={24} className="text-[#0E7B62] fill-[#E6F4F1]" />
        ) : (
           <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
        )}
      </div>
    </div>
  )
}
