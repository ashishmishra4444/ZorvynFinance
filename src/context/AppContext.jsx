import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mockApi } from "../services/mockApi";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("Viewer"); 
  
  const [filters, setFilters] = useState({
    searchQuery: '',
    type: 'all',
    category: 'all',
    dateRange: 'all',
    sortBy: 'date-desc',
  });

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("finance_theme") === "dark"
  );

  const navigate = useNavigate();

  
  useEffect(() => {
    const root = window.document.documentElement; 
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem("finance_theme", "dark");
    } else {
      root.classList.remove('dark');
      localStorage.setItem("finance_theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchTransactions();
  }, []);

 

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions.");
      toast.error("Failed to load your financial data.");
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    if (role === "Viewer") {
      toast.warning("Viewers cannot add transactions.");
      return { success: false };
    }

    try {
      const newTx = await mockApi.addTransaction(transaction);
      setTransactions((prev) => [newTx, ...prev]);
      toast.success("Transaction added successfully!");
      return { success: true };
    } catch (err) {
      console.error(err);
      toast.error("Failed to add transaction.");
      return { success: false, error: 'Failed to add transaction' };
    }
  };

  const updateTransaction = async (transaction) => {
    if (role === "Viewer") {
      toast.warning("Viewers cannot edit transactions.");
      return { success: false };
    }

    try {
      const updatedTx = await mockApi.updateTransaction(transaction);
      setTransactions((prev) =>
        prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
      );
      toast.success("Transaction updated!");
      return { success: true };
    } catch (err) {
      console.error(err);
      toast.error("Failed to update transaction.");
      return { success: false, error: 'Failed to update transaction' };
    }
  };

  const deleteTransaction = async (id) => {
    if (role === "Viewer") {
      toast.warning("Viewers cannot delete transactions.");
      return { success: false };
    }

    try {
      await mockApi.deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transaction deleted!");
      return { success: true };
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete transaction.");
      return { success: false, error: 'Failed to delete transaction' };
    }
  };

  
  const toggleRole = () => {
    setRole((prev) => {
      const newRole = prev === "Viewer" ? "Admin" : "Viewer";
      toast.info(`Switched to ${newRole} mode`);
      return newRole;
    });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const value = {
    transactions, loading, error, role, filters, isDarkMode,
    setRole, setIsDarkMode, toggleRole, toggleTheme, updateFilters,
    fetchTransactions, addTransaction, updateTransaction, deleteTransaction,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};