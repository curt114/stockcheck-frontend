// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================
import { createContext, useEffect, useState } from 'react';

const StockListContext = createContext();
const KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_API_PATH = import.meta.env.VITE_FINNHUB_API_US_STOCKS_PATH;

// Retrieve US stocks from Finnhub API
function StockListProvider({ children }) {
  const [stockList, setStockList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = `${BASE_API_PATH}/stock/symbol?exchange=US&token=${KEY}`;

  // Refresh data if not able to access Finnhub API
  function handleRefreshData() {
    setError(false);
    setRefreshData(!refreshData);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url);

        if (!response.ok) throw new Error('Cannot fetch the data');

        const result = await response.json();

        setStockList(result);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [refreshData]);

  return (
    <StockListContext.Provider
      value={{ stockList, isLoading, error, handleRefreshData }}
    >
      {children}
    </StockListContext.Provider>
  );
}

export { StockListProvider, StockListContext };
