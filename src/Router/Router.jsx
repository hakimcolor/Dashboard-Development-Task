import { createBrowserRouter } from 'react-router';
import SignIn from '../Pages/Singin';
import SingUP from '../Pages/SingUp';
import Root from '../Root/Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <SignIn />,
      }, {
        path: '/signup',
        element:<SingUP/>
      }
    ],
  },
]);
