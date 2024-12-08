import { useState } from 'react';
import { useDispatch } from 'react-redux';

const SalaryManagement = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [salary, setSalary] = useState('');
  const dispatch = useDispatch(); // Add the action to manage salary

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployeeId('');
    setSalary('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-800">Manage Salary</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="block w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="salary">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="block w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-semibold text-white transition-all bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalaryManagement;
