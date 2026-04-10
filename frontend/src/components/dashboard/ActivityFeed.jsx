import React from 'react';
import Card from '../ui/Card';

const ActivityItem = ({ icon: Icon, iconBg, iconColor, title, time, description, tags, isLast }) => {
  return (
    <div 
      className={`p-6 lg:p-7 hover:bg-slate-50/40 transition-all duration-300 flex flex-col sm:flex-row gap-6 cursor-pointer group ${!isLast ? 'border-b border-slate-50' : ''}`}
    >
      <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-[24px] ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-sm border border-white group-hover:scale-105 transition-all duration-500`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2.5 gap-1 sm:gap-4">
          <h4 className="text-[16px] lg:text-[17px] font-black text-slate-800 tracking-tight group-hover:text-[#00BFA5] transition-colors leading-tight">
            {title}
          </h4>
          <span className="text-[10px] lg:text-[11px] font-black text-slate-400 bg-slate-100/30 border border-slate-100/50 px-2.5 py-1 rounded-lg self-start sm:self-auto tracking-widest uppercase shrink-0">
            {time}
          </span>
        </div>
        <p className="text-[13px] lg:text-[14.5px] text-slate-500 leading-relaxed mb-5 max-w-[580px] font-medium">
          {description}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-3.5 py-1.5 rounded-xl bg-white text-slate-600 text-[10px] font-black tracking-widest uppercase border border-slate-100 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = ({ activities }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
           <div className="w-1.5 h-4 bg-[#00BFA5] rounded-full"></div>
           <h3 className="text-[18px] lg:text-[20px] font-black text-slate-800 tracking-tight">Timeline</h3>
        </div>
        <button className="text-[11px] font-black text-[#00BFA5] tracking-widest uppercase bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50 hover:bg-[#00BFA5] hover:text-white transition-all">
          View History
        </button>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50">
        {activities.map((activity, index) => (
          <ActivityItem 
            key={index} 
            {...activity} 
            isLast={index === activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
