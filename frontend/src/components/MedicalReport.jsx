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
             <span className="text-slate-400">Clinical Curator</span>
             <ChevronRight size={12} className="text-slate-300" />
             <span className="text-[#0E7158]">Medical Records</span>
           </div>
           <h2 className="text-3xl lg:text-[36px] font-extrabold text-slate-800 tracking-tight mb-2.5">Patient Records Vault</h2>
           <p className="text-slate-500 font-medium text-[15px] max-w-2xl leading-relaxed">
             Centralized access to your longitudinal health data, curated for diagnostic clarity and care continuity.
           </p>
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

      {/* Tabs Menu */}
      <div className="flex items-center gap-8 border-b border-slate-200/80 overflow-x-auto custom-scrollbar pt-2 px-1">
        <RecordTab label="Diagnostic Reports" active />
        <RecordTab label="Medications" />
        <RecordTab label="Prescriptions" />
        <RecordTab label="Doctor Summaries" />
        <RecordTab label="Lab Results" />
      </div>

      {/* Masonry-Style Responsive Grid (4 Columns max) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        
        {/* ROW 1 */}
        {/* Card 1: Col Span 2 */}
        <div className="col-span-1 sm:col-span-2 bg-white rounded-[24px] p-7 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 flex flex-col justify-between group hover:border-slate-300 transition-colors min-h-[300px]">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0">
                <FlaskConical size={22} className="text-[#0E7B62]" />
              </div>
              <span className="bg-red-50 text-[#CC3333] text-[9.5px] font-bold tracking-[0.1em] px-3.5 py-1.5 rounded-[10px] uppercase">Critical Review</span>
            </div>
            <h3 className="text-[22px] font-extrabold text-slate-800 tracking-tight mb-2.5">Comprehensive Metabolic Panel</h3>
            <p className="text-slate-500 text-[14px] font-medium leading-relaxed mb-6 max-w-[400px]">
              Detailed analysis of liver function, kidney health, and electrolyte balance. Conducted by Meridian Diagnostics Lab.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="bg-[#F8FAFC] rounded-[16px] p-4 flex-1 border border-slate-100">
                <h5 className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Last Update</h5>
                <p className="text-[15px] font-bold text-slate-800">Oct 24, 2024</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-[16px] p-4 flex-1 border border-slate-100">
                <h5 className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Clinician</h5>
                <p className="text-[15px] font-bold text-slate-800">Dr. Elena Vance</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-[#151D28] hover:bg-[#0B0F15] text-white py-3.5 rounded-[14px] font-bold text-[14px] transition-colors shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)]">
              View Full Analysis
            </button>
            <button className="p-3.5 border border-slate-200 rounded-[14px] text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors shrink-0">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 flex flex-col group hover:border-slate-300 transition-colors">
           <div className="flex justify-between items-start mb-4">
             <span className="bg-slate-100 text-slate-500 text-[9.5px] font-bold tracking-[0.1em] px-2.5 py-1.5 rounded-[8px] uppercase">Diagnostic</span>
             <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreVertical size={18} /></button>
           </div>
           <h3 className="text-[17px] font-bold text-slate-800 tracking-tight mb-0.5">Cardiac MRI Scan</h3>
           <p className="text-[12px] text-slate-400 font-medium italic mb-5">Radiology Dept • Oct 12, 2024</p>
           
           <div className="rounded-[18px] overflow-hidden mb-6 bg-slate-800 w-full flex items-center justify-center border border-slate-200/50 relative">
             <img src="/mri_scan.png" alt="Cardiac MRI" className="w-full h-auto object-cover scale-105 mix-blend-screen opacity-90" onError={(e) => e.target.style.display = 'none'} />
           </div>

           <button className="w-full mt-auto py-3.5 rounded-[14px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:border-slate-300 hover:bg-slate-50 transition-colors">
              Download PDF
           </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 flex flex-col group hover:border-slate-300 transition-colors">
           <div className="flex justify-between items-start mb-4">
             <span className="bg-[#D1F1E8] text-[#0E7158] text-[9.5px] font-bold tracking-[0.1em] px-3 py-1.5 rounded-[8px] uppercase">Completed</span>
             <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreVertical size={18} /></button>
           </div>
           <h3 className="text-[17px] font-bold text-slate-800 tracking-tight mb-0.5">Sleep Apnea Study</h3>
           <p className="text-[12px] text-slate-400 font-medium italic mb-6">Sleep Lab • Sep 26, 2024</p>
           
           <ul className="space-y-4 mb-6 flex-1 px-1">
             <li className="flex items-start gap-3 text-[13.5px] font-medium text-slate-600 leading-snug">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0E7B62] mt-2 shrink-0" />
                <span>Stage 3 REM analysis attached</span>
             </li>
             <li className="flex items-start gap-3 text-[13.5px] font-medium text-slate-600 leading-snug">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0E7B62] mt-2 shrink-0" />
                <span>SpO2 trend data curated</span>
             </li>
           </ul>

           <button className="w-full mt-auto py-3.5 rounded-[14px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:border-slate-300 hover:bg-slate-50 transition-colors">
              Open Report
           </button>
        </div>

        {/* ROW 2 */}
        
        {/* Card 4 */}
        <div className="col-span-1 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 flex flex-col group hover:border-slate-300 transition-colors min-h-[260px]">
           <div className="flex justify-between items-start mb-4">
             <span className="bg-slate-100 text-slate-500 text-[9.5px] font-bold tracking-[0.1em] px-2.5 py-1.5 rounded-[8px] uppercase">Prescription</span>
             <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreVertical size={18} /></button>
           </div>
           <h3 className="text-[18px] font-bold text-slate-800 tracking-tight mb-0.5 mt-2">Lisinopril 10mg</h3>
           <p className="text-[12px] text-slate-400 font-medium italic mb-8">Refill Status: 2/3 • Dr. S. Chen</p>
           
           <div className="bg-[#F8FAFC] rounded-[16px] p-4.5 mb-6 border border-slate-100">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <span className="text-slate-400">Dosage</span>
                <span className="text-[#0E7B62]">Once Daily</span>
              </div>
              <div className="h-2 px-1 w-full bg-slate-200/80 rounded-full flex items-center">
                 <div className="h-1 bg-[#0E7B62] w-[45%] rounded-full relative" />
              </div>
           </div>

           <button className="w-full mt-auto py-3.5 rounded-[14px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:border-slate-300 hover:bg-slate-50 transition-colors">
              Request Refill
           </button>
        </div>

        {/* Card 5 */}
        <div className="col-span-1 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 flex flex-col group hover:border-slate-300 transition-colors min-h-[260px]">
           <div className="flex justify-between items-start mb-4">
             <span className="bg-slate-100 text-slate-500 text-[9.5px] font-bold tracking-[0.1em] px-2.5 py-1.5 rounded-[8px] uppercase">Immunization</span>
             <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreVertical size={18} /></button>
           </div>
           <h3 className="text-[18px] font-bold text-slate-800 tracking-tight mb-0.5 mt-2">Annual Influenza Shot</h3>
           <p className="text-[12px] text-slate-400 font-medium italic mb-6">Community Clinic • Sep 15, 2024</p>
           
           <div className="flex items-center gap-3.5 mb-6 mt-1 flex-1">
             <div className="w-11 h-11 rounded-[14px] bg-[#EAF7F3] flex items-center justify-center shrink-0 border border-[#CEE9E1]">
               <CheckCircle2 size={22} className="text-[#0E7B62]" />
             </div>
             <div>
               <p className="text-[14px] font-bold text-slate-800 tracking-tight">Verified</p>
               <p className="text-[11px] text-slate-400 font-medium mt-0.5">CDC Compliant</p>
             </div>
           </div>

           <button className="w-full mt-auto py-3.5 rounded-[14px] border border-slate-200 text-slate-700 font-bold text-[13px] hover:border-slate-300 hover:bg-slate-50 transition-colors">
              View Certificate
           </button>
        </div>

        {/* Card 6 */}
        <div className="col-span-1 bg-white rounded-[24px] p-6 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.05)] border border-slate-200/60 flex flex-col group hover:border-slate-300 transition-colors min-h-[260px]">
           <div className="flex justify-between items-start mb-4">
             <span className="bg-red-50 text-[#CC3333] text-[9.5px] font-bold tracking-[0.1em] px-3 py-1.5 rounded-[8px] uppercase">Urgent Action</span>
             <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreVertical size={18} /></button>
           </div>
           <h3 className="text-[17px] font-bold text-slate-800 tracking-tight mb-0.5 mt-2">Glucose Level Summary</h3>
           <p className="text-[12px] text-slate-400 font-medium italic mb-6">Self-Reported • Oct 27, 2024</p>
           
           <div className="flex items-baseline gap-1.5 mb-6 mt-1 flex-1">
             <span className="text-[46px] font-extrabold text-[#CC3333] tracking-tight leading-none">142</span>
             <span className="text-[13px] font-bold text-slate-400 pb-1">mg/dL.</span>
           </div>

           <button className="w-full mt-auto py-3.5 rounded-[14px] bg-[#CF1E1E] text-white font-bold text-[13px] hover:bg-[#B01A1A] transition-colors shadow-[0_4px_12px_-4px_rgba(207,30,30,0.4)]">
              Log Response
           </button>
        </div>

        {/* Card 7 */}
        <div className="col-span-1 rounded-[24px] p-6 border-2 border-dashed border-slate-200/80 bg-slate-50/30 flex flex-col items-center justify-center group hover:border-slate-300 hover:bg-slate-50 transition-colors min-h-[260px] cursor-pointer">
           <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-sm border border-slate-100 text-slate-400 group-hover:text-slate-600">
              <Plus size={24} strokeWidth={2.5} />
           </div>
           <h3 className="text-[15.5px] font-bold text-slate-800 tracking-tight mb-2">Import New Data</h3>
           <p className="text-[12.5px] text-slate-400 font-medium text-center max-w-[180px] leading-relaxed">
             Sync via Apple Health, MyChart or manual upload.
           </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center text-[12px] text-slate-400 font-medium py-8 mt-4 border-t border-slate-200/60 gap-4">
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap justify-center">
          <span className="font-extrabold text-slate-600 text-[13px]">Clinical Curator</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="text-slate-400 text-center">&copy; 2024 Clinical Curator SaaS. HIPAA Compliant.</span>
        </div>
        <div className="flex items-center gap-4 lg:gap-8 flex-wrap justify-center text-[11px] lg:text-[12px]">
          <a href="#" className="hover:text-slate-700 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-700 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-700 transition-colors">Security</a>
          <a href="#" className="hover:text-slate-700 transition-colors">Support</a>
        </div>
      </footer>
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
