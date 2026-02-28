/**
 * Dashboard Component
 *
 * Main dashboard page that displays overview statistics, recent users, and top products.
 * Features:
 * - Fetches dynamic data from REST API (/api/dashboard endpoint)
 * - Displays key metrics: total users, active users, revenue, growth rate
 * - Shows recent users table and top products list
 * - Responsive sidebar navigation with mobile support
 * - Logout confirmation dialog using react-hot-toast
 * - Premium dark theme sidebar with glass morphism effects
 * - Loading and error states with retry functionality
 */

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBarChart,
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineBell,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineTrophy,
  AiOutlineFire,
} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Dashboard = () => {
  // Get authenticated user and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [dashboardData, setDashboardData] = useState(null); // API data storage
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state for failed API calls

  /**
   * Fetch dashboard data from API
   * Retrieves overview stats, users list, and products from /api/dashboard endpoint
   * Handles loading and error states
   */
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        'https://task-api-eight-flax.vercel.app/api/dashboard'
      );
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
      setLoading(false);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  /**
   * Handle logout with confirmation dialog
   * Shows a toast notification with Yes/Cancel buttons
   * On confirmation: clears auth state, shows success message, redirects to login
   */
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

  // Loading state: Show spinner while fetching data from API
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <AiOutlineBarChart className="text-blue-600 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">
            Loading dashboard data from API...
          </p>
        </div>
      </div>
    );
  }

  // Error state: Show error message with retry button
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AiOutlineClose className="text-red-600 text-3xl" />
          </div>
          <p className="text-red-600 mb-4 font-semibold">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main dashboard render with sidebar and content
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Toast notification container for logout confirmation */}
      <Toaster position="top-center" />

      {/* Sidebar: Premium dark theme with glass morphism, responsive mobile drawer */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transition-transform duration-300 ease-in-out shadow-2xl`}
      >
        <div className="p-6 h-full flex flex-col relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

          {/* Logo Section */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 transform hover:scale-110 transition-transform duration-300">
                <AiOutlineTrophy className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
                <p className="text-xs text-gray-400">Dashboard v1.0</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {/* User Profile Card */}
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
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <AiOutlineHome size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Dashboard</span>
                <p className="text-xs text-blue-100">Overview & Stats</p>
              </div>
            </a>

            <a
              href="/users"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <AiOutlineUser size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Users</span>
                <p className="text-xs text-gray-500 group-hover:text-gray-400">
                  Manage Users
                </p>
              </div>
            </a>

            <a
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <AiOutlineBarChart size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Analytics</span>
                <p className="text-xs text-gray-500 group-hover:text-gray-400">
                  View Reports
                </p>
              </div>
            </a>

            <a
              href="/products"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <AiOutlineShoppingCart size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Products</span>
                <p className="text-xs text-gray-500 group-hover:text-gray-400">
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
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 lg:p-6 sticky top-0 z-40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <AiOutlineMenu size={24} />
              </button>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome back, {user?.email?.split('@')[0] || 'User'}! 👋
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Here's what's happening with your projects today
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition">
                <AiOutlineBell size={24} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl items-center justify-center text-white font-bold shadow-lg">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content: Stats cards, recent users table, top products */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Stats Cards: Display key metrics from API (totalUsers, activeUsers, revenue, growth) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {/* Total Users Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AiOutlineUser size={28} className="text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                  <AiOutlineArrowUp size={16} />
                  <span>+{dashboardData?.overview?.growth}%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1 font-medium">
                Total Users
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {dashboardData?.overview?.totalUsers?.toLocaleString()}
              </p>
              <div className="mt-3 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>

            {/* Active Users Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AiOutlineFire size={28} className="text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                  <AiOutlineArrowUp size={16} />
                  <span>+12.5%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1 font-medium">
                Active Users
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {dashboardData?.overview?.activeUsers?.toLocaleString()}
              </p>
              <div className="mt-3 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AiOutlineShoppingCart size={28} className="text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                  <AiOutlineArrowUp size={16} />
                  <span>+8.2%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1 font-medium">Revenue</p>
              <p className="text-3xl font-bold text-gray-800">
                ${dashboardData?.overview?.revenue?.toLocaleString()}
              </p>
              <div className="mt-3 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
            </div>

            {/* Growth Rate Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AiOutlineBarChart size={28} className="text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                  <AiOutlineArrowUp size={16} />
                  <span>+15.3%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1 font-medium">
                Growth Rate
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {dashboardData?.overview?.growth}%
              </p>
              <div className="mt-3 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
          </div>

          {/* Two-column layout: Recent users table and top products sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Users: Table showing first 5 users from API with avatar, email, status, join date */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <AiOutlineUser className="text-blue-600" />
                  Recent Users
                </h3>
                <button className="text-blue-600 text-sm font-semibold hover:underline">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        User
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden md:table-cell">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">
                        Join Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.users?.slice(0, 5).map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-800">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 hidden md:table-cell">
                          {user.email}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 hidden sm:table-cell">
                          {user.joinDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products: Sidebar showing first 4 products with ranking badges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <AiOutlineTrophy className="text-orange-600" />
                Top Products
              </h3>
              <div className="space-y-4">
                {dashboardData?.products?.slice(0, 4).map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.sales} sales
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      ${product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile overlay: Dark backdrop when sidebar is open, click to close */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
