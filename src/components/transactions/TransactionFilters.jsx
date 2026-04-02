import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

const CustomDropdown = ({ value, options, onChange }) => {
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
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex items-center justify-between w-full p-2.5 text-sm border border-gray-300 rounded-lg cursor-pointer bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-gray-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pr-4 truncate">{options.find(opt => opt.value === value)?.label}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
      </div>

      {isOpen && (
        <ul className="custom-scrollbar absolute z-20 w-full mt-1 overflow-auto bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 dark:bg-gray-800 dark:border-gray-700 py-1">
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

const TransactionFilters = () => {
  const { transactions, filters, updateFilters } = useAppContext();

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'income', label: 'Income Only' },
    { value: 'expense', label: 'Expense Only' },
  ];

  const categoryOptions = useMemo(() => {
    const categories = Array.from(
      new Set(transactions.map((transaction) => transaction.category).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));

    return [
      { value: 'all', label: 'All Categories' },
      ...categories.map((category) => ({ value: category, label: category })),
    ];
  }, [transactions]);

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'amount-desc', label: 'Highest Amount' },
    { value: 'amount-asc', label: 'Lowest Amount' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl sm:grid-cols-2 lg:grid-cols-4 dark:bg-gray-800 dark:border-gray-700">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search category or amount..."
          className="w-full py-2.5 pl-10 pr-4 text-sm border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
          value={filters.searchQuery}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
        />
      </div>

      <CustomDropdown 
        value={filters.type} 
        options={typeOptions} 
        onChange={(val) => updateFilters({ type: val })} 
      />
      <CustomDropdown 
        value={filters.category} 
        options={categoryOptions} 
        onChange={(val) => updateFilters({ category: val })} 
      />
      <CustomDropdown 
        value={filters.sortBy} 
        options={sortOptions} 
        onChange={(val) => updateFilters({ sortBy: val })} 
      />
    </div>
  );
};

export default TransactionFilters;
