import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addLeave, updateLeave, deleteLeave } from '../../redux/slices/leaveSlice';

export default function LeaveTable() {
  const { id: userId } = useParams();
  const user = useSelector((state) => state.user.users.find((u) => u.id === userId));
  const leaveRecords = useSelector((state) =>
    state.leave.filter((record) => record.userId === userId)
  );
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    type: 'Annual',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditMode) {
      dispatch(updateLeave({ id: formData.id, updatedData: { ...formData } }));
    } else {
      dispatch(addLeave({ userId, leaveData: formData }));
    }
    setIsModalOpen(false);
    setFormData({ id: '', type: 'Annual', startDate: '', endDate: '', reason: '' });
    setIsEditMode(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteLeave(id));
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="p-6 mb-6 bg-white border rounded-lg shadow-md">
        {user ? (
          <>
            <h2 className="mb-2 text-xl font-bold text-indigo-800">User Details</h2>
            <p className="text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </>
        ) : (
          <p className="text-red-600">User not found.</p>
        )}
      </div>

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-indigo-800">Leave Records</h1>
          
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setFormData({ id: '', type: 'Annual', startDate: '', endDate: '', reason: '' });
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500"
          >
            Add Leave
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Start Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">End Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Reason</th>
              <th className="px-4 py-3 text-sm font-semibold text-right text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaveRecords.map((record) => (
              <tr key={record.id} className="hover:bg-indigo-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.type}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.startDate}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.endDate}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.reason}</td>
                <td className="px-4 py-3 text-sm font-medium text-right">
                  <button
                    onClick={() => {
                      setFormData(record);
                      setIsModalOpen(true);
                      setIsEditMode(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold text-indigo-800">
              {isEditMode ? 'Update Leave Record' : 'Add Leave Record'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Annual">Annual</option>
                  <option value="Sick">Sick</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Paternity">Paternity</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ id: '', type: 'Annual', startDate: '', endDate: '', reason: '' });
                    setIsEditMode(false);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
                >
                  {isEditMode ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
