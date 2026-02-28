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
  AiOutlineEye,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Analytics = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          'https://task-api-eight-flax.vercel.app/api/analytics'
        );
        setAnalytics(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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

  const totalViews = analytics.reduce((sum, item) => sum + item.views, 0);
  const totalClicks = analytics.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = analytics.reduce(
    (sum, item) => sum + item.conversions,
    0
  );
  const avgConversionRate =
    totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-center" />
      {/* Sidebar - Same as Users page */}
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white transition"
            >
              <AiOutlineBarChart size={20} />
              <span className="font-medium">Analytics</span>
            </a>
            <a
              href="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
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
                <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
                <p className="text-sm text-gray-500">
                  Track your performance metrics
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <AiOutlineEye size={24} className="text-blue-600" />
                </div>
                <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                  <AiOutlineArrowUp size={16} />
                  12.5%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Views</p>
              <p className="text-3xl font-bold text-gray-800">
                {totalViews.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <AiOutlineBarChart size={24} className="text-purple-600" />
                </div>
                <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                  <AiOutlineArrowUp size={16} />
                  8.2%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-800">
                {totalClicks.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <AiOutlineShoppingCart size={24} className="text-green-600" />
                </div>
                <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                  <AiOutlineArrowUp size={16} />
                  15.3%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Conversions</p>
              <p className="text-3xl font-bold text-gray-800">
                {totalConversions}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AiOutlineBarChart size={24} className="text-orange-600" />
                </div>
                <span className="text-red-500 text-sm font-semibold flex items-center gap-1">
                  <AiOutlineArrowDown size={16} />
                  2.1%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-800">
                {avgConversionRate}%
              </p>
            </div>
          </div>

          {/* Analytics Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">
                Daily Analytics
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Views
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Clicks
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Conversions
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Conversion Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.map((item, index) => {
                    const conversionRate =
                      item.clicks > 0
                        ? ((item.conversions / item.clicks) * 100).toFixed(2)
                        : 0;
                    return (
                      <tr
                        key={index}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6 font-medium text-gray-800">
                          {item.date}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {item.views.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {item.clicks.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {item.conversions}
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                            {conversionRate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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

export default Analytics;
