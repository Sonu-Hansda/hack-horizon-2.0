import React, { useState, useEffect } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Calendar, Stethoscope } from 'lucide-react';
import { medicalAPI } from '../../api';

const UploadMedicalRecordModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('prescription');
  const [selectedVisitId, setSelectedVisitId] = useState('');
  const [visits, setVisits] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const fetchVisits = async () => {
        try {
          const data = await medicalAPI.getVisits();
          setVisits(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (err) {
          console.error("Failed to fetch visits for linking:", err);
        }
      };
      fetchVisits();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    if (!documentType) {
      setError('Please select a document type');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadResult(null);

    try {
      const result = await medicalAPI.uploadMedicalRecord(
        selectedFile, 
        documentType, 
        selectedVisitId || null
      );
      
      setUploadResult(result);
      
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
      
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.detail || 'Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setError(null);
    setDocumentType('prescription');
    setSelectedVisitId('');
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 min-h-screen w-full bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#0E7B62]">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Upload Record</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Smart Document Processing</p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>

          <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
            {/* File Upload Zone */}
            <div className="space-y-4">
              <div className="relative group">
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="file-upload" 
                  className={`flex flex-col items-center justify-center px-6 py-12 border-2 border-dashed rounded-[32px] cursor-pointer transition-all ${
                    selectedFile 
                    ? 'border-[#0E7B62] bg-teal-50/50' 
                    : 'border-slate-200 hover:border-[#0E7B62] hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    selectedFile ? 'bg-[#0E7B62] text-white' : 'bg-slate-100 text-slate-400 group-hover:scale-110'
                  }`}>
                    <Upload size={28} />
                  </div>
                  {selectedFile ? (
                    <div className="text-center">
                      <p className="text-sm font-black text-slate-800">{selectedFile.name}</p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-black text-slate-800">Choose medical image</p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Document Type & Visit Linking */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Document Class</label>
                 <select 
                   value={documentType}
                   onChange={handleDocumentTypeChange}
                   className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0E7B62]/20 focus:border-[#0E7B62] appearance-none cursor-pointer"
                 >
                    <option value="prescription">📜 Prescription</option>
                    <option value="diagnostic">🧪 Diagnostic Report</option>
                 </select>
              </div>

              <div className="space-y-3">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Link to Visit (Recommended)</label>
                 <select 
                   value={selectedVisitId}
                   onChange={(e) => setSelectedVisitId(e.target.value)}
                   className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none cursor-pointer"
                 >
                    <option value="">Standalone Record</option>
                    {visits.map(v => (
                      <option key={v.id} value={v.id}>
                        {new Date(v.date).toLocaleDateString()} - {v.diagnosis || 'Visit'}
                      </option>
                    ))}
                 </select>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                <p className="text-sm text-rose-600 font-medium">{error}</p>
              </div>
            )}

            {uploadResult && (
              <div className="p-6 bg-teal-50 border border-teal-100 rounded-[28px] space-y-3">
                <div className="flex items-center gap-3 text-[#0E7B62]">
                  <CheckCircle className="w-6 h-6" />
                  <h3 className="text-base font-black tracking-tight">Processing Successful</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 bg-white rounded-xl border border-teal-50">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Report ID</p>
                      <p className="text-sm font-black text-slate-800">#{uploadResult.report_id}</p>
                   </div>
                   <div className="p-3 bg-white rounded-xl border border-teal-50">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Type</p>
                      <p className="text-sm font-black text-slate-800 uppercase">{uploadResult.data?.document_type}</p>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-slate-50 flex gap-4">
            <button
              onClick={handleClose}
              className="flex-1 h-14 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
              className={`flex-[2] h-14 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                isUploading || !selectedFile
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-[#0E7B62] text-white hover:bg-[#0A5D48] shadow-teal-500/10'
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                'Process and Anchor'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMedicalRecordModal;