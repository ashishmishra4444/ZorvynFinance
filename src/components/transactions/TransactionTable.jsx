import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate, formatCurrency } from "../../utils/formatters";
import { useAppContext } from "../../hooks/useAppContext";

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  const { role, deleteTransaction } = useAppContext();
  const isAdmin = role === "Admin";

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 rounded-xl">
        No transactions match your current filters.
      </div>
    );
  }

  return (
    <div className="custom-scrollbar overflow-auto max-h-[500px] bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 rounded-xl">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-300 shadow-sm">
          <tr>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-6 py-4 text-center">Category</th>
            <th className="px-6 py-4 text-center">Type</th>
            <th className="px-6 py-4 text-right">Amount</th>
            {isAdmin && <th className="px-6 py-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <motion.tr
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={tx.id}
              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="px-6 py-4 font-medium text-left text-gray-900 whitespace-nowrap dark:text-white">
                {formatDate(tx.date)}
              </td>
              <td
                className="px-6 py-4 text-center max-w-[150px] truncate"
                title={tx.category}
              >
                {tx.category}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full inline-block ${
                    tx.type === "income"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                  }`}
                >
                  {tx.type}
                </span>
              </td>

              <td
                className={`px-6 py-4 font-bold text-right ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-gray-100"}`}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </td>

              {isAdmin && (
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => onEdit(tx)}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 dark:text-blue-400"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(tx.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700 dark:text-red-400 transition-colors"
                      title="Delete Transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;