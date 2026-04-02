const STORAGE_KEY = 'finance_dashboard_transactions';
const SIMULATED_DELAY = 600; // 600ms delay to simulate network request

// Initial realistic mock data if localStorage is empty
const initialData = [
  { id: '1', date: '2023-10-01', amount: 4500, category: 'Salary', type: 'income' },
  { id: '2', date: '2023-10-02', amount: 120.50, category: 'Groceries', type: 'expense' },
  { id: '3', date: '2023-10-05', amount: 60.00, category: 'Utilities', type: 'expense' },
  { id: '4', date: '2023-10-08', amount: 250.00, category: 'Entertainment', type: 'expense' },
  { id: '5', date: '2023-10-12', amount: 800, category: 'Freelance', type: 'income' },
  { id: '6', date: '2023-10-15', amount: 45.00, category: 'Transport', type: 'expense' },
  { id: '7', date: '2023-10-18', amount: 300.00, category: 'Shopping', type: 'expense' },
];

// Helper to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Fetch all transactions
  getTransactions: async () => {
    await delay(SIMULATED_DELAY);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(stored);
  },

  // Add a new transaction
  addTransaction: async (transaction) => {
    await delay(SIMULATED_DELAY);
    const transactions = await mockApi.getTransactions();
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(), // Generate unique ID
    };
    const updatedTransactions = [newTransaction, ...transactions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    return newTransaction;
  },

  // Edit an existing transaction
  updateTransaction: async (updatedTransaction) => {
    await delay(SIMULATED_DELAY);
    const transactions = await mockApi.getTransactions();
    const updatedTransactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    return updatedTransaction;
  },

  // Delete a transaction
  deleteTransaction: async (id) => {
    await delay(SIMULATED_DELAY);
    const transactions = await mockApi.getTransactions();
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    return id;
  }
};