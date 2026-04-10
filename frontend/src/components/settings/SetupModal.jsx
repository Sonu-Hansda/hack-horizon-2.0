import React, { useState } from 'react';
import { X, Check, ChevronRight, ChevronLeft, User, Activity, Footprints, FileText } from 'lucide-react';
import Button from '../ui/Button';
import { BiometricsStep, VitalsStep, LifestyleStep, HistoryStep } from './StepContent';

const SetupModal = ({ isOpen, onClose, formData, onChange, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSave();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { title: 'Core Biometrics', icon: User, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Physiological Vitals', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50' },
    { title: 'Lifestyle Goals', icon: Footprints, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Clinical History', icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const StepIcon = steps[currentStep - 1].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-[640px] rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${steps[currentStep-1].bg} ${steps[currentStep-1].color} flex items-center justify-center shadow-sm`}>
              <StepIcon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Step {currentStep} of {totalSteps}</p>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{steps[currentStep - 1].title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-8 mb-8">
          <div className="h-1.5 w-full bg-slate-100 rounded-full flex gap-1.5 p-0.5">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`h-full flex-1 rounded-full transition-all duration-500 ${step <= currentStep ? 'bg-[#0E7B62]' : 'bg-slate-200'}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {currentStep === 1 && <BiometricsStep formData={formData} onChange={onChange} />}
          {currentStep === 2 && <VitalsStep formData={formData} onChange={onChange} />}
          {currentStep === 3 && <LifestyleStep formData={formData} onChange={onChange} />}
          {currentStep === 4 && <HistoryStep formData={formData} onChange={onChange} />}
        </div>

        {/* Footer */}
        <div className="p-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'opacity-0' : ''}
          >
            <ChevronLeft size={18} />
            Back
          </Button>
          
          <Button 
            variant="teal" 
            onClick={handleNext}
            className="min-w-[140px]"
          >
            {currentStep === totalSteps ? 'Finish Setup' : 'Continue'}
            {currentStep === totalSteps ? <Check size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupModal;
