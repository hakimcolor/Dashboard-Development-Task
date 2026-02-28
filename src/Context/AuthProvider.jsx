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
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Mock authentication - simulating JWT token-based auth
      // In production, this would call: POST https://task-api-eight-flax.vercel.app/api/login
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

      // Generate mock JWT token
      const token = btoa(
        JSON.stringify({ email, id: validUser.id, timestamp: Date.now() })
      );
      const userData = { id: validUser.id, email };

      // Store token and user data (simulating JWT storage)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Try to save user data to API (will fail if API is read-only)
      try {
        await axios.post('https://task-api-eight-flax.vercel.app/api/users', {
          name: email.split('@')[0],
          email: email,
          password: password,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
        });
        console.log('User data saved to API successfully');
      } catch (apiError) {
        console.log('API is read-only, user data saved locally only');
        // Save to localStorage as backup
        const localUsers = JSON.parse(
          localStorage.getItem('localUsers') || '[]'
        );
        const newUser = {
          id: Date.now(),
          name: email.split('@')[0],
          email: email,
          password: password,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0],
        };
        localUsers.push(newUser);
        localStorage.setItem('localUsers', JSON.stringify(localUsers));
      }

      setUser(userData);
      return { token, ...userData };
    } catch (error) {
      throw error;
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
