import React from 'react';
import { 
  ChevronRight, Filter, FileText, Share2, 
  MoreVertical, CheckCircle2, Plus, FlaskConical 
} from 'lucide-react';

export default function MedicalReport() {
  return (
    <div className="max-w-[1300px] mx-auto space-y-6 lg:space-y-8 pb-8 pt-2 xl:pt-4 fadeIn relative">
      
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase mb-3">
             <span className="text-slate-400">MediSync</span>
             <ChevronRight size={12} className="text-slate-300" />
             <span className="text-[#0E7158]">Medical Records</span>
           </div>
           <h2 className="text-3xl lg:text-[36px] font-extrabold text-slate-800 tracking-tight mb-2.5">Patient Records</h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
           <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-[12px] font-bold text-[14px] hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
             <Filter size={16} strokeWidth={2.5} />
             Filter
           </button>
           <button className="flex items-center justify-center gap-2 bg-[#0E7B62] text-white px-5 py-2.5 rounded-[12px] font-bold text-[14px] hover:bg-[#0A5D48] transition-colors shadow-sm active:scale-95">
             <FileText size={16} strokeWidth={2.5} />
             Upload New Record
           </button>
        </div>
      </div>
    </div>
  )
}

function RecordTab({ label, active }) {
  return (
    <button className={`pb-3 px-1 font-bold text-[13.5px] whitespace-nowrap transition-all border-b-[3px] ${active ? 'border-[#0E7B62] text-[#0E7158]' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}`}>
      {label}
    </button>
  )
}
