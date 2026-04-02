import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <section className="flex w-full flex-col h-full p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your latest five transactions at a glance.</p>
        </div>
        <Link
          to="/transactions"
          title="Go to the transactions page"
          aria-label="Go to the transactions page"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="custom-scrollbar pr-2 space-y-3 overflow-y-auto min-h-0 max-h-[180px]">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            title={`${transaction.category} ${transaction.type} transaction on ${formatDate(transaction.date)} for ${formatCurrency(transaction.amount)}`}
            className="flex items-center justify-between gap-4 p-4 transition-colors border border-gray-100 rounded-xl dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/40"
          >
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate dark:text-white">{transaction.category}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</p>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-100'}`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{transaction.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTransactions;
