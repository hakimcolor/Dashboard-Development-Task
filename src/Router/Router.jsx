// Route configuration with protected routes
import { createBrowserRouter } from 'react-router';
import SignIn from '../Pages/Singin';
import Root from '../Root/Root';
import Dashboard from '../Pages/Dashboard';
import Users from '../Pages/Users';
import Analytics from '../Pages/Analytics';
import Products from '../Pages/Products';
import NotFound from '../Pages/NotFound';
import PrivateRouter from './PriveteRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
      },
      {
        path: '/users',
        element: (
          <PrivateRouter>
            <Users />
          </PrivateRouter>
        ),
      },
      {
        path: '/analytics',
        element: (
          <PrivateRouter>
            <Analytics />
          </PrivateRouter>
        ),
      },
      {
        path: '/products',
        element: (
          <PrivateRouter>
            <Products />
          </PrivateRouter>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
