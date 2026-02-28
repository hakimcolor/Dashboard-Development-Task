import { createBrowserRouter } from 'react-router';
import SignIn from '../Pages/Singin';
import Root from '../Root/Root';
import Dashboard from '../Pages/Dashboard';
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
    ],
  },
]);
