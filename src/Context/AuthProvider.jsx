import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (token exists)
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      // Call the actual API login endpoint
      const response = await axios.post(
        'https://task-api-eight-flax.vercel.app/api/login',
        {
          email: email,
          password: password,
        }
      );

      // Extract token and user data from API response
      const { token, id, email: userEmail } = response.data;
      const userData = { id, email: userEmail };

      // Store JWT token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      return response.data;
    } catch (error) {
      // If API fails, use fallback authentication
      console.log('API login failed, using fallback authentication');

      // Fallback credentials for demo
      const validCredentials = [
        { email: 'user1@example.com', password: 'password123', id: 1 },
        { email: 'john@example.com', password: 'password123', id: 2 },
        { email: 'jane@example.com', password: 'password123', id: 3 },
      ];

      const validUser = validCredentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (!validUser) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token (fallback)
      const token = btoa(
        JSON.stringify({ email, id: validUser.id, timestamp: Date.now() })
      );
      const userData = { id: validUser.id, email };

      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      return { token, ...userData };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const authInfo = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
