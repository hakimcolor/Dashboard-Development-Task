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
import toast from 'react-hot-toast';
import axios from 'axios';

const Products = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

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

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sales, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-700"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-blue-500 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <AiOutlineHome size={20} />
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="/users"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <AiOutlineUser size={20} />
              <span className="font-medium">Users</span>
            </a>
            <a
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <AiOutlineBarChart size={20} />
              <span className="font-medium">Analytics</span>
            </a>
            <a
              href="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white transition"
            >
              <AiOutlineShoppingCart size={20} />
              <span className="font-medium">Products</span>
            </a>
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition mt-8 w-full"
          >
            <AiOutlineLogout size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-700"
              >
                <AiOutlineMenu size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <p className="text-sm text-gray-500">
                  Manage your product catalog
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <AiOutlineBell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Products;
