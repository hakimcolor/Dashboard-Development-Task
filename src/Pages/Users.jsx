/**
 * Users Component
 *
 * Displays a list of all users fetched from the REST API.
 * Features:
 * - Fetches users from /api/users endpoint
 * - Search functionality to filter users by name or email
 * - Statistics cards showing total, active, and inactive users
 * - Responsive table layout with user avatars, status badges
 * - Sidebar navigation with logout confirmation
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
  AiOutlineSearch,
} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Users = () => {
  // Get authenticated user and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [users, setUsers] = useState([]); // Users list from API
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(''); // Search filter input

  /**
   * Fetch users from API on component mount
   * Retrieves all users from /api/users endpoint
   */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://task-api-eight-flax.vercel.app/api/users'
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /**
   * Handle logout with confirmation dialog
   * Shows toast notification with Yes/Cancel buttons
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

  /**
   * Filter users based on search term
   * Searches through both name and email fields (case-insensitive)
   */
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state: Show spinner while fetching users
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      <Toaster position="top-center" />
      {/* Sidebar - Premium Dark Theme */}
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
                <AiOutlineUser className="text-white text-xl" />
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
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <AiOutlineHome size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Dashboard</span>
                <p className="text-xs text-gray-500 group-hover:text-gray-400">
                  Overview & Stats
                </p>
              </div>
            </a>

            <a
              href="/users"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <AiOutlineUser size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Users</span>
                <p className="text-xs text-blue-100">Manage Users</p>
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
                  Users Management 👥
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage and view all users
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

        {/* Users Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <AiOutlineSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-800">{users.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-green-600">
                {users.filter((u) => u.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Inactive Users</p>
              <p className="text-3xl font-bold text-gray-600">
                {users.filter((u) => u.status === 'inactive').length}
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      User
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Join Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {u.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-800">
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{u.email}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{u.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
        ></div>
      )}
    </div>
  );
};

export default Users;
