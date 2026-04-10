import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Activity, FlaskConical, ShieldCheck,
  User, Check, ChevronRight, Clock, ExternalLink, FileText
} from 'lucide-react';
import { qrAPI } from '../api';

export default function ShareQR() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeToken, setActiveToken] = useState(null);
  const [duration, setDuration] = useState(30);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [selectionMode, setSelectionMode] = useState('all'); // 'all' or 'custom'
  const [selectedReportIds, setSelectedReportIds] = useState([]);

  const [permissions, setPermissions] = useState({
    biometrics: true,
    vitals: true,
    lifestyle: false,
    history: false,
    records: true
  });

  // Fetch reports on mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoadingReports(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reports/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoadingReports(false);
      }
    };
    fetchReports();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!activeToken) return;
    const timer = setInterval(() => {
      const expiryStr = activeToken.expires_at;
      const expiry = new Date(expiryStr.endsWith('Z') ? expiryStr : expiryStr + 'Z').getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((expiry - now) / 1000));
      setTimeLeft(diff);
      if (diff === 0) setActiveToken(null);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeToken]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const allowed_sections = Object.keys(permissions).filter(k => permissions[k]).join(',');

      const result = await qrAPI.generateToken({
        access_type: selectionMode === 'all' ? 'Full' : 'Custom Selection',
        allowed_sections,
        selected_report_ids: selectionMode === 'custom' ? selectedReportIds.join(',') : null,
        expires_in_minutes: duration
      });

      setActiveToken(result);
    } catch (error) {
      console.error('Failed to generate QR:', error);
      alert('Failed to generate temporary access token.');
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleReportSelection = (id) => {
    setSelectedReportIds(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const shareUrl = activeToken
    ? `${window.location.origin}/shared/${activeToken.token}`
    : '';

  const qrImageUrl = activeToken
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`
    : '';

  return (
    <div className="max-w-[1440px] mx-auto space-y-10 lg:space-y-14 pb-16 pt-6 fadeIn relative">
      <div className="mb-4 pl-0 lg:pl-2">
        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase mb-4">
          <span className="text-slate-400">MediSync</span>
          <ChevronRight size={12} className="text-slate-300" strokeWidth={3} />
          <span className="text-[#00BFA5]">Privacy Vault</span>
        </div>
        <h2 className="text-3xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-none mb-4">
          Security Control
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-10 items-start">
        {/* Left Column (QR UI) */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-slate-100 p-8 pt-10 relative flex flex-col items-center group">

            <div className={`w-[260px] h-[260px] lg:w-[320px] lg:h-[320px] bg-slate-50 rounded-[40px] mb-8 overflow-hidden relative shadow-inner border-2 border-slate-100 flex items-center justify-center p-8 ${isGenerating ? 'animate-pulse' : ''}`}>
              {activeToken ? (
                <img
                  src={qrImageUrl}
                  alt="QR Code"
                  className="w-full h-full object-contain mix-multiply"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-slate-100/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-white">
                    <ShieldCheck size={32} className="text-slate-200" strokeWidth={1.5} />
                  </div>
                  <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">System Awaiting<br />Authentication</p>
                </div>
              )}
            </div>

            {activeToken ? (
              <div className="w-full text-center space-y-5">
                <div className="flex items-center justify-center gap-3 text-[#00BFA5] bg-emerald-50 self-center mx-auto px-5 py-2.5 rounded-2xl border border-emerald-100/50 w-max shadow-sm">
                  <Clock size={16} strokeWidth={3} />
                  <span className="text-[15px] font-black tabular-nums tracking-[0.1em]">{formatTime(timeLeft)} Remaining</span>
                </div>

                <div className="pt-2 flex gap-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      alert('Share link copied to clipboard!');
                    }}
                    className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-white border border-slate-200 rounded-[18px] text-[13px] font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                  >
                    Copy Hash
                  </button>
                  <button
                    onClick={() => window.open(shareUrl, '_blank')}
                    className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-slate-100 text-slate-800 rounded-[18px] text-[13px] font-black hover:bg-slate-200 transition-all shadow-sm active:scale-95"
                  >
                    <ExternalLink size={15} strokeWidth={2.5} />
                    View Live
                  </button>
                </div>
              </div>
            ) : null}

            <div className="w-full pt-10 mt-2 border-t border-slate-50">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-5 bg-slate-900 text-white rounded-[22px] font-black text-[15px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-3 border border-white/10"
              >
                <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} strokeWidth={3} />
                {activeToken ? 'Refresh Protocol' : 'Initialize Access'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Controls) */}
        <div className="space-y-8">
          <div className="bg-white/40 backdrop-blur-sm rounded-[32px] border border-white/80 p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <h3 className="text-[20px] font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#00BFA5] rounded-full"></div>
              Permission Nodes
            </h3>

            <div className="space-y-5 mb-12">
              <PermissionToggle
                title="Biological Metrics"
                desc="Heart rate, pressure, and clinical vitals"
                icon={Activity}
                active={permissions.vitals}
                onClick={() => togglePermission('vitals')}
              />
              <PermissionToggle
                title="Identity Baseline"
                desc="Physical attributes and encrypted profile"
                icon={User}
                active={permissions.biometrics}
                onClick={() => togglePermission('biometrics')}
              />
              <PermissionToggle
                title="Document Vault"
                desc="High-fidelity clinical reports and findings"
                icon={FileText}
                active={permissions.records}
                onClick={() => togglePermission('records')}
              />

              {/* Conditional Report Selection */}
              {permissions.records && reports.length > 0 && (
                <div className="ml-0 lg:ml-12 mt-4 p-6 bg-white/60 rounded-[32px] border border-white/80 shadow-inner space-y-5">
                  <div className="flex bg-slate-100/50 p-1.5 rounded-[18px] border border-slate-200/50 mb-4">
                    <button
                      onClick={() => setSelectionMode('all')}
                      className={`flex-1 py-2.5 rounded-[14px] text-[11px] font-black tracking-widest uppercase transition-all ${selectionMode === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
                    >
                      Sync All
                    </button>
                    <button
                      onClick={() => setSelectionMode('custom')}
                      className={`flex-1 py-2.5 rounded-[14px] text-[11px] font-black tracking-widest uppercase transition-all ${selectionMode === 'custom' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
                    >
                      Selective
                    </button>
                  </div>

                  {selectionMode === 'custom' && (
                    <div className="space-y-3 max-h-[260px] overflow-y-auto pr-3 custom-scrollbar">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          onClick={() => toggleReportSelection(report.id)}
                          className={`flex items-center gap-4 p-4 rounded-[18px] border cursor-pointer transition-all duration-300 ${activeToken ? 'opacity-50 pointer-events-none' : ''} ${selectedReportIds.includes(report.id) ? 'bg-white border-[#00BFA5] shadow-md' : 'bg-transparent border-slate-100 grayscale hover:grayscale-0'}`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${selectedReportIds.includes(report.id) ? 'bg-emerald-50 text-[#00BFA5] border-emerald-100/50' : 'bg-slate-100 text-slate-300 border-slate-200'}`}>
                            <FileText size={16} strokeWidth={2.5} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-[13px] font-black tracking-tight truncate ${selectedReportIds.includes(report.id) ? 'text-slate-900' : 'text-slate-400'}`}>{report.file_name}</p>
                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{report.document_type || 'FINDING'}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${selectedReportIds.includes(report.id) ? 'border-[#00BFA5] bg-[#00BFA5]' : 'border-slate-200 bg-white'}`}>
                            {selectedReportIds.includes(report.id) && <Check size={12} className="text-white" strokeWidth={4} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <PermissionToggle
                title="Lifestyle Metrics"
                desc="Activity levels, steps, and hydration goals"
                icon={FlaskConical}
                active={permissions.lifestyle}
                onClick={() => togglePermission('lifestyle')}
              />
              <PermissionToggle
                title="Clinical History"
                desc="Health concerns and family medical history"
                icon={ShieldCheck}
                active={permissions.history}
                onClick={() => togglePermission('history')}
              />
            </div>

            <div className="mt-8">
              <h4 className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase mb-5">Access Lifecycle</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[15, 30, 60, 1440].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins)}
                    className={`py-4 rounded-[20px] text-[13px] font-black transition-all border ${duration === mins ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                  >
                    {mins < 60 ? `${mins}M` : mins === 60 ? '1H' : '24H'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionToggle({ title, desc, icon: Icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-[32px] border flex items-center justify-between cursor-pointer transition-all duration-500 ${active ? 'bg-white border-emerald-100 shadow-lg shadow-emerald-500/5' : 'bg-white/40 border-slate-100 grayscale-[0.6] opacity-70 hover:grayscale-0 hover:opacity-100 hover:border-slate-200'}`}
    >
      <div className="flex items-center gap-5">
        <div className={`w-[56px] h-[56px] rounded-[22px] flex items-center justify-center transition-all duration-500 ${active ? 'bg-emerald-50 text-[#00BFA5] scale-105' : 'bg-slate-50 text-slate-300'}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h4 className={`text-[15px] font-black tracking-tight mb-1 ${active ? 'text-slate-900' : 'text-slate-400'}`}>{title}</h4>
          <p className="text-[12px] text-slate-500 font-medium leading-tight">{desc}</p>
        </div>
      </div>
      <div className={`w-7 h-7 rounded-xl border-2 transition-all duration-500 flex items-center justify-center ${active ? 'border-[#00BFA5] bg-[#00BFA5] rotate-[360deg]' : 'border-slate-200 bg-white'}`}>
        {active && <Check size={16} className="text-white" strokeWidth={4} />}
      </div>
    </div>
  )
}
