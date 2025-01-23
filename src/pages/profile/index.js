import { useState, useEffect } from 'react';
import Layout from '../../components/layout/dashboard';
import User from '../../pages/profile/User';
import Link from 'next/link';
const tabs = [
  { name: 'Información Personal', href: '/profile', current: false },
  { name: 'Información de Cuenta', href: '/profile/account', current: false },
  { name: 'Seguridad', href: '/profile/security', current: false },
  { name: 'FTMO Identity', href: '/profile/identity', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


function Index({ children }) {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const currentPath = window.location.pathname;
    const selectedTab = tabs.find((tab) => tab.href === currentPath);
    if (selectedTab) {
      setCurrentTab(selectedTab);
    }
  }, []); 

  if (!isClient) {
    return null;
  }

   // Función para manejar el cambio de pestaña en el select
   const handleTabClick = (tab) => {
    setCurrentTab(tab); // Cambiar la pestaña activa
  };

  return (
    <Layout title="Perfil" NoTab={true}>
      {/* Tabs */}
      <div className="p-6 dark:bg-zinc-800 border-gray-200 border-2 shadow-md rounded-lg dark:text-white dark:border-zinc-800 dark:shadow-black">
        {/* Mobile View */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block dark:bg-zinc-800 w-full rounded-md border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            value={currentTab.name}
            onChange={(e) => handleTabClick(tabs.find((tab) => tab.name === e.target.value))}
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
  <div className="border-b border-gray-200">
    <nav className="-mb-px flex justify-between" aria-label="Tabs">
      {tabs.map((tab) => (
        <Link key={tab.name} href={tab.href} passHref>
          <button
            onClick={() => setCurrentTab(tab)} // Cambiar la pestaña activa
            className={classNames(
              tab.href === currentTab.href
                ? 'text-amber-500 relative'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'w-full px-11 py-4 h-16 text-center text-sm font-medium'
            )}
          >
            {tab.name}
            {tab.href === currentTab.href && (
              <span className="absolute  bottom-0 left-0 w-full h-1 bg-amber-400"></span> // Custom bottom border
            )}
          </button>
        </Link>
      ))}
    </nav>
  </div>
</div>

      </div>

      {/* Tab content */}
      <div className="tab-content pt-5">
        {window.location.pathname === '/profile' ? <User /> : children}
      </div>
    </Layout>
  );
}


export default Index;
