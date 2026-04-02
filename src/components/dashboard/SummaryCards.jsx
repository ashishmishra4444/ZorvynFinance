import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const SummaryCards = ({ transactions }) => {
  
  const { income, expense } = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') acc.income += Number(curr.amount);
      if (curr.type === 'expense') acc.expense += Number(curr.amount);
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = income - expense;

  const cards = [
    { title: 'Total Balance', amount: balance, icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Total Income', amount: income, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { title: 'Total Expenses', amount: expense, icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/30' },
  ];

  
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={container} initial="hidden" animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 mb-8"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div key={index} variants={item} className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className={`p-4 rounded-full ${card.bg} mr-4`}>
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(card.amount)}
              </h3>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SummaryCards;