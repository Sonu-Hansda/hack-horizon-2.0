import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Activity, FlaskConical, ShieldCheck,
  User, Check, Clock, ExternalLink, FileText
} from 'lucide-react';
import { qrAPI } from '../api';
import Button from './ui/Button';

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
    <div className="max-w-[1100px] mx-auto space-y-6 lg:space-y-8 pb-12 pt-2 xl:pt-4 fadeIn relative">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl lg:text-[38px] font-extrabold text-slate-800 tracking-tight mb-3">Secure Record Sharing</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-10 items-start">
        {/* Left Column (QR UI) */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] border border-slate-100 p-8 pt-10 relative flex flex-col items-center group">

            <div className={`w-[240px] h-[240px] lg:w-[280px] lg:h-[280px] bg-slate-50 rounded-[28px] mb-8 overflow-hidden relative shadow-inner border-2 border-slate-100/50 flex items-center justify-center p-6 ${isGenerating ? 'animate-pulse' : ''}`}>
              {activeToken ? (
                <img
                  src={qrImageUrl}
                  alt="QR Code"
                  className="w-full h-full object-contain mix-multiply"
                />
              ) : (
                <div className="text-center p-4">
                  <ShieldCheck size={48} className="text-slate-200 mx-auto mb-4" />
                  <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Awaiting Generation</p>
                </div>
              )}
            </div>

            {activeToken ? (
              <div className="w-full text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-[#0E7B62]">
                  <Clock size={16} />
                  <span className="text-base font-black tabular-nums tracking-wider">{formatTime(timeLeft)}</span>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 text-[13px]"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      alert('Share link copied to clipboard!');
                    }}
                  >
                    Copy Link
                  </Button>
                  <Button
                    variant="teal"
                    className="flex-1 text-[13px]"
                    onClick={() => window.open(shareUrl, '_blank')}
                  >
                    <ExternalLink size={14} />
                    Preview
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full text-center py-2">
              </div>
            )}

            <div className="w-full pt-8 mt-2 border-t border-slate-50">
              <Button
                variant="primary"
                onClick={handleGenerate}
                loading={isGenerating}
                className="w-full h-[56px] rounded-2xl"
              >
                <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
                {activeToken ? 'Regenerate Access' : 'Generate Secure Link'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column (Controls) */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 p-8">
            <h3 className="text-[20px] font-extrabold text-slate-800 mb-8 border-b border-slate-50 pb-4">Access Configuration</h3>

            <div className="space-y-4 mb-10">
              <PermissionToggle
                title="Vital Statistics"
                desc="HR, BP, SpO2, and Respiratory rates"
                icon={Activity}
                active={permissions.vitals}
                onClick={() => togglePermission('vitals')}
              />
              <PermissionToggle
                title="Biometric Baseline"
                desc="Age, height, weight, and blood group"
                icon={User}
                active={permissions.biometrics}
                onClick={() => togglePermission('biometrics')}
              />
              <PermissionToggle
                title="Medical Records"
                desc="Uploaded clinical reports and diagnostic summaries"
                icon={FileText}
                active={permissions.records}
                onClick={() => togglePermission('records')}
              />

              {/* Conditional Report Selection */}
              {permissions.records && reports.length > 0 && (
                <div className="ml-14 mt-2 p-4 bg-slate-50 rounded-[24px] border border-slate-100 space-y-4">
                  <div className="flex bg-white p-1 rounded-xl border border-slate-100 mb-4">
                    <button
                      onClick={() => setSelectionMode('all')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${selectionMode === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500'}`}
                    >
                      Share All
                    </button>
                    <button
                      onClick={() => setSelectionMode('custom')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${selectionMode === 'custom' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500'}`}
                    >
                      Custom Select
                    </button>
                  </div>

                  {selectionMode === 'custom' && (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          onClick={() => toggleReportSelection(report.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedReportIds.includes(report.id) ? 'bg-white border-[#0E7B62] shadow-sm' : 'bg-transparent border-slate-100 grayscale'}`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selectedReportIds.includes(report.id) ? 'bg-teal-50 text-[#0E7B62]' : 'bg-slate-100 text-slate-400'}`}>
                            <FileText size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[12px] font-bold text-slate-800 truncate">{report.file_name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{report.document_type || 'Record'}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${selectedReportIds.includes(report.id) ? 'border-[#0E7B62] bg-[#0E7B62]' : 'border-slate-200 bg-white'}`}>
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

            <div>
              <h4 className="text-[11px] font-extrabold tracking-[0.15em] text-slate-400 uppercase mb-4">Expiry Duration</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[15, 30, 60, 1440].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins)}
                    className={`py-3 rounded-[16px] text-[13px] font-bold transition-all border ${duration === mins ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
                  >
                    {mins < 60 ? `${mins}m` : mins === 60 ? '1h' : '24h'}
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
      className={`p-5 rounded-[24px] border flex items-center justify-between cursor-pointer transition-all duration-300 ${active ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-50 hover:bg-slate-50 hover:border-slate-100'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-[48px] h-[48px] rounded-[18px] flex items-center justify-center transition-all ${active ? 'bg-[#E6F4F1] text-[#0E7B62]' : 'bg-slate-50 text-slate-400'}`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h4 className={`text-[14.5px] font-extrabold mb-0.5 ${active ? 'text-slate-800' : 'text-slate-400'}`}>{title}</h4>
          <p className="text-[12px] text-slate-500 font-medium">{desc}</p>
        </div>
      </div>
      <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${active ? 'border-[#0E7B62] bg-[#0E7B62]' : 'border-slate-200 bg-white'}`}>
        {active && <Check size={14} className="text-white" strokeWidth={4} />}
      </div>
    </div>
  )
}
