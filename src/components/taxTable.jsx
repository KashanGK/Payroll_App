import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTax, updateTax, deleteTax } from '../../redux/slices/taxSlice';

export default function TaxationTable() {
  const { id: userId } = useParams();
  const user = useSelector((state) => state.user.users.find((u) => u.id === userId));
  const taxRecords = useSelector((state) =>
    state.tax.filter((record) => record.userId === userId)
  );
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    year: '',
    providentFund: '',
    socialSecurity: '',
    totalTax: '',
    reportGenerated: 'No',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditMode) {
      dispatch(updateTax({ id: formData.id, updatedData: { ...formData } }));
    } else {
      dispatch(addTax({ userId, taxData: formData }));
    }
    setIsModalOpen(false);
    setFormData({ id: '', year: '', providentFund: '', socialSecurity: '', totalTax: '', reportGenerated: 'No' });
    setIsEditMode(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteTax(id));
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-blue-50 via-white to-gray-100">
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
          <h1 className="text-2xl font-bold text-indigo-800">Taxation and Compliance</h1>
          
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setFormData({
                id: '',
                year: '',
                providentFund: '',
                socialSecurity: '',
                totalTax: '',
                reportGenerated: 'No',
              });
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500"
          >
            Add Record
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Year</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Provident Fund %</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Social Security</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Total Tax</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-800">Report Generated</th>
              <th className="px-4 py-3 text-sm font-semibold text-right text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {taxRecords.map((record) => (
              <tr key={record.id} className="hover:bg-indigo-50">
                <td className="px-4 py-3 text-sm text-gray-800">{record.year}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.providentFund}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.socialSecurity}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.totalTax}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{record.reportGenerated}</td>
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
              {isEditMode ? 'Update Tax Record' : 'Add Tax Record'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Provident Fund %</label>
                <input
                  type="number"
                  name="providentFund"
                  value={formData.providentFund}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Social Security</label>
                <input
                  type="number"
                  name="socialSecurity"
                  value={formData.socialSecurity}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Total Tax</label>
                <input
                  type="number"
                  name="totalTax"
                  value={formData.totalTax}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Report Generated</label>
                <select
                  name="reportGenerated"
                  value={formData.reportGenerated}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
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
    </div>
  );
}
