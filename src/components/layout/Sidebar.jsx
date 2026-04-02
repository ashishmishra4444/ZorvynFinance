import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Wallet, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 dark:bg-gray-800 dark:border-gray-700 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
            <Wallet className="w-8 h-8" />
            <span>ZorvynFin</span>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;