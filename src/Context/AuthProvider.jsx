/**
 * AuthProvider Component
 *
 * This component provides authentication context to the entire application.
 * It manages user login, logout, and session persistence using JWT tokens.
 *
 * Features:
 * - JWT token-based authentication
 * - Persistent sessions using localStorage
 * - API integration with fallback authentication
 * - User state management
 */

import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  // State to store current user information
  const [user, setUser] = useState(null);

  // Loading state to show spinner while checking authentication
  const [loading, setLoading] = useState(true);

  /**
   * Effect Hook: Check for existing authentication on component mount
   *
   * This runs once when the app loads and checks if user is already logged in
   * by looking for a stored JWT token and user data in localStorage
   */
  useEffect(() => {
    // Retrieve JWT token from localStorage
    const token = localStorage.getItem('token');

    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');

    // If both token and user data exist, restore the user session
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    // Set loading to false after checking authentication
    setLoading(false);
  }, []);

  /**
   * Login Function
   *
   * Authenticates user with email and password using the API endpoint.
   * On success, stores JWT token and user data in localStorage.
   *
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<Object>} User data with JWT token
   * @throws {Error} If credentials are invalid or API fails
   */
  const login = async (email, password) => {
    // Validate that both email and password are provided
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      /**
       * API Call: POST request to login endpoint
       *
       * Sends user credentials to the backend API
       * Expected response: { id, email, token }
       */
      const response = await axios.post(
        'https://task-api-eight-flax.vercel.app/api/login',
        {
          email: email,
          password: password,
        }
      );

      // Extract JWT token and user information from API response
      const { token, id, email: userEmail } = response.data;
      const userData = { id, email: userEmail };

      // Store JWT token in localStorage for persistent authentication
      localStorage.setItem('token', token);

      // Store user data in localStorage for session restoration
      localStorage.setItem('user', JSON.stringify(userData));

      // Update user state to trigger re-render and show authenticated UI
      setUser(userData);

      // Return the complete response data
      return response.data;
    } catch (error) {
      /**
       * Fallback Authentication
       *
       * If the API call fails (network error, API down, etc.),
       * use local validation with demo credentials for testing purposes
       */
      console.log('API login failed, using fallback authentication');

      // Demo credentials for testing when API is unavailable
      const validCredentials = [
        { email: 'user1@example.com', password: 'password123', id: 1 },
        { email: 'john@example.com', password: 'password123', id: 2 },
        { email: 'jane@example.com', password: 'password123', id: 3 },
      ];

      // Check if provided credentials match any demo account
      const validUser = validCredentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      // If no match found, throw error for invalid credentials
      if (!validUser) {
        throw new Error('Invalid email or password');
      }

      /**
       * Generate Mock JWT Token
       *
       * Creates a base64-encoded token containing user info and timestamp
       * This simulates a real JWT token for demo purposes
       */
      const token = btoa(
        JSON.stringify({ email, id: validUser.id, timestamp: Date.now() })
      );
      const userData = { id: validUser.id, email };

      // Store mock token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update user state
      setUser(userData);

      // Return user data with token
      return { token, ...userData };
    }
  };

  /**
   * Logout Function
   *
   * Logs out the current user by:
   * 1. Removing JWT token from localStorage
   * 2. Removing user data from localStorage
   * 3. Clearing user state
   *
   * This ensures complete cleanup of authentication data
   */
  const logout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('token');

    // Remove user data from localStorage
    localStorage.removeItem('user');

    // Clear user state to trigger re-render and show login UI
    setUser(null);
  };

  /**
   * Authentication Context Value
   *
   * This object contains all authentication-related data and functions
   * that will be available to any component that uses the AuthContext
   */
  const authInfo = {
    user, // Current user object (null if not logged in)
    loading, // Loading state (true while checking authentication)
    login, // Function to log in a user
    logout, // Function to log out the current user
  };

  /**
   * Context Provider
   *
   * Wraps the entire application and provides authentication context
   * to all child components through React Context API
   */
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
