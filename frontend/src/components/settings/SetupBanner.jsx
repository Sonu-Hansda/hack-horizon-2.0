import React from 'react';
import { Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import Button from '../ui/Button';

const SetupBanner = ({ onStartSetup }) => {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 lg:p-10 shadow-2xl border border-slate-700/50 mb-8 group">
      {/* Decorative Elements */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#0E7B62]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#0E7B62]/30 transition-all duration-700"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0E7B62]/10 border border-[#0E7B62]/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(14,123,98,0.2)]">
            <UserCheck className="w-8 h-8 text-[#0E7B62]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight mb-2">
              Incomplete Patient Profile
            </h3>
            <p className="text-slate-400 text-sm lg:text-[15px] font-medium leading-relaxed max-w-xl">
              To provide the most accurate clinical insights and analytics, please complete your health baseline. It only takes 2 minutes.
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto shrink-0">
          <Button
            variant="teal"
            onClick={onStartSetup}
            className="w-full md:w-auto group/btn"
          >
            Complete Setup
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupBanner;
