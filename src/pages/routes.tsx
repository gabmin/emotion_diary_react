import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import New from './New';
import Dairy from './Diary';
import NotFound from './NotFound';
import Edit from './Edit';
import Home from './Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/new',
    element: <New />,
  },
  {
    path: '/diary/:id',
    element: <Dairy />,
  },
  {
    path: '/edit/:id',
    element: <Edit />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
