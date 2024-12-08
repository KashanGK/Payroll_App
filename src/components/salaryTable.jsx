import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addSalary, updateSalary, deleteSalary } from '../../redux/slices/salarySlice';

export default function SalaryTable() {
  const { id: userId } = useParams();
  const user = useSelector((state) => state.user.users.find((u) => u.id === userId));
  const salaryRecords = useSelector((state) =>
    state.salary.filter((record) => record.userId === userId)
  );
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    amount: '',
    bonus: '',
    deductions: '',
    date: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditMode) {
      dispatch(updateSalary({ id: formData.id, updatedData: { ...formData } }));
    } else {
      dispatch(addSalary({ userId, salaryData: formData }));
    }
    setIsModalOpen(false);
    setFormData({ id: '', amount: '', bonus: '', deductions: '', date: '' });
    setIsEditMode(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteSalary(id));
  };

  const handleViewSlip = (record) => {
    setSelectedSalary(record);
    setIsSlipModalOpen(true);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
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
          <h1 className="text-2xl font-bold text-indigo-800">Salary Details</h1>
          
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setFormData({ id: '', amount: '', bonus: '', deductions: '', date: '' });
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500"
          >
            Add Salary
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Amount</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Bonus</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Deductions</th>
              <th className="px-4 py-3 text-sm font-semibold text-right text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {salaryRecords.map((record) => (
              <tr key={record.id} className="hover:bg-indigo-50">
                <td className="px-4 py-3 text-sm text-gray-800">{record.date}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.bonus}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.deductions}</td>
                <td className="px-4 py-3 space-x-2 text-sm font-medium text-right">
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
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleViewSlip(record)}
                    className="text-green-600 hover:text-green-900"
                  >
                    View Slip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              {isEditMode ? 'Update Salary' : 'Add Salary'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bonus</label>
                <input
                  type="number"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Deductions</label>
                <input
                  type="number"
                  name="deductions"
                  value={formData.deductions}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
                >
                  {isEditMode ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSlipModalOpen && selectedSalary && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Salary Slip</h2>
              <button
                onClick={handlePrintSlip}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
              >
                Print
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Date:</strong> {selectedSalary.date}
              </p>
              <p>
                <strong>Amount:</strong> {selectedSalary.amount}
              </p>
              <p>
                <strong>Bonus:</strong> {selectedSalary.bonus}
              </p>
              <p>
                <strong>Deductions:</strong> {selectedSalary.deductions}
              </p>
              <p>
                <strong>Gross Salary:</strong>{' '}
                {Number(selectedSalary.amount) + Number(selectedSalary.bonus) - Number(selectedSalary.deductions)}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsSlipModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
