import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Heart, Thermometer, Droplets, 
  Wind, ShieldCheck, Activity 
} from 'lucide-react';

const RecordCompletionCard = ({ percentage = 85 }) => {
  const navigate = useNavigate();
  return (
    <Card className="rounded-[32px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white p-7 hover:shadow-xl transition-all duration-500 group">
      <div className="flex items-center gap-2 mb-6">
         <div className="w-1.5 h-4 bg-[#00BFA5] rounded-full"></div>
         <h4 className="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">
           Profile Integrity
         </h4>
      </div>
      <div className="flex justify-between items-end mb-4">
        <span className="text-[10px] font-black text-[#00BFA5] tracking-widest bg-emerald-50 px-3 py-1.5 rounded-xl uppercase">
          {percentage > 80 ? 'Optimal Status' : 'Needs Review'}
        </span>
        <div className="flex flex-col items-end">
           <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">{percentage}%</span>
        </div>
      </div>
      <div className="h-4 w-full bg-slate-50 rounded-full mb-8 overflow-hidden border border-slate-100 p-1">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-[#00BFA5] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,191,165,0.4)]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <button 
        onClick={() => navigate('/settings')}
        className="w-full py-3.5 bg-slate-900 text-white rounded-[18px] text-[13px] font-black tracking-tight hover:bg-slate-800 transition-all shadow-md active:scale-[0.98]"
      >
        Complete Information
      </button>
    </Card>
  );
};

const VitalStatsCard = ({ vitals = {} }) => {
  const stats = [
    { label: 'BPM', value: vitals.hr || '--', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50/70', cardBg: 'bg-rose-50/30' },
    { label: 'BP', value: vitals.bp || '--', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50/70', cardBg: 'bg-indigo-50/30' },
    { label: 'SpO2', value: vitals.spo2 ? `${vitals.spo2}%` : '--', icon: Droplets, color: 'text-[#00BFA5]', bg: 'bg-emerald-50/70', cardBg: 'bg-emerald-50/30' },
    { label: 'RESP', value: vitals.resp_rate || '--', icon: Wind, color: 'text-orange-500', bg: 'bg-orange-50/70', cardBg: 'bg-orange-50/30' }
  ];

  return (
    <Card className="rounded-[32px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white p-7">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-4 bg-[#00BFA5] rounded-full"></div>
          <h4 className="text-[11px] font-black tracking-[0.2em] text-slate-400 uppercase">
            Vital Snapshot
          </h4>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-lg">
           <div className="w-1.5 h-1.5 bg-[#00BFA5] rounded-full animate-pulse shadow-[0_0_4px_#00BFA5]"></div>
           <span className="text-[9px] font-black text-[#00BFA5] uppercase tracking-widest">Live Sync</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`flex flex-col gap-3 p-5 rounded-[24px] border border-transparent transition-all duration-300 hover:border-slate-100/50 hover:shadow-md ${stat.cardBg}`}>
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-[14px] flex items-center justify-center shrink-0 shadow-sm`}>
              <stat.icon size={20} strokeWidth={3} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-black text-slate-900 tracking-tighter mb-0.5 leading-none">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-emerald-50">
               <ShieldCheck size={14} className="text-[#00BFA5]" />
            </div>
            <span className="text-[#00BFA5] uppercase tracking-[0.15em] text-[15px] font-black">Encrypted Channel</span>
        </div>
        <span className="text-[10px] font-bold text-slate-400 capitalize">{vitals.last_sync || 'synced just now'}</span>
      </div>
    </Card>
  );
};

const QuickAccessItem = ({ title, time, icon: Icon, isLast }) => {
  return (
    <div className={`group flex items-center justify-between py-3 cursor-pointer ${!isLast ? 'border-b border-slate-50' : ''}`}>
      <div className="flex items-center gap-4 text-slate-500">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-teal-50 group-hover:border-teal-100 transition-all duration-300">
          <Icon size={18} strokeWidth={2} className="text-slate-400 group-hover:text-[#0E7B62] transition-colors" />
        </div>
        <div>
          <h5 className="text-[13.5px] font-bold text-slate-700 group-hover:text-[#0E7B62] transition-colors tracking-tight">
            {title}
          </h5>
          <p className="text-[11.5px] font-bold text-slate-400">{time}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#0E7B62] group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );
};

const QuickAccessCard = ({ items }) => {
  return (
    <Card className="hover:border-slate-300 transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-[4px] h-5 bg-[#0E7B62] rounded-full shadow-[0_0_8px_rgba(14,123,98,0.3)]"></div>
        <h4 className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
          Quick Access
        </h4>
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <QuickAccessItem
            key={index}
            {...item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </Card>
  );
};

const SupportAssistanceCard = () => {
  return (
    <div className="rounded-[24px] bg-gradient-to-br from-[#1C2532] to-[#0D1520] p-7 lg:p-8 shadow-2xl border border-slate-800 relative overflow-hidden group min-h-[170px] flex items-center">
      <div className="absolute -right-4 -bottom-4 lg:right-0 lg:bottom-0 w-32 h-32 lg:w-40 lg:h-40 transform translate-x-3 translate-y-3 transition-transform duration-700 group-hover:scale-110 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0">
        <img
          src="/support_agent.png"
          alt="Assistant"
          className="w-full h-full object-cover rounded-full border-[4px] border-slate-800/10 shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all"
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>
      <div className="relative z-10 w-[70%] lg:w-[65%]">
        <h4 className="text-[16px] lg:text-[18px] font-extrabold text-white mb-2.5 tracking-wide">
          Need Assistance?
        </h4>
        <p className="text-[13px] lg:text-[14px] text-slate-400 leading-relaxed font-bold">
          Our care team is available 24/7 for record retrieval help.
        </p>
      </div>
    </div>
  );
};

export { RecordCompletionCard, VitalStatsCard, QuickAccessCard, SupportAssistanceCard };
