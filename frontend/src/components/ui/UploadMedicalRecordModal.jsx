import React, { useState } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { medicalAPI } from '../../api';

const UploadMedicalRecordModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('prescription');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

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
      console.log('Starting medical record upload...', {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        documentType: documentType
      });

      const result = await medicalAPI.uploadMedicalRecord(selectedFile, documentType);
      
      console.log('Upload successful! Result:', result);
      setUploadResult(result);
      
      // Log the extracted data to console as requested
      console.log('Extracted Data:', result.data);
      console.log('Report ID:', result.report_id);
      console.log('Document Type:', result.data?.document_type);
      console.log('Extracted Data Details:', JSON.stringify(result.data?.extracted_data, null, 2));
      
      // Call success callback if provided
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
      
      // Auto-close modal after 3 seconds on success
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
          className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-200/80 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Upload Medical Record</h3>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="p-6">
            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Medical Document Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#0E7B62] hover:text-[#0A5D48] focus-within:outline-none">
                      <span>Choose a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              {selectedFile && (
                <div className="mt-2 text-sm text-slate-600">
                  Selected: <span className="font-medium">{selectedFile.name}</span> ({Math.round(selectedFile.size / 1024)} KB)
                </div>
              )}
            </div>

            {/* Document Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Document Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${documentType === 'prescription' ? 'border-[#0E7B62] bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    name="documentType"
                    value="prescription"
                    checked={documentType === 'prescription'}
                    onChange={handleDocumentTypeChange}
                  />
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${documentType === 'prescription' ? 'border-[#0E7B62]' : 'border-slate-300'}`}>
                      {documentType === 'prescription' && <div className="w-2 h-2 rounded-full bg-[#0E7B62]"></div>}
                    </div>
                    <span className="text-sm font-medium text-slate-700">Prescription</span>
                  </div>
                </label>
                <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${documentType === 'diagnostic' ? 'border-[#0E7B62] bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    name="documentType"
                    value="diagnostic"
                    checked={documentType === 'diagnostic'}
                    onChange={handleDocumentTypeChange}
                  />
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${documentType === 'diagnostic' ? 'border-[#0E7B62]' : 'border-slate-300'}`}>
                      {documentType === 'diagnostic' && <div className="w-2 h-2 rounded-full bg-[#0E7B62]"></div>}
                    </div>
                    <span className="text-sm font-medium text-slate-700">Diagnostic Report</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {uploadResult && (
              <div className="mb-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                  <h3 className="text-sm font-medium text-teal-800">Upload Successful!</h3>
                </div>
                <p className="text-sm text-teal-700 mb-2">
                  Document processed successfully. Check browser console for extracted data.
                </p>
                <div className="text-xs text-teal-600 space-y-1">
                  <p>Report ID: {uploadResult.report_id}</p>
                  <p>Document Type: {uploadResult.data?.document_type}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
                className={`flex-1 py-3 px-4 rounded-lg font-medium ${
                  isUploading || !selectedFile
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-[#0E7B62] text-white hover:bg-[#0A5D48]'
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  'Upload and Extract'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMedicalRecordModal;