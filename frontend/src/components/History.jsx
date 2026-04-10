import React, { useState } from 'react';
import { 
  CheckCircle2, PillBottle, HeartPulse, Activity, FileText, 
  ChevronDown, Syringe, Clock, Thermometer, Droplet, Layers, X
} from 'lucide-react';

export default function History() {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="max-w-[1240px] mx-auto space-y-6 lg:space-y-8 pb-12 pt-2 xl:pt-4 fadeIn relative">
      
      {/* Header section */}
      <div className="mb-10 text-center lg:text-left pl-0 lg:pl-10">
         <h2 className="text-3xl lg:text-[40px] font-extrabold text-[#085F63] tracking-tight mb-3">Health History Timeline</h2>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-4xl mx-auto mt-16 pt-4 pb-12">
         {/* Vertical Line */}
         <div className="absolute left-[23.5px] lg:left-1/2 top-4 bottom-12 w-[3px] bg-slate-200 lg:-translate-x-1/2 rounded-full z-0" />

         {/* --- Timeline Rows --- */}
         
         {/* ITEM 1 */}
         <TimelineRow 
            align="left"
            date="OCTOBER 14, 2023"
            title="Annual Cardiovascular Screen"
            itemData={modalDataMap[1]}
            onClick={() => setSelectedNode(modalDataMap[1])}
         >
            <div className="bg-white rounded-[16px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 p-6 text-left">
               <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#0E7B62] tracking-widest uppercase mb-4">
                  <CheckCircle2 size={14} className="text-[#0E7B62]" /> Diagnostic Complete
               </div>
               <p className="text-[13px] text-slate-600 leading-relaxed mb-5 font-medium">
                 Stable resting heart rate maintained. Lipid profile shows marked improvement from previous quarter. Continued monitoring of VO2 max recommended during active recovery cycles.
               </p>
               <div className="bg-[#F8FAFC] rounded-[12px] p-4 border border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">Clinical Notes</span>
                     <ChevronDown size={14} className="text-slate-400" />
                  </div>
                  <ul className="space-y-2 text-[12.5px] text-slate-600 font-medium">
                     <li className="flex items-start gap-2"><span className="text-slate-400">•</span> BP: 118/76 mmHg</li>
                     <li className="flex items-start gap-2"><span className="text-slate-400">•</span> Resting HR: 62 bpm</li>
                     <li className="flex items-start gap-2"><span className="text-slate-400">•</span> Recommendation: Increase Omega-3 intake.</li>
                  </ul>
               </div>
            </div>
         </TimelineRow>

         {/* ITEM 2 */}
         <TimelineRow 
            align="right"
            date="AUGUST 02, 2023"
            title="Minor Orthopedic Intervention"
            itemData={modalDataMap[2]}
            onClick={() => setSelectedNode(modalDataMap[2])}
         >
            <div className="bg-white rounded-[16px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden text-left pb-6">
               <div className="h-[140px] w-full bg-slate-900 border-b border-slate-200 overflow-hidden relative group">
                  <img src="/knee_xray.png" alt="Xray" className="w-full h-full object-cover opacity-80 mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-700" onError={(e) => e.target.style.display='none'} />
                  {/* Fallback pattern if image is missing */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900 -z-10 flex items-center justify-center">
                    <Activity size={32} className="text-white/20" />
                  </div>
               </div>
               <div className="px-6 pt-5">
                 <p className="text-[13px] text-slate-600 leading-relaxed mb-4 font-medium">
                   Arthroscopic review of right knee lateral meniscus. Minimal wear detected. Physical therapy regimen prescribed for 6 weeks.
                 </p>
                 <div className="flex gap-2">
                    <span className="bg-[#EEF2FF] text-[#4F46E5] text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">Physical Therapy</span>
                    <span className="bg-[#EEF2FF] text-[#4F46E5] text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">Rehab</span>
                 </div>
               </div>
            </div>
         </TimelineRow>

         {/* ITEM 3 */}
         <TimelineRow 
            align="left"
            date="MAY 19, 2023"
            title="Vaccination Cycle"
            itemData={modalDataMap[3]}
            onClick={() => setSelectedNode(modalDataMap[3])}
         >
            <div className="bg-white rounded-[16px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 p-5 flex items-start gap-4 text-left">
               <div className="w-12 h-12 bg-[#E6F4F1] rounded-full flex items-center justify-center shrink-0 border border-[#CEE9E1]">
                  <Syringe size={20} className="text-[#0E7B62]" />
               </div>
               <div>
                  <h4 className="text-[15px] font-bold text-[#085F63] mb-1 leading-tight">Annual Influenza Booster</h4>
                  <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                     Administered at City Medical Center. No adverse reactions recorded.
                  </p>
               </div>
            </div>
         </TimelineRow>

         {/* ITEM 4 */}
         <TimelineRow 
            align="right"
            date="FEBRUARY 11, 2023"
            title="Metabolic Baseline Study"
            itemData={modalDataMap[4]}
            onClick={() => setSelectedNode(modalDataMap[4])}
         >
            <div className="bg-white rounded-[16px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 p-5 text-left">
               <div className="flex gap-3 mb-3">
                  <div className="bg-[#F1F5F9] border border-slate-200 rounded-[12px] p-3 flex-1">
                     <div className="text-[9px] font-extrabold tracking-widest text-[#64748B] uppercase mb-1">Glucose</div>
                     <div className="text-[18px] font-extrabold text-[#0F172A]">92 <span className="text-[12px] font-bold text-slate-400">mg/dL</span></div>
                  </div>
                  <div className="bg-[#F1F5F9] border border-slate-200 rounded-[12px] p-3 w-1/3">
                     <div className="text-[9px] font-extrabold tracking-widest text-[#64748B] uppercase mb-1">HbA1c</div>
                     <div className="text-[18px] font-extrabold text-[#0F172A]">5.1%</div>
                  </div>
               </div>
               <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-[12px] p-4 text-[#3730A3]">
                  <div className="flex items-center gap-2 mb-1">
                     <PillBottle size={14} />
                     <span className="text-[10px] font-extrabold tracking-widest uppercase">Prescription</span>
                  </div>
                  <h4 className="font-bold text-[14px] mb-1">Magnesium Glycinate - 400mg Daily</h4>
                  <p className="text-[11px] font-semibold opacity-70">To support neurological recovery and sleep hygiene.</p>
               </div>
            </div>
         </TimelineRow>

      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 lg:bottom-10 lg:right-12 w-14 h-14 bg-[#085F63] hover:bg-[#064B4E] rounded-full flex items-center justify-center text-white shadow-[0_4px_16px_rgba(8,95,99,0.4)] hover:scale-105 transition-all z-20">
         <FileText size={22} strokeWidth={2.5} />
      </button>

      {/* History Modal pop-in */}
      {selectedNode && <HistoryModal data={selectedNode} onClose={() => setSelectedNode(null)} />}
    </div>
  )
}

// ----------------------------------------------------
// UI COMPONENTS
// ----------------------------------------------------

function TimelineRow({ align, date, title, children, onClick }) {
  const isLeft = align === 'left';

  return (
     <div className="relative flex flex-col lg:flex-row items-center w-full mb-10 lg:mb-16 group z-10 w-full px-2 lg:px-0">
        
        {/* Node Dot (Both Mobile & Desktop) */}
        <div 
           className="absolute left-[16px] lg:left-1/2 top-[22px] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 lg:w-[18px] lg:h-[18px] rounded-full bg-[#0E7B62] border-[3px] border-[#F4F7FB] shadow-[0_0_0_4px_rgba(14,123,98,0.1)] cursor-pointer hover:scale-[1.3] transition-transform z-10" 
           onClick={onClick}
           title="Click to view details"
        />

        {/* --- MOBILE LAYOUT --- */}
        <div className="flex lg:hidden flex-col w-full pl-[46px] pr-2 pt-1 pb-4">
           <div className="mb-4 inline-block cursor-pointer" onClick={onClick}>
              <h4 className="text-[13px] font-extrabold text-[#546881] tracking-[0.1em] uppercase mb-1">{date}</h4>
              <h3 className="text-[18px] font-extrabold text-[#085F63] leading-tight active:opacity-70">{title}</h3>
           </div>
           <div className="w-full cursor-pointer hover:opacity-95 active:scale-[0.98] transition-all" onClick={onClick}>
              {children}
           </div>
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:flex w-full items-center justify-between">
           {/* Left column */}
           <div className="w-[calc(50%-3rem)] flex justify-end text-right">
              {isLeft ? (
                 <div className="cursor-pointer group-hover:-translate-x-2 transition-transform duration-300" onClick={onClick}>
                    <h4 className="text-[13px] font-bold text-[#546881] tracking-[0.15em] uppercase mb-2">{date}</h4>
                    <h3 className="text-[20px] font-extrabold text-[#085F63] hover:text-[#0C8085] transition-colors">{title}</h3>
                 </div>
              ) : (
                 <div className="w-full max-w-sm float-right cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white rounded-[16px]" onClick={onClick}>
                    {children}
                 </div>
              )}
           </div>

           {/* Right column */}
           <div className="w-[calc(50%-3rem)] flex justify-start text-left">
              {!isLeft ? (
                 <div className="cursor-pointer group-hover:translate-x-2 transition-transform duration-300" onClick={onClick}>
                    <h4 className="text-[13px] font-bold text-[#546881] tracking-[0.15em] uppercase mb-2">{date}</h4>
                    <h3 className="text-[20px] font-extrabold text-[#085F63] hover:text-[#0C8085] transition-colors">{title}</h3>
                 </div>
              ) : (
                 <div className="w-full max-w-sm float-left cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white rounded-[16px]" onClick={onClick}>
                    {children}
                 </div>
              )}
           </div>
        </div>
     </div>
  );
}

// ----------------------------------------------------
// POP-IN MODAL
// ----------------------------------------------------

function HistoryModal({ data, onClose }) {
  if (!data) return null;
  return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
        
        {/* Modal Window */}
        <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
           {/* Header */}
           <div className="p-6 lg:p-7 border-b border-slate-100 flex justify-between items-start bg-slate-50/80">
              <div>
                 <h4 className="text-[11px] font-extrabold tracking-[0.15em] text-[#0E7B62] uppercase mb-2">{data.date}</h4>
                 <h2 className="text-[24px] font-extrabold text-slate-800 tracking-tight leading-tight">{data.title}</h2>
              </div>
              <button className="p-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-full text-slate-500 transition-colors shadow-sm ml-4" onClick={onClose}>
                 <X size={18} className="stroke-[2.5px]" />
              </button>
           </div>
           
           {/* Body */}
           <div className="p-6 lg:p-7 overflow-y-auto bg-white custom-scrollbar">
              {/* Summary Section */}
              <div className="mb-8">
                 <h3 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Activity size={16} className="text-slate-400" /> Clinical Summary
                 </h3>
                 <p className="text-[14px] lg:text-[14.5px] text-slate-600 leading-relaxed bg-[#F8FAFC] p-5 rounded-[16px] border border-slate-100 font-medium">
                   {data.summary}
                 </p>
              </div>

              {/* Data Cards */}
              <h3 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers size={16} className="text-slate-400" /> Key Metrics & Insights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {data.cards.map((card, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-5 rounded-[18px] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] text-center flex flex-col items-center">
                       <div className="w-11 h-11 bg-[#F4F7FB] text-[#085F63] rounded-[12px] flex items-center justify-center mb-4 border border-slate-100">
                          <card.icon size={22} strokeWidth={2} />
                       </div>
                       <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">{card.label}</div>
                       <div className="text-[16px] font-black text-slate-800 leading-tight">{card.value}</div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Footer */}
           <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button className="px-6 py-3 bg-[#085F63] hover:bg-[#064B4E] text-white rounded-[14px] font-bold text-[14px] transition-colors shadow-sm" onClick={onClose}>
                Close Details
              </button>
           </div>
        </div>
     </div>
  )
}

// ----------------------------------------------------
// DUMMY MODAL DATA
// ----------------------------------------------------

const modalDataMap = {
   1: {
      date: "OCTOBER 14, 2023",
      title: "Annual Cardiovascular Screen",
      summary: "Patient underwent a routine cardiovascular screening framework focused on aerobic endurance and baseline lipid functions. No acute physiological distress detected at VO2 maximum ranges.",
      cards: [
        { label: "Blood Pressure", value: "118/76", icon: HeartPulse },
        { label: "Resting HR", value: "62 bpm", icon: Activity },
        { label: "Cholesterol", value: "185 mg/dL", icon: Droplet }
      ]
   },
   2: {
      date: "AUGUST 02, 2023",
      title: "Minor Orthopedic Intervention",
      summary: "Arthroscopic review of right knee lateral meniscus showed minor internal tear grade 1. Immediate postoperative stability observed. Patient cleared for weight-bearing exercises with localized bracing.",
      cards: [
        { label: "Procedure", value: "Arthroscopy", icon: Activity },
        { label: "Duration", value: "45 mins", icon: Clock },
        { label: "Therapy", value: "6 weeks", icon: Activity }
      ]
   },
   3: {
      date: "MAY 19, 2023",
      title: "Vaccination Cycle",
      summary: "Annual Influenza routine booster shot administered asynchronously during check-up. No counter reactive symptoms or localized edema reported after 24 hours.",
      cards: [
        { label: "Dose", value: "0.5 mL", icon: Syringe },
        { label: "Administered By", value: "Nurse Joy", icon: PillBottle },
        { label: "Temp (24Hr)", value: "98.4°F", icon: Thermometer }
      ]
   },
   4: {
      date: "FEBRUARY 11, 2023",
      title: "Metabolic Baseline Study",
      summary: "General fasting glucose metabolic readings measured. Numbers within optimal range. Slight mineral deficiency addressed with nightly Magnesium supplementation protocol.",
      cards: [
        { label: "Glucose", value: "92 mg/dL", icon: Droplet },
        { label: "HbA1c", value: "5.1%", icon: Activity },
        { label: "Metabolism", value: "Optimal", icon: CheckCircle2 }
      ]
   }
}
