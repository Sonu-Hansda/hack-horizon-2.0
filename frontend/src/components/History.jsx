import React, { useState, useEffect } from 'react';
import {
   CheckCircle2, PillBottle, HeartPulse, Activity, FileText,
   ChevronDown, Syringe, Clock, Thermometer, Droplet, Layers, X,
   Building, MapPin, User, ArrowRight, Link as LinkIcon, Plus,
   Stethoscope, FlaskConical, AlertCircle
} from 'lucide-react';
import { medicalAPI } from '../api';

export default function History() {
   const [visits, setVisits] = useState([]);
   const [allReports, setAllReports] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedNode, setSelectedNode] = useState(null);
   const [showLinkModal, setShowLinkModal] = useState(null); // stores visitId

   const fetchData = async () => {
      try {
         setLoading(true);
         const [visitData, reportData] = await Promise.all([
            medicalAPI.getVisits(),
            medicalAPI.getMedicalRecords()
         ]);

         // Sort visits by date desc
         const sortedVisits = visitData.sort((a, b) => new Date(b.date) - new Date(a.date));
         setVisits(sortedVisits);
         setAllReports(reportData);
      } catch (err) {
         console.error('Error fetching history data:', err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleLinkSuccess = () => {
      setShowLinkModal(null);
      fetchData();
   };

   if (loading) return <LoadingHistory />;

   const unlinkedReports = allReports.filter(r => !r.visit_id);

   return (
      <div className="max-w-[1240px] mx-auto space-y-6 lg:space-y-8 pb-12 pt-2 xl:pt-4 fadeIn relative">

         {/* Header section */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pl-0 lg:pl-10">
            <div>
               <h2 className="text-3xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight mb-3">Clinical Journey</h2>
            </div>
            <div className="flex items-center gap-3">
               <div className="px-4 py-2 bg-teal-50 rounded-xl border border-teal-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0E7B62] animate-pulse" />
                  <span className="text-[11px] font-black text-[#0E7B62] uppercase tracking-widest">{visits.length} Encounters</span>
               </div>
            </div>
         </div>

         {visits.length === 0 && unlinkedReports.length === 0 ? (
            <EmptyHistory />
         ) : (
            <div className="relative w-full max-w-5xl mx-auto mt-16 pt-4 pb-12">
               {/* Vertical Connector Line */}
               <div className="absolute left-[23.5px] lg:left-1/2 top-4 bottom-12 w-[3px] bg-slate-200 lg:-translate-x-1/2 rounded-full z-0 opacity-50" />

               {/* --- Encounters Timeline --- */}
               {visits.map((visit, idx) => {
                  const visitReports = allReports.filter(r => r.visit_id === visit.id);
                  return (
                     <TimelineRow
                        key={visit.id}
                        align={idx % 2 === 0 ? "left" : "right"}
                        visit={visit}
                        reports={visitReports}
                        onLinkClick={() => setShowLinkModal(visit.id)}
                        onClick={() => setSelectedNode({ visit, reports: visitReports })}
                     />
                  );
               })}

               {/* --- Unassigned Records Node --- */}
               {unlinkedReports.length > 0 && (
                  <div className="relative z-10 mt-20 flex justify-center">
                     <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-8 max-w-lg w-full text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
                           <Layers size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">Unassigned Findings</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8">
                           There are {unlinkedReports.length} documents not yet linked to a clinical encounter.
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                           {unlinkedReports.slice(0, 3).map(r => (
                              <div key={r.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                 <div className="flex items-center gap-3">
                                    <FileText size={18} className="text-slate-400" />
                                    <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{r.file_name}</span>
                                 </div>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standalone</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )}

         {/* Modals */}
         {selectedNode && (
            <HistoryDetailModal
               node={selectedNode}
               onClose={() => setSelectedNode(null)}
            />
         )}

         {showLinkModal && (
            <LinkRecordModal
               visitId={showLinkModal}
               unlinkedReports={unlinkedReports}
               onClose={() => setShowLinkModal(null)}
               onSuccess={handleLinkSuccess}
            />
         )}
      </div>
   );
}

function TimelineRow({ align, visit, reports, onLinkClick, onClick }) {
   const isLeft = align === 'left';
   const date = new Date(visit.date).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
   });

   return (
      <div className="relative flex flex-col lg:flex-row items-center w-full mb-20 lg:mb-24 group z-10 w-full px-2 lg:px-0">

         {/* Node Dot */}
         <div
            className="absolute left-[16px] lg:left-1/2 top-[22px] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white border-[4px] border-[#0E7B62] shadow-[0_0_0_8px_rgba(14,123,98,0.1)] cursor-pointer hover:scale-[1.3] transition-transform z-10"
            onClick={onClick}
         />

         {/* --- MOBILE LAYOUT --- */}
         <div className="flex lg:hidden flex-col w-full pl-[56px] pr-2 pt-1 pb-4">
            <div className="mb-4 inline-block">
               <h4 className="text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase mb-1">{date}</h4>
               <h3 className="text-[20px] font-black text-slate-900 leading-tight">{visit.diagnosis || 'Clinical Encounter'}</h3>
            </div>
            <div className="w-full">
               <VisitNode visit={visit} reports={reports} onLinkClick={onLinkClick} onClick={onClick} />
            </div>
         </div>

         {/* --- DESKTOP LAYOUT --- */}
         <div className="hidden lg:flex w-full items-center justify-between">
            <div className="w-[calc(50%-4rem)] flex justify-end text-right">
               {isLeft ? (
                  <div className="cursor-pointer group-hover:-translate-x-2 transition-transform duration-300" onClick={onClick}>
                     <h4 className="text-[12px] font-black text-slate-400 tracking-[0.2em] uppercase mb-2">{date}</h4>
                     <h3 className="text-[24px] font-black text-slate-900 leading-tight">{visit.diagnosis || 'Clinical Encounter'}</h3>
                     <div className="flex items-center justify-end gap-3 mt-3">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{visit.examine_area}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[150px]">{visit.hospital_name}</span>
                     </div>
                  </div>
               ) : (
                  <div className="w-full max-w-md float-right">
                     <VisitNode visit={visit} reports={reports} onLinkClick={onLinkClick} onClick={onClick} />
                  </div>
               )}
            </div>

            <div className="w-[calc(50%-4rem)] flex justify-start text-left">
               {!isLeft ? (
                  <div className="cursor-pointer group-hover:translate-x-2 transition-transform duration-300" onClick={onClick}>
                     <h4 className="text-[12px] font-black text-slate-400 tracking-[0.2em] uppercase mb-2">{date}</h4>
                     <h3 className="text-[24px] font-black text-slate-900 leading-tight">{visit.diagnosis || 'Clinical Encounter'}</h3>
                     <div className="flex items-center gap-3 mt-3">
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{visit.examine_area}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[150px]">{visit.hospital_name}</span>
                     </div>
                  </div>
               ) : (
                  <div className="w-full max-w-md float-left">
                     <VisitNode visit={visit} reports={reports} onLinkClick={onLinkClick} onClick={onClick} />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

function VisitNode({ visit, reports, onLinkClick, onClick }) {
   return (
      <div
         className="bg-white rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer"
         onClick={onClick}
      >
         <div className="p-7 space-y-6">
            <div className="flex justify-between items-start">
               <div className="flex items-center gap-3 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full">
                  <Stethoscope size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{visit.examine_area || 'ENCOUNTER'}</span>
               </div>
               <button
                  onClick={(e) => { e.stopPropagation(); onLinkClick(); }}
                  className="p-2 text-slate-300 hover:text-[#0E7B62] hover:bg-teal-50 rounded-lg transition-all"
                  title="Link a document to this visit"
               >
                  <Plus size={20} />
               </button>
            </div>

            <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
               {visit.notes || visit.diagnosis || 'Routine clinical assessment and monitoring.'}
            </p>

            {(reports.length > 0 || visit.prescriptions?.length > 0) && (
               <div className="pt-4 border-t border-slate-50 space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                     {reports.map((r, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100" title={r.file_name}>
                           {r.document_type === 'prescription' ? <PillBottle size={14} /> : <FlaskConical size={14} />}
                        </div>
                     ))}
                     {visit.prescriptions?.map((p, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100" title={p.medicine_name}>
                           <PillBottle size={14} />
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>

         <div className="bg-slate-50 px-7 py-4 flex items-center justify-between group-hover:bg-[#0E7B62]/5 transition-colors">
            <div className="flex items-center gap-2">
               <Building size={14} className="text-slate-400" />
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-[100px]">{visit.hospital_name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0E7B62] animate-pulse">
               <span className="text-[10px] font-black uppercase tracking-widest">Details</span>
               <ArrowRight size={14} />
            </div>
         </div>
      </div>
   );
}

function HistoryDetailModal({ node, onClose }) {
   const { visit, reports } = node;
   const dateStr = new Date(visit.date).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
   });

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
         <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
            <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
               <div>
                  <h4 className="text-[11px] font-black text-[#0E7B62] uppercase tracking-[0.2em] mb-2">{dateStr}</h4>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">{visit.diagnosis || 'Clinical Encounter'}</h2>
               </div>
               <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                  <X size={20} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
               {/* Core Info */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard icon={User} label="Consultant" value={visit.doctor_name || 'N/A'} />
                  <InfoCard icon={Building} label="Facility" value={visit.hospital_name || 'N/A'} />
                  <InfoCard icon={Stethoscope} label="Specialty" value={visit.examine_area || 'General Practice'} />
                  <InfoCard icon={MapPin} label="Location" value={visit.location || 'N/A'} />
               </div>

               {/* Notes */}
               {visit.notes && (
                  <div className="space-y-4">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Activity size={16} /> Clinical Observations
                     </h3>
                     <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-600 leading-relaxed font-medium">
                        "{visit.notes}"
                     </div>
                  </div>
               )}

               {/* Reports & Prescriptions */}
               {(reports.length > 0) && (
                  <div className="space-y-4">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FlaskConical size={16} /> Attached Laboratory Work
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {reports.map((r, idx) => (
                           <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                 <FileText size={18} />
                              </div>
                              <div className="min-w-0">
                                 <p className="text-sm font-black text-slate-800 truncate">{r.file_name}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.document_type}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
               <button onClick={onClose} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[13px] uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                  Close Encounter Details
               </button>
            </div>
         </div>
      </div>
   );
}

function LinkRecordModal({ visitId, unlinkedReports, onClose, onSuccess }) {
   const [linking, setLinking] = useState(false);

   const handleLink = async (reportId) => {
      setLinking(true);
      try {
         await medicalAPI.linkReportToVisit(reportId, visitId);
         onSuccess();
      } catch (err) {
         alert(err.detail || "Failed to link report");
      } finally {
         setLinking(false);
      }
   };

   return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
         <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-md animate-scaleUp">
            <div className="p-7 border-b border-slate-100 flex items-center justify-between">
               <h3 className="text-lg font-black text-slate-900">Link Medical Record</h3>
               <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                  <X size={20} />
               </button>
            </div>

            <div className="p-7 max-h-[50vh] overflow-y-auto custom-scrollbar">
               {unlinkedReports.length === 0 ? (
                  <div className="text-center py-10">
                     <AlertCircle size={32} className="text-slate-200 mx-auto mb-3" />
                     <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">No unassigned records found</p>
                  </div>
               ) : (
                  <div className="space-y-3">
                     {unlinkedReports.map(r => (
                        <button
                           key={r.id}
                           onClick={() => handleLink(r.id)}
                           disabled={linking}
                           className="w-full flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
                        >
                           <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center group-hover:text-indigo-600 transition-colors">
                              <FileText size={18} />
                           </div>
                           <div className="flex-1 text-left min-w-0">
                              <p className="text-sm font-black text-slate-800 truncate">{r.file_name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Added on {new Date(r.uploaded_at).toLocaleDateString()}</p>
                           </div>
                           <LinkIcon size={16} className="text-slate-300 group-hover:text-indigo-500" />
                        </button>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

function InfoCard({ icon: Icon, label, value }) {
   return (
      <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-4">
         <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
            <Icon size={20} />
         </div>
         <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">{label}</p>
            <p className="text-sm font-black text-slate-800 truncate max-w-[150px]">{value}</p>
         </div>
      </div>
   );
}

function LoadingHistory() {
   return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-20">
         <div className="w-20 h-20 bg-slate-100 rounded-[40px] flex items-center justify-center animate-pulse mb-6">
            <Clock size={40} className="text-slate-300" />
         </div>
         <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Constructing Clinical Timeline</p>
      </div>
   );
}

function EmptyHistory() {
   return (
      <div className="text-center py-32 bg-slate-50 rounded-[64px] border-2 border-dashed border-slate-200 mt-10 mx-6">
         <Layers size={64} className="text-slate-200 mx-auto mb-6" />
         <h3 className="text-2xl font-black text-slate-800 mb-2">Your Timeline is Empty</h3>
         <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 text-lg">
            Start your journey by uploading a medical report or sharing your QR code with a provider.
         </p>
         <button
            onClick={() => window.location.href = '/medical-records'}
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[13px] uppercase tracking-wider shadow-xl shadow-slate-900/20 active:scale-95"
         >
            Upload First Record
         </button>
      </div>
   );
}
