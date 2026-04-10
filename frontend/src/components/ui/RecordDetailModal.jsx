import React from 'react';
import { X, Calendar, User, Pill, FileText, TestTube, FileImage, AlertTriangle } from 'lucide-react';

const RecordDetailModal = ({ isOpen, onClose, report, summary}) => {
  if (!isOpen || !report) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isPrescription = report.document_type === 'prescription';
  const extractedData = report.extracted_data || {};

  return (
    <>
      <div 
        className="fixed inset-0 min-h-screen w-full bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl max-w-6xl w-full shadow-xl border border-slate-200/80 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isPrescription ? 'bg-teal-100 text-teal-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {isPrescription ? <Pill size={20} /> : <FileImage size={20} />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 capitalize">{report.document_type} Details</h3>
                <p className="text-sm text-slate-500">{report.file_name}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image Preview */}
            <div className="lg:w-3/5 p-6 border-r border-slate-100">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Document Preview</h4>
                <div className={`h-64 rounded-xl overflow-hidden border ${
                  isPrescription 
                    ? 'border-teal-100' 
                    : 'border-blue-100'
                }`}>
                  {report.file_url ? (
                    <img 
                      src={`http://localhost:8000${report.file_url}`}
                      alt={report.file_name || "Medical document"}
                      className="w-full h-full object-contain bg-white"
                      onError={(e) => {
                        // If image fails to load, show fallback
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.image-fallback');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback when no image or image fails to load */}
                  <div className={`image-fallback w-full h-full flex items-center justify-center ${
                    isPrescription 
                      ? 'bg-gradient-to-br from-teal-50 to-emerald-50' 
                      : 'bg-gradient-to-br from-blue-50 to-cyan-50'
                  }`} style={{ display: report.file_url ? 'none' : 'flex' }}>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        isPrescription ? 'bg-teal-100 text-teal-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {isPrescription ? <FileImage size={28} /> : <TestTube size={28} />}
                      </div>
                      <p className="text-slate-600 font-medium">{report.file_name}</p>
                      <p className="text-sm text-slate-500 mt-1">Medical Document</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  {report.file_url ? "PNG document image" : "No document image available"}
                </p>
              </div>

              {/* Additional Image Info */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Document Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">Type:</span>
                    <span className={`ml-2 font-medium ${
                      isPrescription ? 'text-teal-600' : 'text-blue-600'
                    }`}>
                      {report.document_type}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Uploaded:</span>
                    <span className="ml-2 font-medium text-slate-700">{formatDate(report.uploaded_at)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">File:</span>
                    <span className="ml-2 font-medium text-slate-700 truncate">{report.file_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Status:</span>
                    <span className="ml-2 font-medium text-emerald-600">Processed</span>
                  </div>
                </div>
              </div>

              {/* Lab Results */}
                  {extractedData.lab_results && extractedData.lab_results.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-slate-600">
                          <TestTube size={16} className="text-blue-500" />
                          <span className="font-medium">Lab Results ({extractedData.lab_results.length} tests)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-slate-500">Normal</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span className="text-xs text-slate-500">Low</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-xs text-slate-500">High</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="text-left py-2 px-3 font-medium text-slate-600">Test</th>
                              <th className="text-left py-2 px-3 font-medium text-slate-600">Value</th>
                              <th className="text-left py-2 px-3 font-medium text-slate-600">Unit</th>
                              {/* <th className="text-left py-2 px-3 font-medium text-slate-600">Reference Range</th> */}
                              <th className="text-left py-2 px-3 font-medium text-slate-600">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {extractedData.lab_results.map((result, idx) => (
                              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-2 px-3">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                      result.status === 'low' ? 'bg-amber-500' :
                                      result.status === 'high' ? 'bg-red-500' :
                                      'bg-emerald-500'
                                    }`}></div>
                                    <span className="font-medium text-slate-800">{result.test}</span>
                                  </div>
                                </td>
                                <td className="py-2 px-3">
                                  <span className={`font-semibold ${
                                    result.status === 'low' ? 'text-amber-700' :
                                    result.status === 'high' ? 'text-red-700' :
                                    'text-emerald-700'
                                  }`}>
                                    {result.value}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-slate-600">{result.unit}</td>
                                {/* <td className="py-2 px-3 text-slate-600">{result.reference_range}</td> */}
                                <td className="py-2 px-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    result.status === 'low' ? 'bg-amber-100 text-amber-700' :
                                    result.status === 'high' ? 'bg-red-100 text-red-700' :
                                    'bg-emerald-100 text-emerald-700'
                                  }`}>
                                    {result.status || 'normal'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Summary Stats */}
                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                              <span className="text-slate-600">
                                Normal: {extractedData.lab_results.filter(r => !r.status || r.status === 'normal').length}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                              <span className="text-slate-600">
                                Low: {extractedData.lab_results.filter(r => r.status === 'low').length}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <span className="text-slate-600">
                                High: {extractedData.lab_results.filter(r => r.status === 'high').length}
                              </span>
                            </div>
                          </div>
                          <span className="text-slate-500">
                            Total: {extractedData.lab_results.length} tests
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

            </div>
            
            {/* Right Side - Details */}
            <div className="lg:w-2/5 p-6">
              {/* <h4 className="text-sm font-semibold text-slate-700 mb-4">Extracted Information</h4> */}
              
              {/* Date and Time */}
              {/* <div className="mb-5">
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Calendar size={16} className={
                    isPrescription ? 'text-teal-500' : 'text-blue-500'
                  } />
                  <span className="font-medium">Date & Time</span>
                </div>
                <p className="text-slate-800 font-semibold">{formatDate(report.uploaded_at)}</p>
              </div> */}

              {/* Doctor Name */}
              {extractedData.doctor_name && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <User size={16} className={
                      isPrescription ? 'text-teal-500' : 'text-blue-500'
                    } />
                    <span className="font-medium">Doctor</span>
                  </div>
                  <p className="text-slate-800 font-semibold">Dr. {extractedData.doctor_name}</p>
                </div>
              )}

              {/* Diagnostic Report Details */}
              {!isPrescription && (
                <>
                  {/* Patient Name for Diagnostic */}
                  {extractedData.patient_name && (
                    <div className="mb-5">
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <User size={16} className="text-blue-500" />
                        <span className="font-medium">Patient</span>
                      </div>
                      <p className="text-slate-800 font-semibold">{extractedData.patient_name}</p>
                    </div>
                  )}

                  <div className="bg-slate-50 rounded-lg p-4 mt-5">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Summary</h4>
                    {summary}
                  </div>

                  {/* Critical Alerts */}
                  {extractedData.critical_alerts && (
                    <div className="mb-5">
                      <div className="flex items-center gap-2 text-slate-600 mb-2">
                        <AlertTriangle size={16} className="text-red-500" />
                        <span className="font-medium">Critical Alerts</span>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        {Array.isArray(extractedData.critical_alerts) ? (
                          <div className="space-y-2">
                            {extractedData.critical_alerts.map((alert, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                                <span className="text-sm text-red-700">{alert}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-red-700">{extractedData.critical_alerts}</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Medications (for prescription) */}
              {isPrescription && extractedData.medications && extractedData.medications.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <Pill size={16} className="text-teal-500" />
                    <span className="font-medium">Medications</span>
                  </div>
                  <div className="space-y-3">
                    {extractedData.medications.map((med, idx) => (
                      <div key={idx} className="bg-teal-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-teal-800">{med.name}</span>
                          {med.dosage && (
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                              {med.dosage}
                            </span>
                          )}
                        </div>
                        {med.frequency && (
                          <p className="text-xs text-teal-600">Frequency: {med.frequency}</p>
                        )}
                        {med.duration && (
                          <p className="text-xs text-teal-600">Duration: {med.duration}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes/Observations */}
              {extractedData.notes && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <FileText size={16} className={
                      isPrescription ? 'text-teal-500' : 'text-blue-500'
                    } />
                    <span className="font-medium">Notes</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm text-slate-700">{extractedData.notes}</p>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Additional Details</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <span className="text-slate-500 block">Document ID</span>
                    <span className="font-medium text-slate-800">{report.id}</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <span className="text-slate-500 block">Status</span>
                    <span className="font-medium text-emerald-600">Verified</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  className="flex-1 py-3 px-4 bg-[#0E7B62] text-white rounded-lg font-medium hover:bg-[#0A5D48] transition-colors"
                >
                  Download Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordDetailModal;