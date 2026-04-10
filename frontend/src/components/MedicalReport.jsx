import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Filter, FileText, Upload,
  Calendar, User, Pill, FileImage, Download, Eye
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
                className={`rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  report.document_type === 'prescription' 
                    ? 'bg-gradient-to-br from-teal-50/80 to-emerald-50/60 border border-teal-100/50' 
                    : 'bg-gradient-to-br from-blue-50/80 to-cyan-50/60 border border-blue-100/50'
                }`}
              >
                {/* Image Cover Section */}
                <div className="h-32 relative overflow-hidden">
                  {report.file_url ? (
                    // Actual image with overlay
                    <>
                      <img 
                        src={`${backendBaseUrl}${report.file_url}`}
                        alt={report.file_name || "Medical document"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If image fails to load, show fallback
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'block';
                        }}
                      />
                      <div className={`absolute inset-0 ${
                        report.document_type === 'prescription' 
                          ? 'bg-gradient-to-r from-teal-400/20 to-emerald-400/10' 
                          : 'bg-gradient-to-r from-blue-400/20 to-cyan-400/10'
                      }`} style={{ display: 'none' }}>
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            report.document_type === 'prescription' 
                              ? 'bg-teal-500 text-white' 
                              : 'bg-blue-500 text-white'
                          }`}>
                            {report.document_type === 'prescription' ? 'PRESCRIPTION' : 'DIAGNOSTIC'}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            report.document_type === 'prescription' 
                              ? 'bg-teal-100 text-teal-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {getDocumentIcon(report.document_type)}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Fallback gradient background
                    <div className={`absolute inset-0 ${
                      report.document_type === 'prescription' 
                        ? 'bg-gradient-to-r from-teal-400/20 to-emerald-400/10' 
                        : 'bg-gradient-to-r from-blue-400/20 to-cyan-400/10'
                    }`}>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          report.document_type === 'prescription' 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-blue-500 text-white'
                        }`}>
                          {report.document_type === 'prescription' ? 'PRESCRIPTION' : 'DIAGNOSTIC'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          report.document_type === 'prescription' 
                            ? 'bg-teal-100 text-teal-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {getDocumentIcon(report.document_type)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {/* Date and Time */}
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <Calendar size={14} className={
                      report.document_type === 'prescription' ? 'text-teal-500' : 'text-blue-500'
                    } />
                    <span className="font-medium text-slate-700">{formatDate(report.uploaded_at)}</span>
                  </div>

                  {/* Content based on document type */}
                  {report.extracted_data && (
                    <div className="space-y-3">
                      {/* Prescription Display */}
                      {report.document_type === 'prescription' && (
                        <>
                          {report.extracted_data.doctor_name && (
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <User size={14} className="text-teal-400" />
                                <span className="text-sm font-semibold text-slate-800">Dr. {report.extracted_data.doctor_name}</span>
                              </div>
                              {report.extracted_data.notes && (
                                <p className="text-xs text-slate-600 line-clamp-2">{report.extracted_data.notes}</p>
                              )}
                            </div>
                          )}
                          
                          {/* Medications Preview for Prescriptions */}
                          {report.extracted_data.medications && report.extracted_data.medications.length > 0 && (
                            <div className="text-xs">
                              <div className="flex items-center gap-1 mb-1">
                                <Pill size={12} className="text-teal-400" />
                                <span className="font-medium text-slate-700">Medications:</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {report.extracted_data.medications.slice(0, 3).map((med, idx) => (
                                  <span 
                                    key={idx} 
                                    className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700"
                                  >
                                    {med.name}
                                  </span>
                                ))}
                                {report.extracted_data.medications.length > 3 && (
                                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    +{report.extracted_data.medications.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Diagnostic Report Display */}
                      {report.document_type === 'diagnostic' && (
                        <>
                          {/* Patient Name */}
                          {report.extracted_data.patient_name && (
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <User size={14} className="text-blue-400" />
                                <span className="text-sm font-semibold text-slate-800">{report.extracted_data.patient_name}</span>
                              </div>
                            </div>
                          )}

                          {/* Lab Results Preview */}
                          {report.extracted_data.lab_results && report.extracted_data.lab_results.length > 0 && (
                            <div className="text-xs">
                              <div className="flex items-center gap-1 mb-2">
                                <FileImage size={12} className="text-blue-400" />
                                <span className="font-medium text-slate-700">Lab Tests: {report.extracted_data.lab_results.length} tests</span>
                              </div>
                              
                              {/* Show abnormal results first */}
                              {(() => {
                                const abnormalResults = report.extracted_data.lab_results.filter(r => r.status && r.status !== 'normal');
                                const normalResults = report.extracted_data.lab_results.filter(r => !r.status || r.status === 'normal');
                                
                                // Show up to 2 abnormal results, or if none, show 1 normal result
                                const displayResults = abnormalResults.length > 0 
                                  ? abnormalResults.slice(0, 2)
                                  : normalResults.slice(0, 1);
                                
                                const remainingCount = report.extracted_data.lab_results.length - displayResults.length;
                                
                                return (
                                  <div className="space-y-1.5">
                                    {displayResults.map((result, idx) => (
                                      <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                          <div className={`w-1.5 h-1.5 rounded-full ${
                                            result.status === 'low' ? 'bg-amber-500' :
                                            result.status === 'high' ? 'bg-red-500' :
                                            'bg-emerald-500'
                                          }`}></div>
                                          <span className="text-slate-700 truncate max-w-[100px]">{result.test}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="font-medium text-slate-800">{result.value}</span>
                                          <span className="text-slate-500">{result.unit}</span>
                                          {result.status && result.status !== 'normal' && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                                              result.status === 'low' ? 'bg-amber-100 text-amber-700' :
                                              result.status === 'high' ? 'bg-red-100 text-red-700' :
                                              'bg-emerald-100 text-emerald-700'
                                            }`}>
                                              {result.status}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                    
                                    {remainingCount > 0 && (
                                      <div className="pt-1 border-t border-slate-100">
                                        <span className="text-slate-500">+{remainingCount} more tests</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* Critical Alerts Indicator */}
                          {report.extracted_data.critical_alerts && (
                            <div className="text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="font-medium text-red-600">Critical alerts present</span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100/50">
                    <button 
                      onClick={() => openDetailModal(report)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-sm font-medium text-slate-700 hover:bg-white/50 rounded-lg transition-colors"
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-sm font-medium text-slate-700 hover:bg-white/50 rounded-lg transition-colors">
                      <Download size={14} />
                      Download
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
