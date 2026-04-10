import React from 'react';
import Card from '../ui/Card';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, value, label, badge, badgeColor, link, className = '' }) => {
  const navigate = useNavigate();
  return (
    <Card 
      hover 
      padding="none"
      onClick={() => link && navigate(link)}
      className={`flex flex-col justify-between h-[140px] lg:h-[160px] p-5 lg:p-6 group cursor-pointer ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className="p-2.5 lg:p-3 rounded-[12px] lg:rounded-[14px] bg-slate-50 text-slate-400 group-hover:text-[#0E7B62] group-hover:bg-teal-50/50 transition-all duration-300">
          <Icon size={22} strokeWidth={2} />
        </div>
        {badge && (
          <span className={`text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-slate-50 ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-0.5 tracking-tight">
          {value}
        </h3>
        <p className="text-[13px] lg:text-[14px] font-semibold text-slate-500 tracking-tight">
          {label}
        </p>
      </div>
    </Card>
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
