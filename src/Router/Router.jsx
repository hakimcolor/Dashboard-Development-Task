/**
 * Router Configuration
 *
 * Defines all application routes using React Router.
 *
 * Route Structure:
 * - / (index): SignIn page - Public route for login
 * - /dashboard: Dashboard page - Protected route showing overview stats
 * - /users: Users page - Protected route showing user list
 * - /analytics: Analytics page - Protected route showing analytics data
 * - /products: Products page - Protected route showing product catalog
 *
 * Protected Routes:
 * All routes except login are wrapped with PrivateRouter component
 * which redirects unauthenticated users to the login page.
 */

import { createBrowserRouter } from 'react-router';
import SignIn from '../Pages/Singin';
import Root from '../Root/Root';
import Dashboard from '../Pages/Dashboard';
import Users from '../Pages/Users';
import Analytics from '../Pages/Analytics';
import Products from '../Pages/Products';
import PrivateRouter from './PriveteRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // Root layout component
    children: [
      {
        index: true, // Default route: Login page
        element: <SignIn />,
      },
      {
        path: '/dashboard', // Protected: Dashboard overview
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
      {
        path: '/users', // Protected: Users management
        element: (
          <PrivateRouter>
            <Users />
          </PrivateRouter>
        ),
      },
      {
        path: '/analytics', // Protected: Analytics reports
        element: (
          <PrivateRouter>
            <Analytics />
          </PrivateRouter>
        ),
      },
      {
        path: '/products', // Protected: Product catalog
        element: (
          <PrivateRouter>
            <Products />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
