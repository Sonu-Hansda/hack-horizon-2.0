import React, { useState } from 'react';
import { User, Activity, Footprints, FileText, ChevronDown, Minus, Plus } from 'lucide-react';
import Input from '../ui/Input';
import Card from '../ui/Card';

export const BiometricsSection = ({ formData, onChange }) => {
  const [bgOpen, setBgOpen] = useState(false);
  
  return (
    <Card className="hover:border-slate-300 transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-100">
          <User size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Core Biometrics</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Physical Baseline</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        <Input label="Age" value={formData.age} onChange={(e) => onChange('age', e.target.value)} />
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700 tracking-wide">Sex Assigned at Birth</label>
          <div className="flex bg-slate-50 p-1.5 rounded-[16px] h-[60px] border border-slate-100">
            {['Male', 'Female', 'Intersex', 'Other'].map(opt => (
              <button
                key={opt}
                onClick={() => onChange('sex', opt)}
                className={`flex-1 text-[12px] font-bold rounded-[12px] transition-all duration-300 ${formData.sex === opt ? 'bg-white text-[#0E7B62] shadow-md border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/30'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700 tracking-wide">Blood Group</label>
          <div className="relative">
            <div 
              onClick={() => setBgOpen(!bgOpen)}
              className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 cursor-pointer hover:border-teal-500/30 transition-all"
            >
              <span className="text-sm font-bold text-slate-700">{formData.bloodGroup}</span>
              <ChevronDown size={18} className={`text-slate-400 transition-transform ${bgOpen ? 'rotate-180' : ''}`} />
            </div>
            {bgOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 py-2 max-h-[220px] overflow-y-auto custom-scrollbar">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <div key={bg} onClick={() => { onChange('bloodGroup', bg); setBgOpen(false); }} className="px-5 py-3 text-sm font-bold text-slate-600 hover:bg-teal-50 hover:text-[#0E7B62] cursor-pointer">{bg}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Input label="Height (cm)" value={formData.height} onChange={(e) => onChange('height', e.target.value)} />
        <Input label="Weight (kg)" value={formData.weight} onChange={(e) => onChange('weight', e.target.value)} />
      </div>
    </Card>
  );
};

export const VitalsSection = ({ formData, onChange }) => (
  <Card className="hover:border-slate-300 transition-all duration-300">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 shadow-sm border border-teal-100">
        <Activity size={22} strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Vitals & Physiological Baseline</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Clinical Markers</p>
      </div>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <Input label="Heart Rate (bpm)" value={formData.hr} onChange={(e) => onChange('hr', e.target.value)} />
      <Input label="Blood Pressure (mmHg)" value={formData.bp} onChange={(e) => onChange('bp', e.target.value)} />
      <Input label="Respiratory Rate" value={formData.respRate} onChange={(e) => onChange('respRate', e.target.value)} />
      <Input label="Oxygen Sat (SpO2 %)" value={formData.spo2} onChange={(e) => onChange('spo2', e.target.value)} />
    </div>
  </Card>
);

export const LifestyleSection = ({ formData, onChange }) => (
  <Card className="hover:border-slate-300 transition-all duration-300">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
        <Footprints size={22} strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Lifestyle & Health Goals</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Behavioral Metrics</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-10">
      <div>
        <div className="flex justify-between items-end mb-4">
          <label className="text-[13px] font-bold text-slate-700 tracking-wide">Daily Steps Goal</label>
          <div className="text-sm font-black text-[#0E7B62]">{formData.stepsValue.toLocaleString()} steps</div>
        </div>
        <input 
          type="range" min="2000" max="20000" step="500" 
          value={formData.stepsValue} 
          onChange={e => onChange('stepsValue', parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0E7B62]"
        />
      </div>
      <div>
        <div className="flex justify-between items-end mb-4">
          <label className="text-[13px] font-bold text-slate-700 tracking-wide">Sleep Goal</label>
          <div className="text-sm font-black text-[#0E7B62]">{formData.sleepValue.toFixed(1)} hrs</div>
        </div>
        <input 
          type="range" min="4" max="12" step="0.5" 
          value={formData.sleepValue} 
          onChange={e => onChange('sleepValue', parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0E7B62]"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
      <div>
        <label className="block text-[13px] font-bold text-slate-700 tracking-wide mb-4">Activity Level</label>
        <div className="flex flex-wrap gap-2.5">
          {['Sedentary', 'Moderate', 'Active', 'Athlete'].map(level => (
            <button
              key={level}
              onClick={() => onChange('activityLevel', level)}
              className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all border ${formData.activityLevel === level ? 'border-[#0E7B62] text-[#0E7B62] bg-[#F4FBFA] shadow-sm' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end mb-1">
          <label className="text-[13px] font-bold text-slate-700 tracking-wide">Water Intake</label>
          <span className="text-sm font-black text-[#0E7B62]">{formData.waterIntake.toFixed(1)} L</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onChange('waterIntake', Math.max(0, formData.waterIntake - 0.5))} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all shadow-sm"><Minus size={18} /></button>
          <div className="flex-1 bg-slate-50 py-3 rounded-xl text-center font-bold text-slate-800 border border-slate-100">{formData.waterIntake.toFixed(1)} Liters</div>
          <button onClick={() => onChange('waterIntake', formData.waterIntake + 0.5)} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all shadow-sm"><Plus size={18} /></button>
        </div>
      </div>
    </div>
  </Card>
);

export const HistorySection = ({ formData, onChange }) => (
  <Card className="hover:border-slate-300 transition-all duration-300">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 shadow-sm border border-red-100">
        <FileText size={22} strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Clinical History Summary</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Patient Record</p>
      </div>
    </div>

    <div className="space-y-8">
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-slate-700 tracking-wide">Primary Health Concerns & Observations</label>
        <textarea 
          value={formData.primaryConcerns}
          onChange={(e) => onChange('primaryConcerns', e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 focus:border-[#0E7B62]/30 focus:bg-white transition-all outline-none rounded-2xl p-5 text-sm text-slate-700 font-medium leading-relaxed min-h-[120px] resize-none"
          placeholder="Enter primary health observations..."
        />
      </div>
      <div className="space-y-3">
        <label className="block text-[13px] font-bold text-slate-700 tracking-wide">Family Medical History</label>
        <textarea 
          value={formData.familyHistory}
          onChange={(e) => onChange('familyHistory', e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 focus:border-[#0E7B62]/30 focus:bg-white transition-all outline-none rounded-2xl p-5 text-sm text-slate-700 font-medium leading-relaxed min-h-[120px] resize-none"
          placeholder="Summarize family medical history..."
        />
      </div>
    </div>
  </Card>
);
