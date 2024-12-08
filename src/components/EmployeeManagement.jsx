import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser } from '../../redux/slices/user.js';
import ActionDropdown from '../components/UI/ActionDropdown.jsx';

export default function EmployeeManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    role: '',
  });
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(editUser(formData));
    } else {
      dispatch(addUser(formData));
    }
    setFormData({ name: '', email: '', title: '', role: '' });
    setIsOpen(false);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsOpen(true);
    setEditMode(true);
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-indigo-800">Employee Management</h1>
          
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setIsOpen(true);
              setEditMode(false);
            }}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="flow-root mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border divide-y divide-gray-200 rounded-lg shadow-md">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Title</th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Role</th>
                <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="transition-colors duration-200 hover:bg-indigo-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.role}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="ml-4 mr-4 text-red-600 mr hover:text-red-900"
                    >
                      Delete
                    </button>
                    <ActionDropdown userId={user.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md px-6 py-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900">
              {editMode ? 'Edit User' : 'Add New User'}
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
                >
                  {editMode ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
