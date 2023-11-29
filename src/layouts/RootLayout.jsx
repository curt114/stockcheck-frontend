// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useContext, useState } from 'react';
import { StockListContext } from '../context/StockListContext';

// Heroicon StockCheck logo
const logoIcon =
  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z';

// Navigation tabs
const categories = [
  { name: 'About', path: '/about-me' },
  { name: 'Objectives', path: '/objectives' },
  { name: 'Dashboard', path: '/' },
];

// Layout for the StockCheck application
export default function RootLayout() {
  const { error } = useContext(StockListContext);
  const [activeTab, setActiveTab] = useState(
    categories.length > 0 ? categories[categories.length - 1].name : '',
  );

  const placeholder = error ? 'Unable to load stock data.' : 'Stock Search...';

  function handleActiveTab(name) {
    setActiveTab(name);
  }

  return (
    <main>
      <Navigation categories={categories}>
        <Navigation.Logo icon={logoIcon} handleActiveTab={handleActiveTab}>
          StockCheck
        </Navigation.Logo>
        <Navigation.ToggleMenuIcon />
        <Navigation.Menu>
          {activeTab === 'Dashboard' &&
            (!error ? (
              <Navigation.Menu.Search placeholder={placeholder} />
            ) : (
              <Navigation.Menu.Search placeholder={placeholder} />
            ))}
          <Navigation.Menu.Tabs
            activeTab={activeTab}
            handleActiveTab={handleActiveTab}
            categories={categories}
          />
        </Navigation.Menu>
      </Navigation>

      <Outlet />
    </main>
  );
}
