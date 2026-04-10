import React from 'react';
import Card from '../ui/Card';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, value, label, badge, badgeColor, link, className = '' }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => link && navigate(link)}
      className={`flex flex-col justify-between h-[150px] lg:h-[180px] p-6 lg:p-8 group cursor-pointer border rounded-[32px] transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${
        label.toLowerCase().includes('medication') 
          ? 'bg-emerald-50/50 border-emerald-100/50 hover:bg-emerald-50 hover:border-emerald-200' 
          : label.toLowerCase().includes('activity')
          ? 'bg-orange-50/50 border-orange-100/50 hover:bg-orange-50 hover:border-orange-200'
          : 'bg-indigo-50/50 border-indigo-100/50 hover:bg-indigo-50 hover:border-indigo-200'
      } ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 lg:p-4 rounded-[20px] shadow-sm transition-all duration-500 group-hover:scale-110 ${
          label.toLowerCase().includes('medication')
            ? 'bg-emerald-100 text-[#00BFA5]'
            : label.toLowerCase().includes('activity')
            ? 'bg-orange-100 text-[#FFAB40]'
            : 'bg-indigo-100 text-indigo-600'
        }`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {badge && (
          <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white/80 shadow-sm ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-1 lg:mb-1.5 tracking-tight">
          {value}
        </h3>
        <p className="text-[13px] lg:text-[14.5px] font-bold text-slate-500 tracking-tight leading-none group-hover:text-slate-800 transition-colors">
          {label}
        </p>
      </div>
    </div>
  );
};

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          {...stat}
          className={index === 2 ? "sm:col-span-2 md:col-span-1" : ""}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
