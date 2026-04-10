import React, { useState, useEffect } from 'react';
import { Cloud, CheckCircle2, ChevronRight } from 'lucide-react';
import SetupModal from './settings/SetupModal';
import {
  BiometricsSection,
  VitalsSection,
  LifestyleSection,
  HistorySection
} from './settings/SettingsSections';
import patientAPI from '../api/patient';

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveComplete, setSaveComplete] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    age: '',
    sex: 'Male',
    bloodGroup: '',
    height: '',
    weight: '',
    hr: '',
    bp: '',
    respRate: '',
    spo2: '',
    stepsValue: 10000,
    sleepValue: 8.0,
    activityLevel: 'Moderate',
    waterIntake: 2.5,
    primaryConcerns: '',
    familyHistory: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await patientAPI.getProfile();
      if (profile) {
        setFormData({
          age: profile.age?.toString() || '',
          sex: profile.sex || 'Male',
          bloodGroup: profile.blood_group || '',
          height: profile.height?.toString() || '',
          weight: profile.weight?.toString() || '',
          hr: profile.hr?.toString() || '',
          bp: profile.bp || '',
          respRate: profile.resp_rate?.toString() || '',
          spo2: profile.spo2?.toString() || '',
          stepsValue: profile.steps_goal || 10000,
          sleepValue: profile.sleep_goal || 8.0,
          activityLevel: profile.activity_level || 'Moderate',
          waterIntake: profile.water_intake_goal || 2.5,
          primaryConcerns: profile.primary_concerns || '',
          familyHistory: profile.family_history || ''
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isProfileComplete =
    formData.age !== '' &&
    formData.bloodGroup !== '' &&
    formData.height !== '' &&
    formData.weight !== '';

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveComplete(false);

      const payload = {
        age: formData.age ? parseInt(formData.age) : null,
        sex: formData.sex,
        blood_group: formData.bloodGroup,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        hr: formData.hr ? parseInt(formData.hr) : null,
        bp: formData.bp,
        resp_rate: formData.respRate ? parseInt(formData.respRate) : null,
        spo2: formData.spo2 ? parseInt(formData.spo2) : null,
        steps_goal: formData.stepsValue,
        sleep_goal: formData.sleepValue,
        activity_level: formData.activityLevel,
        water_intake_goal: formData.waterIntake,
        primary_concerns: formData.primaryConcerns,
        family_history: formData.familyHistory
      };

      await patientAPI.updateProfile(payload);

      setSaveComplete(true);
      setTimeout(() => setSaveComplete(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartSetup = () => {
    setIsSetupModalOpen(true);
  };

  const handleFinishSetup = () => {
    setIsSetupModalOpen(false);
    handleSave();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E7B62]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto space-y-12 lg:space-y-16 pb-24 pt-6 fadeIn relative">

      <div className="mb-4 pl-0 lg:pl-2">
        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase mb-4">
          <span className="text-slate-400">MediSync</span>
          <ChevronRight size={12} className="text-slate-300" strokeWidth={3} />
          <span className="text-[#00BFA5]">Patient Profile</span>
        </div>
        <h2 className="text-3xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-none mb-4">
          Clinical Data Vault
        </h2>
      </div>

      {!isProfileComplete && (
        <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 lg:p-10 shadow-2xl shadow-slate-900/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl lg:text-2xl font-black text-white mb-2 tracking-tight">Complete Your Clinical Profile</h3>
              <p className="text-slate-400 font-medium text-[15px]">Provide essential biometrics to enable precision health monitoring.</p>
            </div>
            <button
              onClick={handleStartSetup}
              className="px-10 py-5 bg-[#00BFA5] text-slate-900 rounded-2xl font-black text-[14px] uppercase tracking-widest hover:scale-[1.05] transition-all active:scale-95 shadow-xl shadow-[#00BFA5]/20"
            >
              Initialize Setup
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>
      )}

      <div className="space-y-8 lg:space-y-10">
        <BiometricsSection formData={formData} onChange={handleChange} />
        <VitalsSection formData={formData} onChange={handleChange} />
        <LifestyleSection formData={formData} onChange={handleChange} />
        <HistorySection formData={formData} onChange={handleChange} />
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center justify-between bg-slate-50/50 rounded-[40px] p-8 lg:p-10 border border-slate-100 gap-10">
        <div className="flex items-center gap-4 text-slate-500">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${saveComplete ? 'bg-emerald-50 text-[#00BFA5] border-emerald-100' : 'bg-white text-slate-300 border-slate-100 shadow-sm'}`}>
            {saveComplete ? <CheckCircle2 size={24} strokeWidth={2.5} /> : <Cloud size={24} strokeWidth={2} />}
          </div>
          <div>
            <p className={`text-[15px] font-black tracking-tight ${saveComplete ? 'text-slate-900' : 'text-slate-500'}`}>
              {saveComplete ? "Sync Complete" : "Cloud Synchronization"}
            </p>
            <p className="text-[12px] font-medium text-slate-400">
              {saveComplete ? "All parameters verified and encrypted." : "Changes are securely saved to your patient record."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={fetchProfile}
            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-12 py-5 rounded-[22px] font-black text-[14px] uppercase tracking-widest transition-all shadow-xl active:scale-[0.98] min-w-[240px] ${saveComplete ? 'bg-[#00BFA5] text-slate-900 shadow-[#00BFA5]/20' : 'bg-slate-900 text-white shadow-slate-900/30'}`}
          >
            {isSaving ? "Saving..." : saveComplete ? "Verification Done" : "Save Clinical Record"}
          </button>
        </div>
      </div>

      <SetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSave={handleFinishSetup}
      />

    </div>
  );
}
