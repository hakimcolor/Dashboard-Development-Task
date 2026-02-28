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
import toast from 'react-hot-toast';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          'https://task-api-eight-flax.vercel.app/api/dashboard'
        );
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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

          {/* User Profile */}
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

          {/* Navigation */}
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white transition"
            >
              <AiOutlineHome size={20} />
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <AiOutlineUser size={20} />
              <span className="font-medium">Users</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <AiOutlineBarChart size={20} />
              <span className="font-medium">Analytics</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <AiOutlineShoppingCart size={20} />
              <span className="font-medium">Products</span>
            </a>
          </nav>

          {/* Logout Button */}
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
        {/* Header */}
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome back, {user?.email?.split('@')[0] || 'User'}!
                </h2>
                <p className="text-sm text-gray-500">
                  Here's what's happening today
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

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <AiOutlineUser size={24} className="text-blue-600" />
                </div>
                <span className="text-green-500 text-sm font-semibold">
                  +{dashboardData?.overview?.growth}%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-800">
                {dashboardData?.overview?.totalUsers?.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <AiOutlineBarChart size={24} className="text-green-600" />
                </div>
                <span className="text-green-500 text-sm font-semibold">
                  +12.5%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-800">
                {dashboardData?.overview?.activeUsers?.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <AiOutlineShoppingCart
                    size={24}
                    className="text-purple-600"
                  />
                </div>
                <span className="text-green-500 text-sm font-semibold">
                  +8.2%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Revenue</p>
              <p className="text-3xl font-bold text-gray-800">
                ${dashboardData?.overview?.revenue?.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AiOutlineHome size={24} className="text-orange-600" />
                </div>
                <span className="text-green-500 text-sm font-semibold">
                  +15.3%
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">Growth Rate</p>
              <p className="text-3xl font-bold text-gray-800">
                {dashboardData?.overview?.growth}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Users */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
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
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Join Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.users?.slice(0, 5).map((user) => (
                      <tr key={user.id} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-800">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
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
                        <td className="py-4 px-4 text-gray-600">
                          {user.joinDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Top Products
              </h3>
              <div className="space-y-4">
                {dashboardData?.products?.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.sales} sales
                      </p>
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
