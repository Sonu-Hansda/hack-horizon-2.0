import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BannerCard = ({ title, description, action, bg, link, icon: Icon }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(link)}
      className={`${bg} rounded-[32px] p-8 lg:p-11 relative overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-700 hover:scale-[1.015] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]`}
    >
      <Icon
        className="absolute -bottom-10 -right-10 lg:-bottom-12 lg:-right-12 w-48 h-48 lg:w-64 lg:h-64 text-white/[0.03] group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000 pointer-events-none"
        strokeWidth={1.5}
      />
      
      <div className="relative z-10 max-w-[420px]">
        <h3 className="text-white text-2xl lg:text-3xl font-black mb-4 tracking-tighter leading-tight">
          {title}
        </h3>
        <p className="text-white/70 text-[14px] lg:text-[15.5px] font-medium leading-relaxed mb-10 max-w-[320px]">
          {description}
        </p>
        
        <button 
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-2xl font-black text-[13px] lg:text-[14px] flex items-center gap-3 transition-all duration-300 group/btn shadow-sm"
        >
          {action}
          <ArrowRight size={18} strokeWidth={3} className="group-hover/btn:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const BannerGrid = ({ banners }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7">
      {banners.map((banner, index) => (
        <BannerCard key={index} {...banner} />
      ))}
    </div>
  );
};

export default BannerGrid;
