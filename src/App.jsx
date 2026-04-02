import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppContext } from './hooks/useAppContext';
import PageWrapper from './components/layout/PageWrapper';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionPage';


function App() {
  const { isDarkMode } = useAppContext();

  return (
    <>
      <ToastContainer 
        theme={isDarkMode ? 'dark' : 'light'} 
        position="bottom-right" 
        autoClose={3000}
        // Added this line to push the toast away from the bottom and right edges
        style={{ right: '2rem', bottom: '2rem' }} 
      />
      
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          
          <Route path="/dashboard" element={<DashboardPage />} />
          
          
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;