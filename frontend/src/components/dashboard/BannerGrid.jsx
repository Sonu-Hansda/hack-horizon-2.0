import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BannerCard = ({ title, description, action, bg, link, icon: Icon }) => {
  const navigate = useNavigate();
  return (
    <div className={`${bg} rounded-[24px] p-7 lg:p-10 relative overflow-hidden group cursor-pointer shadow-xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl`}>
      <Icon
        className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-32 h-32 lg:w-48 lg:h-48 text-white/10 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none"
        strokeWidth={1}
      />
      <div className="relative z-10 pr-8 lg:pr-20">
        <h3 className="text-white text-xl lg:text-2xl font-extrabold mb-3 lg:mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-white/80 text-[14px] lg:text-[15px] font-medium leading-relaxed mb-8 lg:mb-10 max-w-[320px]">
          {description}
        </p>
        <button onClick={() => navigate(link)} className="text-white font-bold text-sm lg:text-base flex items-center gap-2.5 group-hover:gap-4 transition-all duration-300">
          <span className="border-b-2 border-white/30 pb-0.5 group-hover:border-white transition-colors">
            {action}
          </span>
          <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
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
