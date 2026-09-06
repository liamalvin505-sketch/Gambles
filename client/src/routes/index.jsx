import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AllInOneCasino from '../components/AllInOneCasino';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllInOneCasino />,
  },
  {
    path: "*",
    element: <AllInOneCasino />,
  }
]);

export default router;
