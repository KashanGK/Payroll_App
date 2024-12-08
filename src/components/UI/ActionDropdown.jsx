import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';


export default function ActionDropdown({ userId }) {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-center p-2 text-gray-600 rounded-full shadow-md bg-gradient-to-br from-purple-200 via-white to-indigo-200 hover:from-purple-300 hover:to-indigo-300 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
        </Menu.Button>
      </div>

     
      <Menu.Items
        className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        style={{
          maxHeight: 'calc(100vh - 20px)', 
          overflowY: 'auto', 
        }}
      >
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate(`/attendance/${userId}`)}
                className={`${
                  active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                } flex items-center px-4 py-2 text-sm w-full text-left transition-colors duration-150 ease-in-out`}
              >
                View Attendance
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate(`/salary/${userId}`)}
                className={`${
                  active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                } flex items-center px-4 py-2 text-sm w-full text-left transition-colors duration-150 ease-in-out`}
              >
                View Salary
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate(`/tax/${userId}`)}
                className={`${
                  active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                } flex items-center px-4 py-2 text-sm w-full text-left transition-colors duration-150 ease-in-out`}
              >
                View Tax
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate(`/leaves/${userId}`)}
                className={`${
                  active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                } flex items-center px-4 py-2 text-sm w-full text-left transition-colors duration-150 ease-in-out`}
              >
                View Leaves
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
