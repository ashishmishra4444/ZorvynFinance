import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAppContext } from '../hooks/useAppContext';
import SummaryCards from '../components/dashboard/SummaryCards';
import { TrendChart, ExpenseChart } from '../components/dashboard/Charts';
import Insights from '../components/dashboard/Insights';
import { exportToCSV, exportToJSON } from '../utils/exportData';

const DashboardPage = () => {
  const { transactions, loading, isDarkMode } = useAppContext();

  const handleExport = (type) => {
    if (transactions.length === 0) {
      toast.error('No data available to export.');
      return;
    }
    
    if (type === 'csv') {
      exportToCSV(transactions);
      toast.success('Downloaded CSV file');
    } else {
      exportToJSON(transactions);
      toast.success('Downloaded JSON file');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pb-8"
    >
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track and understand your financial activity.</p>
        </div>

        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button 
            onClick={() => handleExport('json')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg shadow-sm cursor-pointer hover:bg-blue-700"
          >
            <Download className="w-4 h-4" /> JSON
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-gray-200 border-dashed rounded-2xl dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 mb-4 bg-gray-100 rounded-full dark:bg-gray-700">
            <Download className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No transactions yet</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Switch to Admin mode and add some transactions to see your dashboard come to life.</p>
        </div>
      ) : (
        <>
          <SummaryCards transactions={transactions} />
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TrendChart transactions={transactions} isDarkMode={isDarkMode} />
            </div>
            <div className="lg:col-span-1">
              <ExpenseChart transactions={transactions} isDarkMode={isDarkMode} />
            </div>
          </div>

          <Insights transactions={transactions} />
        </>
      )}
    </motion.div>
  );
};

export default DashboardPage;