import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionForm from '../components/transactions/TransactionForm';
import ConfirmModal from '../components/common/ConfirmModal'; 

const TransactionsPage = () => {
  const { transactions, loading, role, filters, deleteTransaction } = useAppContext(); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const processedTransactions = useMemo(() => {
    let result = [...transactions];
    if (filters.searchQuery) {
      const lowerQuery = filters.searchQuery.toLowerCase();
      result = result.filter(
        (t) => 
          t.category.toLowerCase().includes(lowerQuery) || 
          t.amount.toString().includes(lowerQuery)
      );
    }
    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type);
    }
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc': return new Date(b.date) - new Date(a.date);
        case 'date-asc': return new Date(a.date) - new Date(b.date);
        case 'amount-desc': return b.amount - a.amount;
        case 'amount-asc': return a.amount - b.amount;
        default: return 0;
      }
    });
    return result;
  }, [transactions, filters]);

  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (transactionToDelete) {
      await deleteTransaction(transactionToDelete);
      setTransactionToDelete(null);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-8">
      
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your transaction history.</p>
        </div>

        {role === 'Admin' && (
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg shadow-sm cursor-pointer hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Transaction
          </button>
        )}
      </div>

      <TransactionFilters />
      
      {/* 5. Pass the new open delete handler to the table */}
      <TransactionTable 
        transactions={processedTransactions} 
        onEdit={handleOpenEdit} 
        onDelete={handleOpenDelete} 
      />

      <TransactionForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTransaction}
      />
      
      {/* 6. Mount the new Confirm Modal */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone and it will be removed from your dashboard."
      />

    </motion.div>
  );
};

export default TransactionsPage;