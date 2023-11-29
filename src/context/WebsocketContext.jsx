// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { useEffect, useRef, createContext } from 'react';

const DOMAIN = import.meta.env.VITE_FINNHUB_WEBSOCKET_DOMAIN;
const KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const MONITOR = [
  'BINANCE:BTCUSDT',
  'NVDA',
  'AMD',
  'AAPL',
  'META',
  'COST',
  'TSLA',
  'GOOGL',
];

// Function helper to initialize the stocksRef variable.
function initStocks(monitor) {
  const result = [];

  for (let i = 0; i < monitor.length; i++) {
    result.push({
      symbol: monitor[i],
      price: 0,
      timeStamp: Date.now(),
      isUp: true,
      received: false,
      isActive: true,
    });
  }

  return result;
}

const WebsocketContext = createContext();

// Establish a websocket connection with the Finnhub API.
function WebsocketProvider({ children }) {
  const stocksRef = useRef(initStocks(MONITOR));
  const socketRef = useRef(null);
  const responseRef = useRef({});

  useEffect(() => {
    let timeoutId = null;

    // Retrieves information from stock symbols of interest.
    function retrieveStocks() {
      console.log('WebSocket connection opened');
      const socket = socketRef.current;
      const stocks = stocksRef.current;

      if (socket && socket.readyState === WebSocket.OPEN) {
        for (let i = 0; i < stocks.length; i++) {
          socket.send(
            JSON.stringify({
              type: 'subscribe',
              symbol: stocks[i].symbol,
            }),
          );
        }
      }
    }

    // Parses the incoming finnhub API data.
    function parseData(event) {
      const { data, type } = JSON.parse(event.data);
      if (type === 'ping') return;
      if (data === undefined) {
        socketRef.current.close();
        timeoutId = setTimeout(() => initSocket, 5000);
        return;
      }

      const trades = {};
      for (let trade of data) {
        const {
          p: price,
          s: symbol,
          t: timeStamp,
          isUp = true,
          received = true,
        } = trade;

        if (symbol in trades) {
          if (timeStamp >= trades[symbol].timeStamp) {
            trades[symbol] = { symbol, price, timeStamp, isUp, received };
          }
        } else {
          trades[symbol] = { symbol, price, timeStamp, isUp, received };
        }
      }

      responseRef.current = trades;
    }

    // Closes the websocket and reconnects.
    function closeAndReconnectSocket() {
      const socket = socketRef.current;
      if (socket && socket.readyState === 3) {
        console.log('WebSocket connection closed');
        socketRef.current = null;
        timeoutId = setTimeout(() => initSocket(), 5000);
      }
    }

    // WebSocket event listeners
    function initSocket() {
      socketRef.current = new WebSocket(`${DOMAIN}?token=${KEY}`);
      socketRef.current.onopen = retrieveStocks;
      socketRef.current.onmessage = parseData;
      socketRef.current.onclose = closeAndReconnectSocket;
    }

    initSocket();

    // Clean up the websocket connection when the component unmounts
    return () => {
      const socket = socketRef.current;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }

      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <WebsocketContext.Provider value={{ stocksRef, responseRef, socketRef }}>
      {children}
    </WebsocketContext.Provider>
  );
}

export { WebsocketProvider, WebsocketContext };
