import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Filter, FileText, Upload,
  Calendar, User, Pill, FileImage, Download, Eye, TestTube
} from 'lucide-react';
import { medicalAPI } from '../api';
import UploadMedicalRecordModal from './ui/UploadMedicalRecordModal';
import RecordDetailModal from './ui/RecordDetailModal';

export default function MedicalReport() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const openUploadModal = () => {
    setShowUploadModal(true);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

  // Helper to get backend base URL
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
  const backendBaseUrl = apiBaseUrl.replace('/api', '');

  const handleUploadSuccess = (result) => {
    fetchReports();
  };

  const openDetailModal = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedReport(null);
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await medicalAPI.getMedicalRecords();
      console.log(data);
      setReports(data);
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDocumentIcon = (docType) => {
    return docType === 'prescription' ? <Pill size={18} /> : <FileImage size={18} />;
  };

  const getDocumentColor = (docType) => {
    return docType === 'prescription' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="max-w-[1300px] mx-auto space-y-6 lg:space-y-8 pb-8 pt-2 xl:pt-4 fadeIn">
      
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase mb-3">
             <span className="text-slate-400">MediSync</span>
             <ChevronRight size={12} className="text-slate-300" />
             <span className="text-[#0E7158]">Medical Records</span>
           </div>
           <h2 className="text-3xl lg:text-[36px] font-extrabold text-slate-800 tracking-tight mb-2.5">Patient Records</h2>
           <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg">
               <FileText size={16} className="text-teal-600" />
               <span className="text-sm font-bold">{reports.length} record{reports.length !== 1 ? 's' : ''}</span>
             </div>
           </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
           <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-[12px] font-bold text-[14px] hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
             <Filter size={16} strokeWidth={2.5} />
             Filter
           </button>
           <button 
             onClick={openUploadModal}
             className="flex items-center justify-center gap-2 bg-[#0E7B62] text-white px-5 py-2.5 rounded-[12px] font-bold text-[14px] hover:bg-[#0A5D48] transition-colors shadow-sm active:scale-95"
           >
             <FileText size={16} strokeWidth={2.5} />
             Upload New Record
           </button>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadMedicalRecordModal
        isOpen={showUploadModal}
        onClose={closeUploadModal}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Main Content Area - Records display */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E7B62] mx-auto"></div>
            <p className="text-slate-500 mt-4">Loading medical records...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No records yet</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Upload your first medical record.
            </p>
            <button 
              onClick={openUploadModal}
              className="inline-flex items-center gap-2 bg-[#0E7B62] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#0A5D48] transition-colors"
            >
              <Upload size={16} />
              Upload First Record
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div 
                key={report.id} 
                className={`rounded-[20px] border overflow-hidden transition-all duration-300 flex flex-col group cursor-pointer ${
                  report.document_type === 'prescription' 
                    ? 'bg-indigo-50/60 border-indigo-200/50 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50' 
                    : 'bg-teal-50/60 border-teal-200/50 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100/50'
                }`}
                onClick={() => openDetailModal(report)}
              >
                {/* Header Strip */}
                <div className={`p-5 pb-4 border-b ${
                  report.document_type === 'prescription' 
                    ? 'border-indigo-100/50' 
                    : 'border-teal-100/50'
                }`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm ${
                        report.document_type === 'prescription' ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'
                      }`}>
                        {getDocumentIcon(report.document_type)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-slate-800 capitalize text-[16px] truncate tracking-tight">{report.document_type}</h3>
                        <p className="text-[13px] text-slate-500 font-medium truncate max-w-[140px] tracking-tight">{report.file_name}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-black rounded-full uppercase tracking-widest shrink-0 ${
                      report.document_type === 'prescription' ? 'bg-indigo-100 text-indigo-700' : 'bg-teal-100 text-teal-700'
                    }`}>
                      {report.document_type === 'prescription' ? 'RX' : 'DIAG'}
                    </span>
                  </div>
                </div>
                
                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Date Badge */}
                  <div className={`flex items-center gap-2.5 text-[12.5px] mb-5 px-3 py-2 rounded-xl border w-max ${
                    report.document_type === 'prescription'
                      ? 'bg-white/60 text-indigo-600 border-indigo-100/50'
                      : 'bg-white/60 text-teal-600 border-teal-100/50'
                  }`}>
                    <Calendar size={14} className={report.document_type === 'prescription' ? 'text-indigo-400' : 'text-teal-400'} />
                    <span className="font-bold tracking-tight">{formatDate(report.uploaded_at)}</span>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                      {/* Prescription layout */}
                      {report.document_type === 'prescription' && report.extracted_data && (
                          <>
                            {report.extracted_data.doctor_name && (
                              <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-white/60 border border-white/80 mt-0.5">
                                  <User size={14} className={report.document_type === 'prescription' ? 'text-indigo-400' : 'text-teal-400'} />
                                </div>
                                <div>
                                  <span className="text-[10px] block font-black tracking-widest uppercase text-slate-500 mb-0.5">Prescribed By</span>
                                  <span className="text-[14.5px] font-bold text-slate-800 tracking-tight">Dr. {report.extracted_data.doctor_name}</span>
                                </div>
                              </div>
                            )}
                            {report.extracted_data.medications && report.extracted_data.medications.length > 0 && (
                              <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-white/60 border border-white/80 mt-0.5">
                                  <Pill size={14} className={report.document_type === 'prescription' ? 'text-indigo-400' : 'text-teal-400'} />
                                </div>
                                <div className="w-full">
                                  <span className="text-[10px] block font-black tracking-widest uppercase text-slate-500 mb-1.5">Medications</span>
                                  <div className="flex flex-wrap gap-1.5">
                                      {report.extracted_data.medications.slice(0, 3).map((med, idx) => (
                                         <span key={idx} className="bg-white/80 text-indigo-700 text-[12px] px-2.5 py-1 rounded-lg font-bold border border-indigo-100/50">{med.name}</span>
                                      ))}
                                      {report.extracted_data.medications.length > 3 && (
                                          <span className="bg-white/60 text-slate-600 text-[12px] px-2.5 py-1 rounded-lg font-bold border border-slate-200/50">+{report.extracted_data.medications.length - 3}</span>
                                      )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                      )}
                      
                      {/* Diagnostic layout */}
                      {report.document_type === 'diagnostic' && report.extracted_data && (
                          <>
                             {report.extracted_data.patient_name && (
                              <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-white/60 border border-white/80 mt-0.5">
                                    <User size={14} className={report.document_type === 'prescription' ? 'text-indigo-400' : 'text-teal-400'} />
                                </div>
                                <div>
                                   <span className="text-[10px] block font-black tracking-widest uppercase text-slate-500 mb-0.5">Patient Details</span>
                                   <span className="text-[14.5px] font-bold text-slate-800 tracking-tight">{report.extracted_data.patient_name}</span>
                                </div>
                              </div>
                            )}
                            {report.extracted_data.lab_results && report.extracted_data.lab_results.length > 0 && (
                              <div className="flex items-start gap-3">
                                 <div className="p-1.5 rounded-lg bg-white/60 border border-white/80 mt-0.5">
                                    <TestTube size={14} className={report.document_type === 'prescription' ? 'text-indigo-400' : 'text-teal-400'} />
                                 </div>
                                 <div className="w-full">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">Lab Results</span>
                                        <span className="text-[10px] font-bold text-teal-700 bg-white/80 border border-teal-100/50 px-2 py-0.5 rounded-md">{report.extracted_data.lab_results.length} Tests</span>
                                    </div>
                                    <div className="space-y-1.5 mt-2 bg-white/50 p-2.5 rounded-xl border border-white/80">
                                        {report.extracted_data.lab_results.slice(0, 2).map((res, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-[13px]">
                                                <span className="text-slate-600 font-medium truncate max-w-[120px]">{res.test}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-bold text-slate-800">{res.value}</span>
                                                    <span className="text-xs text-slate-500 font-medium">{res.unit}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {report.extracted_data.lab_results.length > 2 && (
                                            <div className="text-center pt-1 border-t border-teal-100/30 mt-1">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">+{report.extracted_data.lab_results.length - 2} more entries</span>
                                            </div>
                                        )}
                                    </div>
                                 </div>
                              </div>
                            )}
                          </>
                      )}
                  </div>
                  
                  {/* Action Footer */}
                  <div className={`mt-6 pt-5 border-t flex gap-3 ${
                    report.document_type === 'prescription' ? 'border-indigo-100/50' : 'border-teal-100/50'
                  }`}>
                     <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-extrabold focus:outline-none transition-all group-hover:-translate-y-0.5 shadow-sm border ${
                       report.document_type === 'prescription'
                         ? 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300'
                         : 'bg-white text-teal-700 border-teal-200 hover:bg-teal-50 hover:border-teal-300'
                     }`}>
                         <Eye size={15} strokeWidth={2.5} /> View Details
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      <RecordDetailModal
        isOpen={showDetailModal}
        onClose={closeDetailModal}
        report={selectedReport}
      />
    </div>
  )
}
