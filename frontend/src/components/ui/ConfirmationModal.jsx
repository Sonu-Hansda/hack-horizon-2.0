import React from 'react';
import Button from './Button';
import { X } from 'lucide-react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  cancelVariant = "outline",
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-[20px] shadow-2xl w-full max-w-md border border-slate-200/80 animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
            <h3 className="text-[18px] font-bold text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="p-6">
            <p className="text-[15px] text-slate-600 leading-relaxed font-medium">{message}</p>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-slate-100">
            <Button
              variant={cancelVariant}
              size="medium"
              onClick={onClose}
              className="min-w-[100px]"
            >
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              size="medium"
              onClick={handleConfirm}
              className="min-w-[100px]"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;