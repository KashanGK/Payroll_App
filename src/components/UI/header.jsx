import { useState } from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Team', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'Calendar', href: '#' },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <Disclosure as="nav" className="shadow-lg bg-gradient-to-r from-purple-100 via-white to-indigo-100">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-600 transition-colors duration-200 rounded-md hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo and navigation */}
              <div className="flex items-center justify-center flex-1 md:items-stretch md:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-8 lg:hidden"
                    src="/api/placeholder/32/32"
                    alt="Your Company"
                  />
                  <img
                    className="hidden w-auto h-8 lg:block"
                    src="/api/placeholder/64/64"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem(item.name);
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        activeItem === item.name
                          ? 'text-indigo-700 bg-purple-50'
                          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                      } transition-colors duration-200`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Notification and user menu */}
              <div className="flex items-center">
                <button className="p-1 text-gray-600 transition-colors duration-200 rounded-full hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="flex text-sm rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="/api/placeholder/32/32"
                      alt=""
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {['Your Profile', 'Settings', 'Sign out'].map((item) => (
                      <Menu.Item key={item}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm ${
                              active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600'
                            } transition-colors duration-200`}
                          >
                            {item}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    activeItem === item.name
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-indigo-50 hover:border-gray-300 hover:text-indigo-700'
                  } transition-colors duration-200`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
