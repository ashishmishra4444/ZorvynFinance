import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppContext } from './hooks/useAppContext';
import PageWrapper from './components/layout/PageWrapper';
import DashboardPage from './pages/DashboardPage';


const TransactionsPagePlaceholder = () => (
  <div className="text-2xl font-bold dark:text-white">
    Transactions View (Coming up..)
  </div>
);

function App() {
  const { isDarkMode } = useAppContext();

  return (
    <>
      <ToastContainer 
        theme={isDarkMode ? 'dark' : 'light'} 
        position="bottom-right" 
        autoClose={3000}
      />
      
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          
          <Route path="/dashboard" element={<DashboardPage />} />
          
          
          <Route path="/transactions" element={<TransactionsPagePlaceholder />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;