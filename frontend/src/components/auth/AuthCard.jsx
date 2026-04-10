import React from 'react';
import { ShieldPlus } from 'lucide-react';
import Card from '../ui/Card';

const AuthCard = ({ 
  children, 
  title, 
  subtitle, 
  footer,
  className = '' 
}) => {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#F4F7FB] p-4 ${className}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-center shadow-sm mb-4">
            <ShieldPlus size={28} strokeWidth={2.5} />
          </div>
          <h1 className="font-extrabold text-[20px] tracking-tight text-slate-900">HealthRecord</h1>
          <p className="text-[11px] font-bold tracking-[0.2em] text-teal-600 uppercase mt-1">Precision Care</p>
        </div>

        {/* Card */}
        <Card padding="large" hover>
          {title && (
            <div className="text-center mb-6">
              <h2 className="text-[18px] font-bold text-slate-800 tracking-tight mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-[13px] text-slate-500 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          <div className="space-y-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              {footer}
            </div>
          )}
        </Card>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} HealthRecord. HIPAA Compliant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;