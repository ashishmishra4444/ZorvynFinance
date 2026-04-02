const STORAGE_KEY = 'finance_dashboard_transactions';
const SIMULATED_DELAY = 600;

const initialData = [
  { id: '1', date: '2023-10-01', amount: 4500, category: 'Salary', type: 'income' },
  { id: '2', date: '2023-10-02', amount: 120.50, category: 'Groceries', type: 'expense' },
  { id: '3', date: '2023-10-05', amount: 60.00, category: 'Utilities', type: 'expense' },
  { id: '4', date: '2023-10-08', amount: 250.00, category: 'Entertainment', type: 'expense' },
  { id: '5', date: '2023-10-12', amount: 800, category: 'Freelance', type: 'income' },
  { id: '6', date: '2023-10-15', amount: 45.00, category: 'Transport', type: 'expense' },
  { id: '7', date: '2023-10-18', amount: 300.00, category: 'Shopping', type: 'expense' },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  getTransactions: async () => {
    await delay(SIMULATED_DELAY);
    
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to parse local storage data, reverting to initial data.", error);
    }
    
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  },

  addTransaction: async (transaction) => {
    await delay(SIMULATED_DELAY);
    const transactions = await mockApi.getTransactions();
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(), 
    };
    const updatedTransactions = [newTransaction, ...transactions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    return newTransaction;
  },

  updateTransaction: async (updatedTransaction) => {
    await delay(SIMULATED_DELAY);
    const transactions = await mockApi.getTransactions();
    const updatedTransactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    return updatedTransaction;
  },

  deleteTransaction: async (id) => {
    await delay(SIMULATED_DELAY);
    const transactions = await mockApi.getTransactions();
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    return id;
  }
};