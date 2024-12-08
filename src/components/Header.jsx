import { Disclosure, Menu } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import homeIcon from "../assets/home.png";
import userAvatar from "../assets/user.png";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <Disclosure
      as="nav"
      className="text-white shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600"
    >
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center mr-2 -ml-2 md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link to="/">
                  <img className="w-auto h-8" src={homeIcon} alt="Home" />
                </Link>
              </div>

              <div className="flex items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={userAvatar}
                        alt="User Avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`block w-full px-4 py-2 text-sm text-gray-700 text-left ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-indigo-700 focus:bg-indigo-800"
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-indigo-700 focus:bg-indigo-800"
              >
                Settings
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
