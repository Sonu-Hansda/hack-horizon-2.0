import React, { useState, useEffect } from 'react';
import { Cloud, CheckCircle2 } from 'lucide-react';
import SetupBanner from './settings/SetupBanner';
import SetupModal from './settings/SetupModal';
import { 
  BiometricsSection, 
  VitalsSection, 
  LifestyleSection, 
  HistorySection 
} from './settings/SettingsSections';
import Button from './ui/Button';
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
    <div className="max-w-[1000px] mx-auto space-y-8 lg:space-y-10 pb-20 pt-4 fadeIn relative">
      
      <div className="mb-8 text-left">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Clinical Data Entry</h2>
      </div>

      {!isProfileComplete && (
        <SetupBanner onStartSetup={handleStartSetup} />
      )}

      <div className="space-y-8 lg:space-y-10">
        <BiometricsSection formData={formData} onChange={handleChange} />
        <VitalsSection formData={formData} onChange={handleChange} />
        <LifestyleSection formData={formData} onChange={handleChange} />
        <HistorySection formData={formData} onChange={handleChange} />
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-200/80 pt-10 px-2 gap-8">
        <div className="flex items-center gap-3 text-slate-500">
          {saveComplete ? <CheckCircle2 size={18} className="text-[#0E7B62]" /> : <Cloud size={18} />}
          <span className="text-sm font-bold tracking-wide">
            {saveComplete ? "Profile synchronized successfully" : "Changes are saved to your global patient record"}
          </span>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="secondary" className="flex-1 md:flex-none" onClick={fetchProfile}>
            Reset Changes
          </Button>
          <Button 
            variant="teal" 
            onClick={handleSave}
            loading={isSaving}
            className="flex-1 md:flex-none min-w-[200px]"
          >
            {saveComplete ? "Saved Successfully" : "Save Patient Profile"}
          </Button>
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
