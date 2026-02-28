// Dashboard layout with sidebar and header for all dashboard pages
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBarChart,
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineBell,
  AiOutlineTrophy,
} from 'react-icons/ai';
import { BsSun, BsMoon } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') setDarkMode(true);
  }, []);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.success(
      darkMode ? 'Light mode activated ☀️' : 'Dark mode activated 🌙',
      {
        duration: 2000,
      }
    );
  };

  // Logout with confirmation
  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-gray-800">
            Are you sure you want to logout?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                logout();
                toast.dismiss(t.id);
                toast.success('Logged out successfully!');
                navigate('/');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Yes, Logout
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: 'top-center',
      }
    );
  };

  // Check if route is active
  const isActive = (path) => location.pathname === path;

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard Overview 📊';
      case '/users':
        return 'Users Management 👥';
      case '/analytics':
        return 'Analytics Dashboard 📈';
      case '/products':
        return 'Products Catalog 🛍️';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div
      className={`min-h-screen flex ${darkMode ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}
    >
      <Toaster position="top-center" />

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        <div className="p-6 h-full flex flex-col relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

          {/* Logo */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 transform hover:scale-110 transition-transform duration-300">
                <AiOutlineTrophy className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-xs text-gray-400">v1.0</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {/* User Profile */}
          <div className="mb-8 pb-6 border-b border-gray-700/50 relative z-10">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl border-2 border-blue-400 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                  {user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1 relative z-10">
            <a
              href="/dashboard"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive('/dashboard')
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 transform hover:scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-white/20 group-hover:bg-white/30'
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}
              >
                <AiOutlineHome size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Dashboard</span>
                <p
                  className={`text-xs ${isActive('/dashboard') ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-400'}`}
                >
                  Overview & Stats
                </p>
              </div>
            </a>

            <a
              href="/users"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive('/users')
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 transform hover:scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive('/users')
                    ? 'bg-white/20 group-hover:bg-white/30'
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}
              >
                <AiOutlineUser size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Users</span>
                <p
                  className={`text-xs ${isActive('/users') ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-400'}`}
                >
                  Manage Users
                </p>
              </div>
            </a>

            <a
              href="/analytics"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive('/analytics')
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 transform hover:scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive('/analytics')
                    ? 'bg-white/20 group-hover:bg-white/30'
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}
              >
                <AiOutlineBarChart size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Analytics</span>
                <p
                  className={`text-xs ${isActive('/analytics') ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-400'}`}
                >
                  View Reports
                </p>
              </div>
            </a>

            <a
              href="/products"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive('/products')
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 transform hover:scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive('/products')
                    ? 'bg-white/20 group-hover:bg-white/30'
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}
              >
                <AiOutlineShoppingCart size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Products</span>
                <p
                  className={`text-xs ${isActive('/products') ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-400'}`}
                >
                  Product List
                </p>
              </div>
            </a>
          </nav>

          {/* Logout Button */}
          <div className="relative z-10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 w-full group border border-red-500/20 hover:border-red-500/40"
            >
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <AiOutlineLogout size={20} />
              </div>
              <div className="flex-1 text-left">
                <span className="font-semibold">Logout</span>
                <p className="text-xs text-gray-500 group-hover:text-red-400">
                  Sign out
                </p>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className={`${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80'} backdrop-blur-md border-b border-gray-200 p-4 lg:p-6 sticky top-0 z-40`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden ${darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'} p-2 rounded-lg transition`}
              >
                <AiOutlineMenu size={24} />
              </button>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h2>
                <p
                  className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}
                >
                  Welcome back, {user?.email?.split('@')[0] || 'User'}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-3 ${darkMode ? 'text-yellow-400 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'} rounded-xl transition transform hover:scale-110`}
                title={
                  darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
                }
              >
                {darkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
              </button>

              <button
                className={`relative p-3 ${darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'} rounded-xl transition`}
              >
                <AiOutlineBell size={24} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl items-center justify-center text-white font-bold shadow-lg">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
