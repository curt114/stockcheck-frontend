import { createContext, useReducer } from 'react';

const StockWatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'STOCK_DELETE':
      return state.filter((stock) => stock !== action.payload);
    case 'STOCK_ADD':
      return [...new Set([...state, action.payload])];
    default:
      return state;
  }
};

const initialState = [
  'BINANCE:BTCUSDT',
  'NVDA',
  'AMD',
  'AAPL',
  'META',
  'COST',
  'TSLA',
  'GOOGL',
];

function StockWatchProvider({ children }) {
  const [stocksWatch, dispatch] = useReducer(reducer, initialState);

  return (
    <StockWatchContext.Provider value={{ stocksWatch, dispatch }}>
      {children}
    </StockWatchContext.Provider>
  );
}

export { StockWatchProvider, StockWatchContext };
