// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { createContext, useEffect, useReducer } from 'react';

// stocks state event handlers
const reducer = (state, action) => {
  switch (action.type) {
    case 'STOCKS_UPDATE':
      return { ...action.payload };
    default:
      return state;
  }
};

const StockTradesContext = createContext();

function StockTradesProvider({ children }) {
  const [stocks, dispatch] = useReducer(reducer, {});

  // Retrieve the updated stock trades data from the node.js server
  useEffect(() => {
    const timer = window.setInterval(() => {
      const fetchData = async () => {
        const response = await fetch(`/api/stocks`);
        if (!response.ok) {
          throw new Error('Cannot fetch stock data');
        } else {
          const result = await response.json();
          dispatch({ type: 'STOCKS_UPDATE', payload: result });
        }
      };
      fetchData();
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <StockTradesContext.Provider value={{ stocks, dispatch }}>
      {children}
    </StockTradesContext.Provider>
  );
}

export { StockTradesProvider, StockTradesContext };
