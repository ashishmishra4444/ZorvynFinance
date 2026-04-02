import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          className="w-full max-w-sm bg-white border border-gray-200 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full dark:bg-red-900/30">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500" />
              </div>
              <button title="Close dialog" aria-label="Close confirmation dialog" onClick={onClose} className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h3 id="confirm-modal-title" className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>

          <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
            <button 
              title="Cancel deletion"
              aria-label="Cancel deletion"
              onClick={onClose} 
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              title="Delete transaction"
              aria-label="Delete transaction"
              onClick={() => {
                onConfirm();
                onClose();
              }} 
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
