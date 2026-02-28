/**
 * SignIn Component
 *
 * Login page with animated Vanta.js waves background.
 * Features:
 * - JWT authentication via /api/login endpoint
 * - Email and password input fields with validation
 * - Password visibility toggle
 * - Loading state during authentication
 * - Error handling with toast notifications
 * - Vanta.js WAVES animated 3D background
 * - Demo credentials display for testing
 * - Redirects to dashboard on successful login
 */

import { useContext, useState, useEffect, useRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';

const SignIn = () => {
  // Get login function from AuthContext
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Vanta.js background effect references
  const vantaRef = useRef(null); // DOM element reference for Vanta
  const [vantaEffect, setVantaEffect] = useState(null); // Vanta effect instance

  // Form state management
  const [email, setEmail] = useState(''); // Email input value
  const [password, setPassword] = useState(''); // Password input value
  const [show, setShow] = useState(false); // Password visibility toggle
  const [error, setError] = useState(''); // Error message display
  const [loading, setLoading] = useState(false); // Loading state during login

  /**
   * Initialize Vanta.js WAVES effect on component mount
   * Creates animated 3D wave background using Three.js
   * Cleanup: Destroys effect on component unmount
   */
  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x1a237e,
          shininess: 30.0,
          waveHeight: 15.0,
          waveSpeed: 0.75,
          zoom: 0.75,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Toggle password visibility
  const handleToggle = () => setShow(!show);

  /**
   * Handle login form submission
   * - Calls login function from AuthContext with email/password
   * - Shows success toast and redirects to dashboard on success
   * - Displays error message on failure
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!', { duration: 1500 });
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center px-4 relative pt-20 pb-10 overflow-hidden"
    >
      <Toaster />

      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-10 w-full max-w-md relative z-10">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 animate-fade-in">
          Hello Again! 👋
        </h2>
        <p className="text-center text-gray-600 mb-8 animate-fade-in-delay">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none pr-10 transition-all duration-300"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute mt-6 right-3 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition duration-300"
            >
              {show ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600 font-semibold mb-2">
            Demo Credentials:
          </p>
          <p className="text-xs text-gray-600">Email: user1@example.com</p>
          <p className="text-xs text-gray-600">Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
