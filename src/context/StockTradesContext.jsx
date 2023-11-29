// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { createContext, useContext, useEffect, useState } from 'react';
import { WebsocketContext } from './WebsocketContext';

/*
If the new stock data price is up, set stock isUp
property to true. Vice versa if the stock is down.
No changes if the price is the same.
*/
function compareTrades(currTrade, resTrade) {
  let isUp = currTrade.isUp;

  const priceOne = parseInt(currTrade.price * 100);
  const priceTwo = parseInt(resTrade.price * 100);

  if (priceTwo > priceOne) isUp = true;
  else if (priceTwo < priceOne) isUp = false;

  return isUp;
}

const StockTradesContext = createContext();

/*
  setInterval will run this algorithm every second.
  This function will update all stock data the user
  is interested in monitoring.
*/
function StockTradesProvider({ children }) {
  const { stocksRef, responseRef } = useContext(WebsocketContext);
  const [stocks, setStocks] = useState(stocksRef.current);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const currStocks = stocksRef.current;
      const trades = responseRef.current;

      for (let i = 0; i < currStocks.length; i++) {
        if (currStocks[i].symbol in trades) {
          currStocks[i].isUp = compareTrades(
            currStocks[i],
            trades[currStocks[i].symbol],
          );
          currStocks[i].price = trades[currStocks[i].symbol].price;
          currStocks[i].timeStamp = trades[currStocks[i].symbol].timeStamp;
          currStocks[i].received = true;
          delete trades[currStocks[i].symbol];
        }
      }

      const newTrades = Object.values(trades);

      stocksRef.current = [...currStocks, ...newTrades];
      setStocks(stocksRef.current);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <StockTradesContext.Provider value={{ stocks, setStocks }}>
      {children}
    </StockTradesContext.Provider>
  );
}

export { StockTradesProvider, StockTradesContext };
