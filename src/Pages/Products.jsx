/**
 * Products Component
 *
 * Displays product catalog with search and filter functionality.
 * Features:
 * - Fetches products from /api/products endpoint
 * - Search functionality to filter products by name
 * - Category filter dropdown
 * - Statistics cards showing total products, revenue, and sales
 * - Responsive grid layout with product cards
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
  AiOutlineDollar,
} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Products = () => {
  // Get authenticated user and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [products, setProducts] = useState([]); // Products list from API
  const [loading, setLoading] = useState(true); // Loading state
  const [searchTerm, setSearchTerm] = useState(''); // Search filter input
  const [filterCategory, setFilterCategory] = useState('all'); // Category filter

  /**
   * Fetch products from API on component mount
   * Retrieves all products from /api/products endpoint
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://task-api-eight-flax.vercel.app/api/products'
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
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
   * Extract unique categories from products
   * Creates dropdown options: 'all' + unique categories from product data
   */
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  /**
   * Filter products based on search term and category
   * - Search: Filters by product name (case-insensitive)
   * - Category: Shows all if 'all' selected, otherwise filters by category
   */
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * Calculate aggregate statistics
   * - totalRevenue: Sum of (price * sales) for all products
   * - totalSales: Sum of all sales across products
   */
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sales, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  // Loading state: Show spinner while fetching products
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
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
                <AiOutlineShoppingCart className="text-white text-xl" />
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
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <AiOutlineShoppingCart size={20} />
              </div>
              <div className="flex-1">
                <span className="font-semibold">Products</span>
                <p className="text-xs text-blue-100">Product List</p>
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
                  Products Catalog 🛍️
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your product catalog
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

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <AiOutlineShoppingCart size={24} className="text-blue-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Products</p>
              <p className="text-3xl font-bold text-gray-800">
                {products.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <AiOutlineDollar size={24} className="text-green-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <AiOutlineBarChart size={24} className="text-purple-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Sales</p>
              <p className="text-3xl font-bold text-gray-800">
                {totalSales.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <AiOutlineSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {product.name.charAt(0)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ${(product.price * product.sales).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
        ></div>
      )}
    </div>
  );
};

export default Products;
