import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Activity, ShieldCheck, Clock, User,
  FileText, FlaskConical, Calendar, ArrowLeft,
  Heart, Thermometer, Droplets, Wind, Scale,
  Dna, Stethoscope, ClipboardList, X, Download, Maximize2,
  Building, MapPin, UserPlus, CheckCircle2, ArrowRight, Layers
} from 'lucide-react';
import { qrAPI } from '../api';

export default function SharedRecordPage() {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showEncounterModal, setShowEncounterModal] = useState(false);

  // Helper to get backend base URL
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  const backendBaseUrl = apiBaseUrl.replace('/api', '');

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await qrAPI.getSharedRecord(token);
      setData(result);

      // Calculate initial time left
      const expiryStr = result.expires_at;
      const expiry = new Date(expiryStr.endsWith('Z') ? expiryStr : expiryStr + 'Z').getTime();
      const now = new Date().getTime();
      setTimeLeft(Math.max(0, Math.floor((expiry - now) / 1000)));
    } catch (err) {
      console.error('Error fetching shared record:', err);
      setError(err.detail || 'Access expired or invalid token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Timer logic
  useEffect(() => {
    if (!timeLeft) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (!data) return null;

  const { full_name, profile, visits, unlinked_reports, allowed_sections } = data;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Clinical Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-900/10">
              <Stethoscope size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Provider Portal</p>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{full_name}</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <button 
               onClick={() => setShowEncounterModal(true)}
               className="flex items-center gap-2 px-6 py-3 bg-[#0E7B62] text-white rounded-xl font-black text-[13px] uppercase tracking-wider hover:bg-[#0A5D48] transition-all shadow-lg shadow-teal-500/10 active:scale-95"
             >
               <UserPlus size={16} strokeWidth={3} />
               Start Encounter
             </button>
             <div className="w-px h-8 bg-slate-100 mx-2" />
             <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-full border border-rose-100 mb-1">
                   <Clock size={12} className="text-rose-600" />
                   <span className="text-[11px] font-black text-rose-600 tabular-nums uppercase tracking-widest">
                     Expires in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                   </span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Encrypted Session</p>
             </div>
          </div>

          <div className="md:hidden">
             <button 
               onClick={() => setShowEncounterModal(true)}
               className="p-3 bg-[#0E7B62] text-white rounded-xl active:scale-90"
             >
               <UserPlus size={20} />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Profile Grid */}
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DataSection title="Patient Vitals" icon={Activity} active={allowed_sections.includes('vitals')}>
               <div className="grid grid-cols-2 gap-4">
                 <Metric label="Heart Rate" value={profile.hr} unit="BPM" icon={Heart} color="rose" />
                 <Metric label="Blood Pressure" value={profile.bp} unit="" icon={Thermometer} color="indigo" />
                 <Metric label="SpO2" value={profile.spo2} unit="%" icon={Droplets} color="teal" />
                 <Metric label="Resp. Rate" value={profile.resp_rate} unit="RPM" icon={Wind} color="slate" />
               </div>
            </DataSection>

            <DataSection title="Baseline Metrics" icon={User} active={allowed_sections.includes('biometrics')}>
               <div className="grid grid-cols-2 gap-4">
                 <Metric label="Age" value={profile.age} unit="Yrs" color="slate" />
                 <Metric label="Sex" value={profile.sex} unit="" color="slate" />
                 <Metric label="Blood Group" value={profile.blood_group} unit="" icon={Dna} color="rose" />
                 <Metric label="Weight/Height" value={`${profile.weight}kg / ${profile.height}cm`} unit="" icon={Scale} color="slate" />
               </div>
            </DataSection>
          </div>
        )}

        {/* Clinical History Card */}
        {profile && allowed_sections.includes('history') && (profile.primary_concerns || profile.family_history) && (
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <ClipboardList size={16} className="text-[#0E7B62]" /> Baseline History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {profile.primary_concerns && (
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Concerns</p>
                   <p className="text-sm text-slate-700 font-medium leading-relaxed">{profile.primary_concerns}</p>
                 </div>
               )}
               {profile.family_history && (
                 <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Family History</p>
                   <p className="text-sm text-slate-700 font-medium leading-relaxed">{profile.family_history}</p>
                 </div>
               )}
            </div>
          </div>
        )}

        {/* Records Section (Rewritten as Timeline) */}
        {allowed_sections.includes('records') && (
          <div className="space-y-12">
            <div className="flex items-center gap-3 px-2">
              <Calendar className="text-[#0E7B62]" size={22} />
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Clinical Journey</h3>
            </div>

            {/* Visits Timeline */}
            {visits && visits.length > 0 ? (
               <div className="space-y-6 relative ml-4 pl-8 border-l-[3px] border-slate-100">
                  {visits.map((visit, idx) => (
                    <div key={idx} className="relative mb-12 last:mb-0">
                       {/* Timeline Marker */}
                       <div className="absolute -left-[43px] top-6 w-5 h-5 bg-white border-[4px] border-[#0E7B62] rounded-full shadow-sm z-10"></div>
                       
                       <VisitNode 
                         visit={visit} 
                         onSelectReport={setSelectedDoc} 
                         backendBaseUrl={backendBaseUrl}
                       />
                    </div>
                  ))}
               </div>
            ) : (
                <div className="ml-4 pl-8 border-l-[3px] border-slate-100 italic text-slate-400 text-sm">
                   No clinical encounters recorded yet.
                </div>
            )}

            {/* Standalone Reports */}
            {unlinked_reports && unlinked_reports.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <Layers className="text-indigo-600" size={22} />
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Unassigned Findings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4 pl-8">
                  {unlinked_reports.map((report, idx) => (
                    <StandaloneReport 
                      key={idx} 
                      report={report} 
                      onClick={() => setSelectedDoc(report)}
                      backendBaseUrl={backendBaseUrl}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Footer */}
        <div className="pt-10 flex flex-col items-center gap-4 border-t border-slate-100">
          <div className="flex items-center gap-3 text-slate-300">
             <ShieldCheck size={20} />
             <span className="text-[11px] font-black tracking-[0.2em] uppercase">HIPAA Compliant Sharing Platform</span>
          </div>
           <p className="text-[10px] text-slate-400 font-bold max-w-xs text-center leading-relaxed">
             This portal is a private, encrypted view of the patient's record. All logs are signed and audited.
           </p>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <DocumentModal 
          doc={selectedDoc} 
          onClose={() => setSelectedDoc(null)} 
          backendBaseUrl={backendBaseUrl}
        />
      )}

      {/* Initiation Modal */}
      {showEncounterModal && (
        <InitiateEncounterModal 
          token={token}
          onClose={() => setShowEncounterModal(false)}
          onSuccess={() => {
            setShowEncounterModal(false);
            fetchData(); // Refresh timeline
          }}
        />
      )}
    </div>
  );
}

function InitiateEncounterModal({ token, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    doctor_name: '',
    hospital_name: '',
    examine_area: '',
    location: '',
    diagnosis: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await qrAPI.createPublicVisit(token, formData);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      alert(err.detail || "Failed to initiate encounter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
       
       <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-scaleUp">
          {success ? (
            <div className="p-12 text-center">
               <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0E7B62]">
                  <CheckCircle2 size={48} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Encounter Registered</h3>
               <p className="text-slate-500 font-medium">The check-in has been successfully logged to the patient's history.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Initiate Encounter</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Provider Intake Form</p>
                 </div>
                 <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                    <X size={20} />
                 </button>
              </div>

              <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Physician Name" icon={User} name="doctor_name" value={formData.doctor_name} onChange={e => setFormData({...formData, doctor_name: e.target.value})} placeholder="Dr. Smith" required />
                    <InputGroup label="Specialty/Area" icon={Stethoscope} name="examine_area" value={formData.examine_area} onChange={e => setFormData({...formData, examine_area: e.target.value})} placeholder="Internal Medicine" required />
                 </div>
                 
                 <InputGroup label="Facility/Hospital" icon={Building} name="hospital_name" value={formData.hospital_name} onChange={e => setFormData({...formData, hospital_name: e.target.value})} placeholder="City General Hospital" required />
                 <InputGroup label="Location/Branch" icon={MapPin} name="location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Main Wing, 2nd Floor" />

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Observation / Diagnosis</label>
                    <textarea 
                      className="w-full h-24 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0E7B62]/20 focus:border-[#0E7B62]"
                      placeholder="Symptoms or initial assessment..."
                      value={formData.diagnosis}
                      onChange={e => setFormData({...formData, diagnosis: e.target.value})}
                    />
                 </div>
              </div>

              <div className="p-8 bg-slate-50 flex gap-3">
                 <button type="button" onClick={onClose} className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[13px] uppercase tracking-wider hover:bg-slate-100 transition-all">
                    Cancel
                 </button>
                 <button type="submit" disabled={loading} className="flex-2 px-10 py-4 bg-[#0E7B62] text-white rounded-2xl font-black text-[13px] uppercase tracking-wider hover:bg-[#0A5D48] transition-all disabled:opacity-50">
                    {loading ? "Registering..." : "Log Encounter"}
                 </button>
              </div>
            </form>
          )}
       </div>
    </div>
  );
}

function InputGroup({ label, icon: Icon, ...props }) {
  return (
    <div className="space-y-2">
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
       <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
             <Icon size={18} />
          </div>
          <input 
            className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0E7B62]/20 focus:border-[#0E7B62]"
            {...props}
          />
       </div>
    </div>
  );
}

function DocumentModal({ doc, onClose, backendBaseUrl }) {
  const finalUrl = doc.file_url ? `${backendBaseUrl}${doc.file_url}` : '';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-fadeIn">
       <div 
         className="absolute inset-0 bg-slate-900/95 backdrop-blur-md"
         onClick={onClose}
       ></div>
       
       <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-scaleUp">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-5 min-w-0">
               <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <FileText size={24} />
               </div>
               <div className="min-w-0">
                  <h4 className="text-base font-black text-slate-800 tracking-tight truncate">{doc.file_name}</h4>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">{doc.document_type || 'Diagnostic Report'}</p>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
               <a 
                 href={finalUrl} 
                 download 
                 className="p-4 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all"
               >
                 <Download size={24} />
               </a>
               <button 
                 onClick={onClose}
                 className="p-4 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
               >
                 <X size={24} />
               </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 bg-slate-100/50 overflow-auto p-6 md:p-12 flex items-center justify-center">
             <img 
               src={finalUrl} 
               alt={doc.file_name}
               className="max-w-full h-auto shadow-2xl rounded-3xl border-[6px] border-white"
               onError={(e) => {
                 e.target.style.display = 'none';
                 e.target.nextSibling.style.display = 'block';
               }}
             />
             <div className="hidden text-center p-20">
                <ShieldCheck size={64} className="text-slate-200 mx-auto mb-6" />
                <p className="text-lg font-black text-slate-400 uppercase tracking-widest">Document preview not available</p>
                <p className="text-sm text-slate-300 mt-3 font-medium">This document is protected. Try downloading the file to view it offline.</p>
             </div>
          </div>

          <div className="px-8 py-5 bg-white border-t border-slate-50 flex items-center justify-between">
             <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">End-to-End Encrypted Viewer</p>
             <div className="flex items-center gap-2 text-[#0E7B62]">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Handshake Verified</span>
             </div>
          </div>
       </div>
    </div>
  );
}

function Metric({ label, value, unit, icon: Icon, color = "slate" }) {
  if (!value) return null;
  const colors = {
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    teal: "bg-teal-50 text-teal-600 border-teal-100",
    slate: "bg-slate-50 text-slate-600 border-slate-100"
  };
  
  return (
    <div className={`p-4 rounded-2xl border ${colors[color]} flex flex-col gap-2`}>
      <div className="flex items-center justify-between opacity-70">
        <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
        {Icon && <Icon size={14} />}
      </div>
      <p className="text-lg font-black tracking-tight">{value} <span className="text-xs opacity-60">{unit}</span></p>
    </div>
  );
}

function DataSection({ title, icon: Icon, active, children }) {
  if (!active) return null;
  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#0E7B62] transition-colors">
          <Icon size={20} />
        </div>
        <h3 className="font-extrabold text-slate-900 tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function VisitNode({ visit, onSelectReport, backendBaseUrl }) {
  const dateStr = new Date(visit.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div 
      className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-50 rounded-xl text-[#0E7B62] flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">{visit.diagnosis || 'Clinical Encounter'}</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{dateStr}</p>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end">
           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Medical ID</span>
           <span className="text-xs font-black text-slate-400 tracking-tight">#{visit.id?.toString().padStart(4, '0')}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
         {visit.doctor_name && (
           <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Physician</p>
              <p className="text-xs font-bold text-slate-700 truncate">{visit.doctor_name}</p>
           </div>
         )}
         {visit.hospital_name && (
           <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Facility</p>
              <p className="text-xs font-bold text-slate-700 truncate">{visit.hospital_name}</p>
           </div>
         )}
         {visit.examine_area && (
           <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
              <p className="text-[9px] font-black text-indigo-400 uppercase mb-1">Specialty</p>
              <p className="text-xs font-black text-indigo-600 truncate">{visit.examine_area}</p>
           </div>
         )}
      </div>
      
      {visit.notes && (
        <div className="mb-8 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 italic">
           <p className="text-sm text-slate-600 font-medium leading-relaxed">"{visit.notes}"</p>
        </div>
      )}

      {(visit.reports?.length > 0 || visit.prescriptions?.length > 0) && (
        <div className="pt-6 border-t border-slate-100">
           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Attached Documents</h5>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visit.reports?.map((r, i) => (
                <div 
                  key={i} 
                  onClick={() => onSelectReport(r)}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-[#0E7B62] transition-all cursor-pointer group/doc"
                >
                   <div className="w-12 h-12 rounded-xl bg-indigo-50 overflow-hidden flex items-center justify-center text-indigo-600 shrink-0 border border-slate-100 group-hover/doc:scale-105 transition-transform">
                     {r.file_url && (r.file_type?.includes('image') || r.file_name?.match(/\.(jpg|jpeg|png|gif)$/i)) ? (
                       <img src={`${backendBaseUrl}${r.file_url}`} alt="" className="w-full h-full object-cover" />
                     ) : (
                       <FlaskConical size={22} />
                     )}
                   </div>
                   <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-800 truncate">{r.file_name}</p>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{r.document_type || 'Lab Result'}</p>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover/doc:text-[#0E7B62] transition-colors">
                      <Maximize2 size={16} />
                   </div>
                </div>
              ))}
              
              {visit.prescriptions?.map((p, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#0E7B62] shrink-0">
                       <PillBottle size={24} />
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-800 tracking-tight">{p.medicine_name}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">{p.dosage} • {p.frequency}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}

function StandaloneReport({ report, onClick, backendBaseUrl }) {
  const dateStr = new Date(report.uploaded_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-5 group cursor-pointer"
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 overflow-hidden flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform border border-slate-100">
        {report.file_url && (report.file_type?.includes('image') || report.file_name?.match(/\.(jpg|jpeg|png|gif)$/i)) ? (
          <img src={`${backendBaseUrl}${report.file_url}`} alt="" className="w-full h-full object-cover" />
        ) : (
          <FileText size={24} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-base font-black text-slate-800 tracking-tight truncate mb-0.5">{report.file_name}</h4>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{report.document_type || 'Record'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dateStr}</span>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[#0E7B62] group-hover:bg-teal-50 transition-all">
        <Maximize2 size={18} />
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-[40px] flex items-center justify-center mx-auto mb-8 animate-pulse">
           <ShieldCheck size={48} className="text-slate-300" />
        </div>
        <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Synchronizing Provider Portal</p>
      </div>
    </div>
  );
}

function ErrorScreen({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-rose-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 text-rose-500 shadow-xl shadow-rose-500/10">
           <ShieldCheck size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Connection Interrupted</h2>
        <p className="text-slate-500 font-medium leading-relaxed mb-10">{error}</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full h-[60px] bg-slate-900 text-white rounded-3xl font-black text-[15px] transition-all hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-95"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

function PillBottle(props) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
      <path d="M10 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
      <path d="M7 11h10v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8Z" />
      <path d="M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
