// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { StockWatchContext } from '../context/StockWatchContext';

// Parent context
const NavContext = createContext();

// =========================================================
// NAVIGATION PARENT COMPONENT
// =========================================================

function Navigation({ children }) {
  const [toggleMenuIcon, setToggleMenuIcon] = useState(false);

  function handleToggleMenuIcon() {
    setToggleMenuIcon((toggleMenuIcon) => !toggleMenuIcon);
  }

  return (
    <NavContext.Provider
      value={{
        toggleMenuIcon,
        handleToggleMenuIcon,
      }}
    >
      <nav className="sticky top-0 min-h-[68px] bg-slate-800 py-3">
        <div className="mx-auto grid min-h-[44px] grid-cols-2 gap-3 md:container md:grid-cols-3">
          {children}
        </div>
      </nav>
    </NavContext.Provider>
  );
}

// =========================================================
// LOGO NAVIGATION CHILD COMPONENT
// =========================================================

function Logo({ icon, handleActiveTab, children }) {
  return (
    <NavLink
      to="/"
      onClick={() => handleActiveTab('Dashboard')}
      className="flex items-center gap-1 justify-self-start pl-3 font-['Lobster'] text-xl text-violet-400 hover:text-violet-300"
    >
      <span className="">
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
      </span>

      <p href="#">{children}</p>
    </NavLink>
  );
}

// =========================================================
// MENU ICON NAVIGATION CHILD COMPONENT
// =========================================================

// React component
function ToggleMenuIcon() {
  const { toggleMenuIcon, handleToggleMenuIcon } = useContext(NavContext);

  // Heroicons
  const barIcon = 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5';
  const closeIcon = 'M6 18L18 6M6 6l12 12';

  return (
    <button
      className="justify-self-end pr-3 text-violet-400 md:hidden"
      onClick={handleToggleMenuIcon}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={toggleMenuIcon ? closeIcon : barIcon}
        />
      </svg>
    </button>
  );
}

// =========================================================
// MENU NAVIGATION CHILD COMPONENT
// =========================================================

function Menu({ children }) {
  const { toggleMenuIcon } = useContext(NavContext);

  return (
    <div
      className={
        toggleMenuIcon
          ? 'absolute top-full grid w-full grid-cols-1 gap-3 bg-slate-800 px-3 pb-3 md:static md:top-0 md:col-span-2 md:grid-cols-2 md:items-center md:px-0 md:pb-0'
          : 'hidden md:static md:col-span-2 md:grid md:grid-cols-2 md:items-center'
      }
    >
      {children}
    </div>
  );
}

// =========================================================
// SEARCH MENU CHILD COMPONENT
// =========================================================

function Search({ placeholder }) {
  const [list, setList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const { stocksWatch, dispatch } = useContext(StockWatchContext);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const inputFocusedRef = useRef(false);
  const stockListRef = useRef([]);
  const maxIterations = 100;

  const fetchData = async (symbol) => {
    const response = await fetch(
      `http://stockcheck.duckdns.org/api/v1/stocks/watch`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol: symbol }),
      },
    );
    if (!response.ok) throw new Error('Cannot post stock data');
    const result = await response.json();
    console.log(result);
  };

  const handleStockClicked = (symbol) => {
    const found = stocksWatch.find((stock) => stock === symbol);
    dispatch({ type: 'STOCK_ADD', payload: symbol });
    if (!found) {
      fetchData(symbol);
    }
    setShowMenu(false);
    inputRef.current.value = '';
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !inputFocusedRef.current
    ) {
      setShowMenu(false);
    }
  };

  function handleInputChange(e) {
    const value = e.target.value.split('');
    const userInput = value.map((letter) => letter.toUpperCase()).join('');
    const result = stockListRef.current.filter(
      (stock) =>
        stock.displaySymbol.startsWith(userInput) ||
        stock.description.startsWith(userInput),
    );

    result.length > 0 && value.length > 0
      ? setShowMenu(true)
      : setShowMenu(false);
    setList(result);
  }

  function handleInputOnFocus(e) {
    if (e.target.value.length > 0) {
      inputFocusedRef.current = true;
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  function handleInputOnBlur() {
    inputFocusedRef.current = false;
  }

  // Heroicons
  const searchIcon =
    'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z';
  // const refreshIcon =
  //   'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://24.1.70.197:80/api/v1/stocks/us');
      if (!response.ok) throw new Error('Cannot fetch stock data');
      const result = await response.json();
      if (result) stockListRef.current = result;
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col">
      <div className="flex rounded-full border-2 border-gray-800 text-gray-500 md:col-start-1 md:col-end-2 md:w-10/12 md:justify-self-start lg:w-full">
        <label
          htmlFor="mySearch"
          className={'rounded-l-full bg-white px-2 py-2'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={searchIcon} />
          </svg>
        </label>

        <input
          type="text"
          id="mySearch"
          placeholder={placeholder}
          onFocus={handleInputOnFocus}
          onBlur={handleInputOnBlur}
          onChange={handleInputChange}
          ref={inputRef}
          autoComplete="off"
          className="w-full rounded-r-full py-2 pl-2 transition-all duration-300 placeholder:text-inherit focus:outline-none disabled:bg-white"
        />
      </div>
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-12 max-h-52 w-full overflow-y-scroll rounded border border-slate-700 bg-slate-800 text-slate-100   scrollbar scrollbar-track-slate-800 scrollbar-thumb-violet-500 md:max-h-72"
        >
          <ul>
            {list.slice(0, maxIterations).map((stock, index) => (
              <li
                key={index}
                onClick={() => handleStockClicked(stock.displaySymbol)}
                className="grid cursor-pointer grid-cols-4 rounded border-b border-slate-700  px-3 py-2 hover:bg-gray-700"
              >
                <span className="col-span-3 text-sm">{stock.description}</span>
                <span className="col-span-1 self-end justify-self-end text-xs font-bold">
                  {stock.displaySymbol}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// =========================================================
// TABS MENU CHILD COMPONENT
// =========================================================
function Tabs({ activeTab, handleActiveTab, categories }) {
  const tabs = categories.map((item) => (
    <li key={item.name} onClick={() => handleActiveTab(item.name)}>
      <NavLink
        to={`${item.path}`}
        className={
          activeTab === item.name
            ? 'block rounded border-b-2 border-violet-400 text-violet-400 transition-colors duration-300 hover:text-violet-400'
            : 'block rounded border-b-2 border-transparent transition-colors duration-300 hover:text-violet-400'
        }
      >
        {item.name}
      </NavLink>
    </li>
  ));

  return (
    <ul className="flex flex-col gap-4 text-center text-gray-200 md:col-start-2 md:col-end-3 md:flex-row md:justify-self-end md:pr-3">
      {tabs}
    </ul>
  );
}

// =========================================================
// CHILD COMPONENTS AS PROPERTIES TO PARENT COMPONENTS
// =========================================================

Navigation.Logo = Logo;
Navigation.ToggleMenuIcon = ToggleMenuIcon;
Navigation.Menu = Menu;
Navigation.Menu.Search = Search;
Navigation.Menu.Tabs = Tabs;

// =========================================================
// EXPORT NAVIGATION COMPONENT
// =========================================================
export default Navigation;
