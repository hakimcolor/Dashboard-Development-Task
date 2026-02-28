/**
 * PrivateRouter Component
 *
 * Protected route wrapper that ensures only authenticated users can access certain pages.
 * Features:
 * - Checks if user is authenticated via AuthContext
 * - Shows loading spinner while checking authentication status
 * - Redirects to login page if user is not authenticated
 * - Renders protected content if user is authenticated
 *
 * Usage:
 * Wrap any route that requires authentication with this component:
 * <PrivateRouter><Dashboard /></PrivateRouter>
 */

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRouter = ({ children }) => {
  // Get user and loading state from AuthContext
  const { user, loading } = useContext(AuthContext);

  /**
   * Loading state: Show spinner while checking authentication
   * Prevents flash of redirect during initial auth check
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  /**
   * Authenticated: Render protected content
   * User is logged in, show the requested page
   */
  if (user) {
    return children;
  }

  /**
   * Not authenticated: Redirect to login page
   * User is not logged in, redirect to home/login page
   */
  return <Navigate to="/" />;
};

export default PrivateRouter;
