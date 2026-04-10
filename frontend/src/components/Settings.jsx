import React, { useState } from 'react';
import { 
  User, Activity, Footprints, FileText, Cloud, 
  Minus, Plus, ChevronDown, CheckCircle2 
} from 'lucide-react';

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);
  const [bgOpen, setBgOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    age: '34',
    sex: 'Male',
    bloodGroup: 'O-Positive (O+)',
    height: '182',
    weight: '78.5',
    
    hr: '72',
    bp: '120/80',
    respRate: '16',
    spo2: '98',
    
    stepsValue: 10000,
    sleepValue: 8.0,
    activityLevel: 'Moderate',
    waterIntake: 2.5,
    
    primaryConcerns: 'Patient reports intermittent mild dyspnea upon exertion. No chest pain or radiation. Baseline ECG within normal limits last quarter. Monitoring for mild hypertension.',
    familyHistory: 'Father: Type 2 Diabetes, Hypertension. Mother: Osteoarthritis. No known history of early cardiac events.'
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleWaterChange = (increment) => {
    setFormData(prev => {
      let newAmount = prev.waterIntake + increment;
      if(newAmount < 0) newAmount = 0;
      return { ...prev, waterIntake: parseFloat(newAmount.toFixed(1)) };
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveComplete(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaveComplete(true);
      setTimeout(() => setSaveComplete(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 lg:space-y-8 pb-16 pt-2 xl:pt-4 fadeIn relative">
      
      {/* Header */}
      <div className="mb-10 text-left pl-2">
         <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.15em] uppercase mb-2">
            <div className="w-6 h-0.5 bg-[#0E7B62] rounded-full"></div>
            <span className="text-[#0E7B62]">Configuration</span>
         </div>
         <h2 className="text-3xl lg:text-[40px] font-extrabold text-[#0B1221] tracking-tight mb-3">Clinical Data Entry</h2>
         <p className="text-slate-500 font-medium text-[14.5px] max-w-2xl leading-relaxed">
           Modify baseline physiological parameters and lifestyle metrics. Changes will be synchronized across the patient care team and updated in real-time analytics.
         </p>
      </div>

      {/* SECTION 1: Core Biometrics */}
      <div className="bg-white rounded-[24px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 p-8 lg:p-10 transition-all hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-11 h-11 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
            <User size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-[19px] font-extrabold text-slate-800 tracking-tight">Core Biometrics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6">
          {/* Age */}
          <div>
            <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-2.5">Age</label>
            <div className="bg-[#F8FAFC] rounded-[14px] px-5 py-4 w-full">
               <input 
                 type="text" 
                 value={formData.age} 
                 onChange={(e) => handleChange('age', e.target.value)}
                 className="bg-transparent text-[22px] font-black text-slate-800 w-full outline-none" 
               />
            </div>
          </div>
          {/* Sex Assigned at Birth */}
          <div>
            <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-2.5">Sex Assigned at Birth</label>
            <div className="flex bg-[#F1F5F9] p-1.5 rounded-[16px] h-[64px]">
              {['Male', 'Female', 'Intersex', 'Undisclosed'].map(opt => (
                <button
                  key={opt}
                  onClick={() => handleChange('sex', opt)}
                  className={`flex-1 text-[13px] font-bold rounded-[12px] transition-all duration-300 ${
                    formData.sex === opt 
                      ? 'bg-white text-[#0E7A62] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)] border border-slate-200/50' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {/* Blood Group */}
          <div>
            <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-2.5">Blood Group</label>
            <div className="relative z-20">
              <div 
                onClick={() => setBgOpen(!bgOpen)}
                className={`flex items-center justify-between bg-[#F8FAFC] rounded-[14px] px-5 py-5 w-full cursor-pointer border transition-colors ${bgOpen ? 'border-[#0E7B62] bg-white shadow-[0_2px_12px_rgba(14,123,98,0.1)]' : 'border-transparent hover:border-slate-200'}`}
              >
                <span className="text-[15px] font-extrabold text-slate-800">{formData.bloodGroup}</span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${bgOpen ? 'rotate-180 text-[#0E7B62]' : ''}`} />
              </div>
              
              {bgOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBgOpen(false)}></div>
                  <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-[16px] shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-slate-100/80 overflow-hidden z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {['A-Positive (A+)', 'A-Negative (A-)', 'B-Positive (B+)', 'B-Negative (B-)', 'AB-Positive (AB+)', 'AB-Negative (AB-)', 'O-Positive (O+)', 'O-Negative (O-)'].map(bg => (
                      <div 
                        key={bg}
                        onClick={() => {
                          handleChange('bloodGroup', bg);
                          setBgOpen(false);
                        }}
                        className={`px-5 py-3.5 text-[14px] font-bold cursor-pointer transition-colors ${formData.bloodGroup === bg ? 'bg-[#F4FBFA] text-[#0E7A62]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        {bg}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Height */}
          <div>
            <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-2.5">Height (cm)</label>
            <div className="bg-[#F8FAFC] rounded-[14px] px-5 py-4 w-full">
               <input 
                 type="text" 
                 value={formData.height} 
                 onChange={(e) => handleChange('height', e.target.value)}
                 className="bg-transparent text-[22px] font-black text-slate-800 w-full outline-none" 
               />
            </div>
          </div>
          {/* Weight */}
          <div>
            <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-2.5">Weight (kg)</label>
            <div className="bg-[#F8FAFC] rounded-[14px] px-5 py-4 w-full">
               <input 
                 type="text" 
                 value={formData.weight} 
                 onChange={(e) => handleChange('weight', e.target.value)}
                 className="bg-transparent text-[22px] font-black text-slate-800 w-full outline-none" 
               />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Vitals & Baseline */}
      <div className="bg-white rounded-[24px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 p-8 lg:p-10 transition-all hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-11 h-11 rounded-full bg-[#E5F5F1] text-[#0E7A62] flex items-center justify-center shrink-0">
            <Activity size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-[19px] font-extrabold text-slate-800 tracking-tight">Vitals & Baseline</h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
           <div className="bg-[#F8FAFC] p-5 rounded-[16px] flex flex-col justify-between h-[100px] border border-transparent focus-within:border-slate-200 transition-colors">
              <label className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400">Heart Rate (bpm)</label>
              <div className="flex items-center justify-between">
                <input type="text" value={formData.hr} onChange={e=>handleChange('hr', e.target.value)} className="bg-transparent text-[28px] font-black text-slate-800 outline-none w-full" />
                <span className="text-[11px] font-extrabold text-[#0E7B62] uppercase tracking-wider">AVG</span>
              </div>
           </div>
           
           <div className="bg-[#F8FAFC] p-5 rounded-[16px] flex flex-col justify-between h-[100px] border border-transparent focus-within:border-slate-200 transition-colors">
              <label className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400">Blood Pressure (mmHg)</label>
              <div className="flex items-center justify-between">
                <input type="text" value={formData.bp} onChange={e=>handleChange('bp', e.target.value)} className="bg-transparent text-[28px] font-black text-slate-800 outline-none w-full" />
              </div>
           </div>
           
           <div className="bg-[#F8FAFC] p-5 rounded-[16px] flex flex-col justify-between h-[100px] border border-transparent focus-within:border-slate-200 transition-colors">
              <label className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400">Respiratory Rate</label>
              <div className="flex items-center justify-between">
                <input type="text" value={formData.respRate} onChange={e=>handleChange('respRate', e.target.value)} className="bg-transparent text-[28px] font-black text-slate-800 outline-none w-full" />
                <span className="text-[11px] font-bold text-slate-400 ml-1">rpm</span>
              </div>
           </div>
           
           <div className="bg-[#F8FAFC] p-5 rounded-[16px] flex flex-col justify-between h-[100px] border border-transparent focus-within:border-slate-200 transition-colors">
              <label className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400">Oxygen Sat (SpO2)</label>
              <div className="flex items-center justify-between">
                <input type="text" value={formData.spo2} onChange={e=>handleChange('spo2', e.target.value)} className="bg-transparent text-[28px] font-black text-slate-800 outline-none w-full" />
                <span className="text-[14px] font-extrabold text-[#0E7B62]">%</span>
              </div>
           </div>
        </div>
      </div>

      {/* SECTION 3: Lifestyle & Goals */}
      <div className="bg-white rounded-[24px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 p-8 lg:p-10 transition-all hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-11 h-11 rounded-full bg-[#FFF3ED] text-[#E85D04] flex items-center justify-center shrink-0">
            <Footprints size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-[19px] font-extrabold text-slate-800 tracking-tight">Lifestyle & Goals</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-10">
           {/* Steps Range */}
           <div>
             <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-extrabold tracking-widest uppercase text-slate-500">Daily Steps Goal</label>
                <div className="text-[16px] font-extrabold text-slate-800">{formData.stepsValue.toLocaleString()} steps</div>
             </div>
             <input 
               type="range" min="2000" max="20000" step="500" 
               value={formData.stepsValue} 
               onChange={e => handleChange('stepsValue', parseInt(e.target.value))}
               className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0E7B62] hover:accent-[#0A5D48] transition-colors"
             />
             <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-widest">
               <span>2k</span>
               <span>20k</span>
             </div>
           </div>
           
           {/* Sleep Range */}
           <div>
             <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-extrabold tracking-widest uppercase text-slate-500">Sleep Goal</label>
                <div className="text-[16px] font-extrabold text-slate-800">{formData.sleepValue.toFixed(1)} hrs</div>
             </div>
             <input 
               type="range" min="4" max="12" step="0.5" 
               value={formData.sleepValue} 
               onChange={e => handleChange('sleepValue', parseFloat(e.target.value))}
               className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0E7B62] hover:accent-[#0A5D48] transition-colors"
             />
             <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-widest">
               <span>4h</span>
               <span>12h</span>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
           {/* Physical Activity Levels */}
           <div>
             <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-4">Physical Activity Level</label>
             <div className="flex flex-wrap gap-3">
               {['Sedentary', 'Moderate', 'Active', 'Athlete'].map(level => (
                 <button
                   key={level}
                   onClick={() => handleChange('activityLevel', level)}
                   className={`px-5 py-2.5 rounded-[12px] text-[12px] font-extrabold transition-all border ${
                     formData.activityLevel === level 
                       ? 'border-[#0E7B62] text-[#0A5D48] bg-[#F4FBFA] shadow-sm' 
                       : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                   }`}
                 >
                   {level}
                 </button>
               ))}
             </div>
           </div>

           {/* Water Intake */}
           <div>
             <div className="flex justify-between items-end mb-4">
               <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500">Water Intake Target</label>
               <span className="text-[14px] font-extrabold text-slate-800">{formData.waterIntake.toFixed(1)} L</span>
             </div>
             <div className="flex items-center gap-3">
               <button 
                 onClick={() => handleWaterChange(-0.5)}
                 className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors shadow-sm active:scale-95"
               >
                 <Minus size={18} strokeWidth={2.5} />
               </button>
               
               <div className="flex-1 bg-[#F8FAFC] py-3 rounded-[14px] text-center font-extrabold text-[15px] text-slate-800 border border-slate-100">
                 {formData.waterIntake.toFixed(1)} Liters
               </div>
               
               <button 
                 onClick={() => handleWaterChange(0.5)}
                 className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors shadow-sm active:scale-95"
               >
                 <Plus size={18} strokeWidth={2.5} />
               </button>
             </div>
           </div>
        </div>
      </div>

      {/* SECTION 4: Clinical History Summary */}
      <div className="bg-white rounded-[24px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 p-8 lg:p-10 transition-all hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-11 h-11 rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-[19px] font-extrabold text-slate-800 tracking-tight">Clinical History Summary</h3>
        </div>

        <div className="space-y-6">
           <div>
             <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-3">Primary Health Concerns & Observations</label>
             <textarea 
               value={formData.primaryConcerns}
               onChange={(e) => handleChange('primaryConcerns', e.target.value)}
               className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-300 outline-none rounded-[16px] p-5 text-[14px] text-slate-700 font-medium leading-relaxed resize-y min-h-[100px] transition-colors"
             />
           </div>
           
           <div>
             <label className="block text-[10px] font-extrabold tracking-widest uppercase text-slate-500 mb-3">Family Medical History</label>
             <textarea 
               value={formData.familyHistory}
               onChange={(e) => handleChange('familyHistory', e.target.value)}
               className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-300 outline-none rounded-[16px] p-5 text-[14px] text-slate-700 font-medium leading-relaxed resize-y min-h-[100px] transition-colors"
             />
           </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-200/80 pt-8 px-2 gap-6">
        <div className="flex items-center gap-2.5 text-slate-500">
           {saveComplete ? <CheckCircle2 size={16} className="text-[#0E7B62]" /> : <Cloud size={16} />}
           <span className="text-[12px] font-extrabold tracking-wide">
             {saveComplete ? "All changes saved successfully" : `Last autosaved at ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
           </span>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
           <button className="flex-1 md:flex-none text-[14.5px] font-extrabold text-slate-500 hover:text-slate-800 transition-colors px-6 py-4 rounded-[16px] hover:bg-slate-100">
             Reset Changes
           </button>
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="flex-1 md:flex-none bg-[#10141D] hover:bg-[#1C2532] text-white text-[14.5px] font-extrabold px-8 py-4 rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all active:scale-95 disabled:opacity-80 flex justify-center items-center gap-2"
           >
             {isSaving ? (
               <>
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 Saving...
               </>
             ) : saveComplete ? (
                "Saved Successfully"
             ) : (
                "Save Patient Profile"
             )}
           </button>
        </div>
      </div>

    </div>
  )
}
