import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const Insights = ({ transactions }) => {
  if (transactions.length === 0) return null;

  const expenses = transactions.filter(t => t.type === 'expense');

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const highestCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, null);
  const largestTransaction = [...transactions].sort((a, b) => b.amount - a.amount)[0];
  const monthlyExpenses = expenses.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[key] = (acc[key] || 0) + Number(curr.amount);
    return acc;
  }, {});
  const sortedMonths = Object.keys(monthlyExpenses).sort();
  const currentMonthKey = sortedMonths[sortedMonths.length - 1];
  const previousMonthKey = sortedMonths[sortedMonths.length - 2];
  const currentMonthExpense = currentMonthKey ? monthlyExpenses[currentMonthKey] : 0;
  const previousMonthExpense = previousMonthKey ? monthlyExpenses[previousMonthKey] : 0;
  const monthlyDelta = currentMonthExpense - previousMonthExpense;
  const monthlyDeltaPercentage =
    previousMonthExpense > 0 ? (monthlyDelta / previousMonthExpense) * 100 : null;

  const formatMonthLabel = (monthKey) => {
    if (!monthKey) return '';
    const [year, month] = monthKey.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="p-6 mt-8 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl dark:from-indigo-900/20 dark:to-blue-900/20 dark:border-indigo-800/50">
      <div className="flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-400">
        <Lightbulb className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Financial Insights</h3>
      </div>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        {highestCategory && (
          <li>• Your highest spending category is <strong className="font-semibold text-gray-900 dark:text-white">{highestCategory}</strong> at {formatCurrency(categoryTotals[highestCategory])}.</li>
        )}
        {largestTransaction && (
          <li>• Your largest single transaction was <strong className="font-semibold text-gray-900 dark:text-white">{largestTransaction.category}</strong> for {formatCurrency(largestTransaction.amount)} on {new Date(largestTransaction.date).toLocaleDateString()}.</li>
        )}
        {currentMonthKey && previousMonthKey && (
          <li>
            • Expenses in <strong className="font-semibold text-gray-900 dark:text-white">{formatMonthLabel(currentMonthKey)}</strong>{' '}
            were {monthlyDelta >= 0 ? 'up' : 'down'} by{' '}
            <strong className="font-semibold text-gray-900 dark:text-white">{formatCurrency(Math.abs(monthlyDelta))}</strong>
            {monthlyDeltaPercentage !== null && (
              <> ({Math.abs(monthlyDeltaPercentage).toFixed(1)}%)</>
            )}{' '}
            compared with <strong className="font-semibold text-gray-900 dark:text-white">{formatMonthLabel(previousMonthKey)}</strong>.
          </li>
        )}
        {currentMonthKey && !previousMonthKey && (
          <li>
            • You have recorded <strong className="font-semibold text-gray-900 dark:text-white">{formatCurrency(currentMonthExpense)}</strong>{' '}
            in expenses for <strong className="font-semibold text-gray-900 dark:text-white">{formatMonthLabel(currentMonthKey)}</strong> so far.
          </li>
        )}
      </ul>
    </motion.div>
  );
};

export default Insights;
