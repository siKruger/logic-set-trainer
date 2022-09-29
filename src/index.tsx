import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import Truthtable from './truthtable';
import Layout from './webapp/Layout';
import Landingpage from './webapp/Landingpage';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Landingpage />,
      },
      {
        path: '/truthtable',
        element: <Truthtable />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
