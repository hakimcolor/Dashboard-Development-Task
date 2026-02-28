/**
 * AuthContext
 *
 * React Context for authentication state management.
 * Provides authentication data and functions throughout the application.
 *
 * Context Values (provided by AuthProvider):
 * - user: Current authenticated user object (contains id, email, token)
 * - loading: Boolean indicating if auth state is being checked
 * - login: Function to authenticate user with email/password
 * - logout: Function to clear authentication and redirect to login
 *
 * Usage:
 * Import and use with useContext hook:
 * const { user, login, logout } = useContext(AuthContext);
 */

import { createContext } from 'react';

// Create context with null as default value
export const AuthContext = createContext(null);
