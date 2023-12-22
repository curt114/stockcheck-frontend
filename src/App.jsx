// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Objectives from './pages/Objectives';
import About from './pages/About';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import { StockTradesProvider } from './context/StockTradesContext';
import NotFound from './pages/NotFound';
import { StockWatchProvider } from './context/StockWatchContext';

// Routes to different pages in the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'objectives', element: <Objectives /> },
      { path: 'about-me', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <StockWatchProvider>
      <StockTradesProvider>
        <RouterProvider router={router} />
      </StockTradesProvider>
    </StockWatchProvider>
  );
}

export default App;
