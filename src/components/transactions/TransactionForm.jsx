import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { toast } from 'react-toastify';


const FormDropdown = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div
        className="flex items-center justify-between w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer dark:bg-gray-900 dark:border-gray-600 dark:text-white hover:border-blue-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pr-4 truncate">{options.find(opt => opt.value === value)?.label}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
      </div>

      {isOpen && (
        <ul className="custom-scrollbar absolute z-50 w-full mt-1 overflow-auto bg-white border border-gray-100 rounded-lg shadow-xl max-h-48 dark:bg-gray-800 dark:border-gray-700 py-1">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`px-4 py-2.5 text-sm transition-colors cursor-pointer 
                ${value === opt.value 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TransactionForm = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, updateTransaction } = useAppContext();
  const [formData, setFormData] = useState({ date: '', amount: '', category: 'Groceries', type: 'expense' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    } else {
      setFormData({ date: new Date().toISOString().split('T')[0], amount: '', category: 'Groceries', type: 'expense' });
    }
  }, [transactionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalAmount = Math.abs(Number(formData.amount));
    if (finalAmount === 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    
    const payload = { ...formData, amount: Number(formData.amount) };
    
    if (transactionToEdit) {
      await updateTransaction(payload);
    } else {
      await addTransaction(payload);
    }
    
    setIsSubmitting(false);
    onClose();
  };

  const typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' }
  ];

  const categoryOptions = [
    { value: 'Salary', label: 'Salary' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {transactionToEdit ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
            <button onClick={onClose} className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <input 
                type="date" 
                required 
                value={formData.date} 
                onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-400 cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormDropdown 
                label="Type"
                value={formData.type}
                options={typeOptions}
                onChange={(val) => setFormData({ ...formData, type: val })}
              />
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                <input type="number" step="0.01" min="0" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-400" placeholder="0.00" />
              </div>
            </div>

            <FormDropdown 
              label="Category"
              value={formData.category}
              options={categoryOptions}
              onChange={(val) => setFormData({ ...formData, category: val })}
            />

            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {isSubmitting ? 'Saving...' : 'Save Transaction'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransactionForm;