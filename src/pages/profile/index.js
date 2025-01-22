import User from './User';
import Account from './account/index';
import Identity from './identity/index';
import Security from './security/index';

import Layout from '../../components/layout/dashboard';

const tabs = [
  { name: 'Información Personal', href: '/profile', current: true },
  { name: 'Información de Cuenta', href: '/profile/account', current: false },
  { name: 'Seguridad', href: '/profile/security', current: false },
  { name: 'FTMO Identity', href: '/profile/identity', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Index() {
  const currentTab = tabs.find((tab) => tab.current);

  return (
    <Layout title="Perfil" NoTab={true}>
      <div className="space-y-6">
        {/* Tabs Component */}
        <div className='p-6 dark:bg-zinc-800 border-gray-200  border-2  bg-white shadow-md rounded-lg dark:text-white dark:border-zinc-800 dark:shadow-black'>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue={currentTab.name}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.href}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Conditionally Rendered Components Based on Active Tab */}
        <div className="mt-6">
          {currentTab.name === 'Información Personal' && <User />}
          {currentTab.name === 'Información de Cuenta' && <Account />}
          {currentTab.name === 'Seguridad' && <Security />}
          {currentTab.name === 'FTMO Identity' && <Identity />}
        </div>
      </div>
    </Layout>
  );
}

export default Index;
