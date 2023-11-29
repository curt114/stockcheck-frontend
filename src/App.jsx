// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StockListProvider } from './context/StockListContext';
import { WebsocketProvider } from './context/WebsocketContext';
import Objectives from './pages/Objectives';
import About from './pages/About';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import { StockTradesProvider } from './context/StockTradesContext';
import NotFound from './pages/NotFound';

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
    <WebsocketProvider>
      <StockTradesProvider>
        <StockListProvider>
          <RouterProvider router={router} />
        </StockListProvider>
      </StockTradesProvider>
    </WebsocketProvider>
  );
}

export default App;
