import { Menu, Moon, Sun, ShieldAlert, User, CircleUser } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';

const Navbar = ({ setSidebarOpen }) => {
  const { isDarkMode, toggleTheme, role, toggleRole } = useAppContext();

  return (
    <header className="shrink-0 sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center">
        <button
          className="mr-4 text-gray-500 cursor-pointer lg:hidden hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="hidden text-xl font-semibold text-gray-800 sm:block dark:text-gray-100">
          Welcome back
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center group">
          <button
            onClick={toggleRole}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {role === 'Admin' ? (
              <ShieldAlert className="w-4 h-4 text-red-500" />
            ) : (
              <User className="w-4 h-4 text-blue-500" />
            )}
            <span className="hidden sm:inline">{role} Mode</span>
          </button>
          
          
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 dark:bg-gray-200 dark:text-gray-800">
            Switch to {role === 'Viewer' ? 'Admin' : 'Viewer'}
          </span>
        </div>

        
        <div className="relative flex items-center group">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 transition-colors rounded-full cursor-pointer hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 dark:bg-gray-200 dark:text-gray-800 z-50">
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </span>
        </div>

        
        
        <div className="relative flex items-center group">
          <button className="flex items-center justify-center p-1 text-gray-500 transition-colors rounded-full cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <CircleUser className="w-7 h-7" strokeWidth={1.5} />
          </button>
          
         
          <span className="absolute right-0 top-full mt-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 dark:bg-gray-200 dark:text-gray-800 z-50">
            My Profile
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;