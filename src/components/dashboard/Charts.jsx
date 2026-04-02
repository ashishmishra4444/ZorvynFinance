import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/formatters';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

export const TrendChart = ({ transactions, isDarkMode }) => {
  const dataMap = transactions.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
    acc[date][curr.type] += Number(curr.amount);
    return acc;
  }, {});

  const data = Object.values(dataMap).sort((a, b) => new Date(a.date) - new Date(b.date)).map(item => ({
    ...item,
    displayDate: formatDate(item.date).split(',')[0] 
  }));

  const textColor = isDarkMode ? '#9CA3AF' : '#6B7280';

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 h-96">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 shrink-0 dark:text-gray-100">Income vs Expenses</h3>
      
      <div className="w-full min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="displayDate" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} dx={-10} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
            <RechartsTooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB', color: isDarkMode ? '#F9FAFB' : '#111827', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="income" stroke="#10B981" fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expense" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export const ExpenseChart = ({ transactions, isDarkMode }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const dataMap = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const data = Object.keys(dataMap).map(name => ({ name, value: dataMap[name] })).sort((a, b) => b.value - a.value);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col p-6 bg-white border border-gray-100 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700 h-96">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 shrink-0 dark:text-gray-100">Spending Breakdown</h3>
      {data.length === 0 ? (
        <div className="flex items-center justify-center flex-1 text-gray-500">No expenses recorded.</div>
      ) : (
        <div className="w-full min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 0, bottom: 25, left: 0 }}>
              <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => `$${value.toFixed(2)}`} contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB', color: isDarkMode ? '#F9FAFB' : '#111827', borderRadius: '8px' }} />
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px', fontSize: '12px', color: isDarkMode ? '#9CA3AF' : '#4B5563' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};