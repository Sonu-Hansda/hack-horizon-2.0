import React from 'react';
import Card from '../ui/Card';

const ActivityItem = ({ icon: Icon, iconBg, iconColor, title, time, description, tags, isLast }) => {
  return (
    <div 
      className={`p-5 lg:p-6 hover:bg-slate-50/50 transition-all duration-300 flex flex-col sm:flex-row gap-5 lg:gap-6 cursor-pointer group ${!isLast ? 'border-b border-slate-100/80' : ''}`}
    >
      <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-sm border border-black/5 group-hover:scale-105 transition-transform duration-300`}>
        <Icon size={22} strokeWidth={2} />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-4">
          <h4 className="text-[15px] lg:text-[16px] font-bold text-slate-900 tracking-tight group-hover:text-[#0E7B62] transition-colors">
            {title}
          </h4>
          <span className="text-[11px] lg:text-[12px] font-bold text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-md self-start sm:self-auto tracking-wide shrink-0">
            {time}
          </span>
        </div>
        <p className="text-[13px] lg:text-[14px] text-slate-500 leading-relaxed mb-4 max-w-[550px] font-medium">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 rounded-lg bg-teal-50 text-[#0E7B61] text-[10px] font-bold tracking-wider uppercase border border-teal-100/50"
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
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Recent Activity</h3>
        <button className="text-xs font-bold text-[#0E7158] hover:text-[#0A5D48] transition-colors tracking-widest uppercase bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100/50">
          View All
        </button>
      </div>

      <Card padding="none" className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {activities.map((activity, index) => (
          <ActivityItem 
            key={index} 
            {...activity} 
            isLast={index === activities.length - 1}
          />
        ))}
      </Card>
    </div>
  );
};

export default ActivityFeed;
