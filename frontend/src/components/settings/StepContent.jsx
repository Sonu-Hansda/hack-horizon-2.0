import React, { useState } from 'react';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import Input from '../ui/Input';

export const BiometricsStep = ({ formData, onChange }) => {
  const [bgOpen, setBgOpen] = useState(false);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Age" 
          value={formData.age} 
          onChange={(e) => onChange('age', e.target.value)} 
          placeholder="e.g. 34"
        />
        <div className="space-y-2">
           <label className="text-[13px] font-bold text-slate-700 tracking-wide">Sex</label>
           <div className="flex bg-slate-100 p-1 rounded-xl h-[50px]">
             {['Male', 'Female', 'Other'].map(opt => (
               <button
                 key={opt}
                 onClick={() => onChange('sex', opt)}
                 className={`flex-1 text-[12px] font-bold rounded-lg transition-all ${formData.sex === opt ? 'bg-white text-[#0E7B62] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 {opt}
               </button>
             ))}
           </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-bold text-slate-700 tracking-wide">Blood Group</label>
        <div className="relative">
          <div 
            onClick={() => setBgOpen(!bgOpen)}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3.5 cursor-pointer hover:border-teal-500/30 transition-all"
          >
            <span className="text-sm font-medium text-slate-700">{formData.bloodGroup || 'Select Blood Group'}</span>
            <ChevronDown size={18} className={`text-slate-400 transition-transform ${bgOpen ? 'rotate-180' : ''}`} />
          </div>
          {bgOpen && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 max-h-[200px] overflow-y-auto custom-scrollbar">
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <div 
                  key={bg} 
                  onClick={() => { onChange('bloodGroup', bg); setBgOpen(false); }}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0E7B62] cursor-pointer"
                >
                  {bg}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Height (cm)" value={formData.height} onChange={(e) => onChange('height', e.target.value)} placeholder="182" />
        <Input label="Weight (kg)" value={formData.weight} onChange={(e) => onChange('weight', e.target.value)} placeholder="78.5" />
      </div>
    </div>
  );
};

export const VitalsStep = ({ formData, onChange }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="grid grid-cols-2 gap-4">
      <Input label="Heart Rate (bpm)" value={formData.hr} onChange={(e) => onChange('hr', e.target.value)} placeholder="72" />
      <Input label="Blood Pressure (mmHg)" value={formData.bp} onChange={(e) => onChange('bp', e.target.value)} placeholder="120/80" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Input label="Respiratory Rate" value={formData.respRate} onChange={(e) => onChange('respRate', e.target.value)} placeholder="16" />
      <Input label="Oxygen Sat (SpO2 %)" value={formData.spo2} onChange={(e) => onChange('spo2', e.target.value)} placeholder="98" />
    </div>
  </div>
);

export const LifestyleStep = ({ formData, onChange }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
    <div>
      <div className="flex justify-between mb-3">
        <label className="text-[13px] font-bold text-slate-700 tracking-wide">Daily Steps Goal</label>
        <span className="text-sm font-bold text-[#0E7B62]">{formData.stepsValue?.toLocaleString() || 0} steps</span>
      </div>
      <input 
        type="range" min="2000" max="20000" step="500" 
        value={formData.stepsValue || 10000} 
        onChange={e => onChange('stepsValue', parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0E7B62]"
      />
    </div>

    <div>
      <label className="block text-[13px] font-bold text-slate-700 tracking-wide mb-4">Activity Level</label>
      <div className="flex flex-wrap gap-2.5">
        {['Sedentary', 'Moderate', 'Active', 'Athlete'].map(level => (
          <button
            key={level}
            onClick={() => onChange('activityLevel', level)}
            className={`px-4 py-2 rounded-xl text-[12px] font-extrabold transition-all border ${formData.activityLevel === level ? 'border-[#0E7B62] text-[#0E7B62] bg-[#F4FBFA]' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      <label className="block text-[13px] font-bold text-slate-700 tracking-wide">Water Intake Goal (Liters)</label>
      <div className="flex items-center gap-4">
        <button onClick={() => onChange('waterIntake', Math.max(0, (formData.waterIntake || 0) - 0.5))} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all"><Minus size={18} /></button>
        <div className="flex-1 bg-slate-50 py-3 rounded-xl text-center font-bold text-slate-800 border border-slate-100">{formData.waterIntake?.toFixed(1) || '0.0'} L</div>
        <button onClick={() => onChange('waterIntake', (formData.waterIntake || 0) + 0.5)} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all"><Plus size={18} /></button>
      </div>
    </div>
  </div>
);

export const HistoryStep = ({ formData, onChange }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="space-y-2">
      <label className="text-[13px] font-bold text-slate-700 tracking-wide">Primary Health Concerns</label>
      <textarea 
        value={formData.primaryConcerns}
        onChange={(e) => onChange('primaryConcerns', e.target.value)}
        placeholder="Describe any ongoing health issues..."
        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 min-h-[100px] outline-none focus:border-teal-500/30 transition-all"
      />
    </div>
    <div className="space-y-2">
      <label className="text-[13px] font-bold text-slate-700 tracking-wide">Family Medical History</label>
      <textarea 
        value={formData.familyHistory}
        onChange={(e) => onChange('familyHistory', e.target.value)}
        placeholder="List significant family medical history..."
        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 min-h-[100px] outline-none focus:border-teal-500/30 transition-all"
      />
    </div>
  </div>
);
