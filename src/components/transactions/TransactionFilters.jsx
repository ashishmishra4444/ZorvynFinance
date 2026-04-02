import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

const CustomDropdown = ({ value, options, onChange, ariaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
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

  useEffect(() => {
    const selectedIndex = options.findIndex((option) => option.value === value);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [options, value]);

  const handleKeyDown = (event) => {
    if (!isOpen && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % options.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(options[highlightedIndex].value);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={ariaLabel}
        className="flex items-center justify-between w-full p-2.5 text-sm border border-gray-300 rounded-lg cursor-pointer bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        <span className="pr-4 truncate">{options.find(opt => opt.value === value)?.label}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="custom-scrollbar absolute z-20 w-full mt-1 overflow-auto bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 dark:bg-gray-800 dark:border-gray-700 py-1"
        >
          {options.map((opt, index) => (
            <li
              role="option"
              aria-selected={value === opt.value}
              key={opt.value}
              className={`px-4 py-2.5 text-sm transition-colors cursor-pointer 
                ${value === opt.value || highlightedIndex === index
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              onMouseEnter={() => setHighlightedIndex(index)}
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
  const { transactions, filters, updateFilters, resetFilters } = useAppContext();
  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.sortBy !== 'date-desc';

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
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search category or amount..."
          aria-label="Search transactions"
          title="Search transactions by category or amount"
          className="w-full py-2.5 pl-10 pr-4 text-sm border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
          value={filters.searchQuery}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
        />
      </div>

      <CustomDropdown 
        value={filters.type} 
        options={typeOptions} 
        ariaLabel="Filter by transaction type"
        onChange={(val) => updateFilters({ type: val })} 
      />
      <CustomDropdown 
        value={filters.category} 
        options={categoryOptions} 
        ariaLabel="Filter by category"
        onChange={(val) => updateFilters({ category: val })} 
      />
      <div className="flex gap-3">
        <CustomDropdown 
          value={filters.sortBy} 
          options={sortOptions} 
          ariaLabel="Sort transactions"
          onChange={(val) => updateFilters({ sortBy: val })} 
        />
        <button
          type="button"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          title="Reset all transaction filters"
          aria-label="Reset all transaction filters"
          className="px-4 py-2.5 text-sm font-semibold cursor-pointer text-blue-700 transition-all bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed dark:bg-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;
