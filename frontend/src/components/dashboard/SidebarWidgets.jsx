import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ChevronRight } from 'lucide-react';

const RecordCompletionCard = ({ percentage = 85 }) => {
  return (
    <Card className="hover:border-[#0E7B62]/20 transition-all duration-300">
      <h4 className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-5">
        Record Completion
      </h4>
      <div className="flex justify-between items-end mb-3">
        <span className="text-[11px] font-extrabold text-[#0E7B62] tracking-wider bg-teal-50 px-2.5 py-1 rounded-full uppercase">
          Good Standing
        </span>
        <span className="text-sm font-black text-slate-800">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full mb-6 overflow-hidden border border-slate-200/30">
        <div 
          className="h-full bg-[#0E7B62] rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-[13px] lg:text-[14px] text-slate-500 mb-6 leading-relaxed font-medium">
        Your profile is missing clinical imaging from 2023. Link your radiology provider to reach 100%.
      </p>
      <Button variant="secondary" fullWidth size="small">
        Complete Profile
      </Button>
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

export { RecordCompletionCard, QuickAccessCard, SupportAssistanceCard };
