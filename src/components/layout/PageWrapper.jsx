import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PageWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;