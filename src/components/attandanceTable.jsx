import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAttendance, updateAttendance, deleteAttendance } from '../../redux/slices/attendanceSlice';

export default function AttendanceTable() {
  const { id: userId } = useParams();
  const user = useSelector((state) => state.user.users.find((u) => u.id === userId));
  const attendanceRecords = useSelector((state) =>
    state.attendance.filter((record) => record.userId === userId)
  );
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    status: 'Present',
    hours: '',
    timeIn: '',
    timeOut: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditMode) {
      dispatch(updateAttendance({ id: formData.id, updatedData: { ...formData } }));
    } else {
      dispatch(addAttendance({ userId, attendanceData: formData }));
    }
    setIsModalOpen(false);
    setFormData({ id: '', date: '', status: 'Present', hours: '', timeIn: '', timeOut: '' });
    setIsEditMode(false);
  };

  const handleUpdate = (record) => {
    setFormData(record);
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteAttendance(id));
  };

  return (
    <div className="min-h-screen px-6 py-8 sm:px-8 lg:px-10 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-md">
        {user ? (
          <>
            <h2 className="mb-2 text-xl font-bold text-indigo-800">User Details</h2>
            <p className="text-gray-800 text-md">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-800 text-md">
              <strong>Email:</strong> {user.email}
            </p>
          </>
        ) : (
          <p className="text-red-600 text-md">User not found.</p>
        )}
      </div>

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-indigo-900">Attendance</h1>
          
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setFormData({ id: '', date: '', status: 'Present', hours: '', timeIn: '', timeOut: '' });
            }}
            className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-all bg-indigo-600 rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          >
            Add Attendance
          </button>
        </div>
      </div>
      <div className="flow-root mt-8">
        <div className="-mx-6 -my-2 overflow-x-auto sm:-mx-8 lg:-mx-10">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full border border-gray-300 divide-y divide-gray-300 rounded-lg">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-3 pl-4 pr-3 text-sm font-semibold text-left text-gray-800 sm:pl-6">Date</th>
                  <th className="px-3 py-3 text-sm font-semibold text-left text-gray-800">Status</th>
                  <th className="px-3 py-3 text-sm font-semibold text-left text-gray-800">Hours</th>
                  <th className="px-3 py-3 text-sm font-semibold text-left text-gray-800">Time In</th>
                  <th className="px-3 py-3 text-sm font-semibold text-left text-gray-800">Time Out</th>
                  <th className="py-3 pl-3 pr-4 text-sm font-semibold text-right text-gray-800 sm:pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.map((record, index) => (
                  <tr
                    key={record.id}
                    className={index % 2 === 0 ? 'bg-gray-50 hover:bg-indigo-100' : 'bg-white hover:bg-indigo-100'}
                  >
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                      {record.date}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">{record.status}</td>
                    <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">{record.hours}</td>
                    <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">{record.timeIn}</td>
                    <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">{record.timeOut}</td>
                    <td className="py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                      <button
                        onClick={() => handleUpdate(record)}
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
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {isEditMode ? 'Update Attendance Record' : 'Add Attendance Record'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Hours</label>
                <input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time In</label>
                <input
                  type="time"
                  name="timeIn"
                  value={formData.timeIn}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time Out</label>
                <input
                  type="time"
                  name="timeOut"
                  value={formData.timeOut}
                  onChange={handleInputChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 mr-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
                >
                  {isEditMode ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({
                      id: '',
                      date: '',
                      status: 'Present',
                      hours: '',
                      timeIn: '',
                      timeOut: '',
                    });
                    setIsEditMode(false);
                  }}
                  className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md shadow-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
