// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { createContext, useContext, useRef } from 'react';
import { StockTradesContext } from '../context/StockTradesContext';
import { StockWatchContext } from '../context/StockWatchContext';

function comparePrices(prevPrice, currPrice, isUp) {
  const previousPrice = parseInt(prevPrice * 100);
  const currentPrice = parseInt(currPrice * 100);

  if (currentPrice > previousPrice) return true;
  if (currentPrice < previousPrice) return false;
  return isUp;
}

// Parent Context
const CardContext = createContext();

// =========================================================
// STOCK CARD PARENT COMPONENT
// =========================================================
function Card({ stockWatch, timestamp, children }) {
  const { stocks } = useContext(StockTradesContext);
  const isUpRef = useRef(true);
  const previousPriceRef = useRef(0.0);
  const currentPriceRef = useRef(0.0);

  currentPriceRef.current = stocks[stockWatch]
    ? parseFloat(stocks[stockWatch].price)
    : 0.0;

  isUpRef.current = comparePrices(
    previousPriceRef.current,
    currentPriceRef.current,
    isUpRef.current,
  );

  const stock = {
    symbol: stockWatch,
    price: currentPriceRef.current,
    timestamp: stocks[stockWatch] ? stocks[stockWatch].timestamp : timestamp,
    isActive: true,
    isUp: isUpRef.current,
    received: stocks[stockWatch] ? true : false,
  };

  previousPriceRef.current = currentPriceRef.current;

  let styles = 'mb-3 rounded bg-slate-600 text-slate-100';

  if (stock.received && stock.isUp)
    styles = 'mb-3 rounded bg-green-600 text-green-100';
  if (stock.received && stock.isUp === false)
    styles = 'mb-3 rounded bg-red-600 text-red-100';

  return (
    <CardContext.Provider value={{ stock }}>
      {stock.isActive && <div className={styles}>{children}</div>}
    </CardContext.Provider>
  );
}

// =========================================================
// STOCK CARD HEADER CHILD COMPONENT
// =========================================================
function Header({ children }) {
  return (
    <div className="grid grid-cols-[40px_auto_40px] items-center p-3">
      {children}
    </div>
  );
}

// =========================================================
// STOCK CARD LAST TRADE ARROW DIRECTION CHILD COMPONENT
// =========================================================
function StockArrow() {
  const { stock } = useContext(CardContext);

  let icon =
    'M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z';
  const arrowUpIcon = 'M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18';
  const arrowDownIcon = 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3';

  if (stock.received && stock.isUp) icon = arrowUpIcon;
  if (stock.received && stock.isUp === false) icon = arrowDownIcon;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
    </svg>
  );
}

// =========================================================
// STOCK CARD TIMESTAMP CHILD COMPONENT
// =========================================================
function Timestamp() {
  const { stock } = useContext(CardContext);
  const date = new Date(stock.timestamp);

  const locale = 'en-US';

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  const timestamp = new Intl.DateTimeFormat(locale, options).format(date);
  const [formattedDate, formattedTime] = timestamp
    .split('at')
    .map((item) => item.trim());

  return (
    <div className="flex flex-col">
      <div className="text-xs">{formattedDate}</div>
      <div className="text-sm">{formattedTime}</div>
    </div>
  );
}

// =========================================================
// STOCK CARD CLOSE CHILD COMPONENT
// =========================================================
function Close() {
  const { stock } = useContext(CardContext);
  const { dispatch } = useContext(StockWatchContext);

  function handleCloseStock() {
    dispatch({ type: 'STOCK_DELETE', payload: stock.symbol });
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 cursor-pointer justify-self-end"
      onClick={handleCloseStock}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

// =========================================================
// STOCK CARD UNDERLINE CHILD COMPONENT
// =========================================================
function Underline() {
  return <div className="mx-auto w-11/12 border-b"></div>;
}

// =========================================================
// STOCK CARD BODY CHILD COMPONENT
// =========================================================
function Body() {
  const { stock } = useContext(CardContext);
  return (
    <div className="flex flex-col items-center gap-2 py-7">
      <div className="text-xl font-light">{`${stock.symbol}`}</div>
      <div className="text-3xl font-bold">{`$${stock.price.toFixed(2)}`}</div>
    </div>
  );
}

// =========================================================
// CHILD COMPONENTS AS PROPERTIES TO PARENT COMPONENTS
// =========================================================
Card.Header = Header;
Card.StockArrow = StockArrow;
Card.Timestamp = Timestamp;
Card.Close = Close;
Card.Underline = Underline;
Card.Body = Body;

export default Card;
