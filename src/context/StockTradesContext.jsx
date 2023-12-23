// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { createContext, useEffect, useReducer } from 'react';

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      const fetchData = async () => {
        const response = await fetch(
          `https://stockcheck.duckdns.org/api/v1/stocks`,
        );
        if (!response.ok) {
          throw new Error('Cannot fetch stock data');
        } else {
          const result = await response.json();
          dispatch({ type: 'STOCKS_UPDATE', payload: result });
        }
      };
      fetchData();
    }, 1000);

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
