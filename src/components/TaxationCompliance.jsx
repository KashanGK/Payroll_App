import { useState } from 'react';
import { useDispatch } from 'react-redux';

const TaxationCompliance = () => {
  const [taxCode, setTaxCode] = useState('');
  const [percentage, setPercentage] = useState('');
  const dispatch = useDispatch(); // Add the action to update tax settings

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateTaxSettings({ taxCode, percentage })); // Implement this action in your Redux slice
    setTaxCode('');
    setPercentage('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-800">Tax Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="taxCode" className="block text-sm font-medium text-gray-700">
              Tax Code
            </label>
            <input
              type="text"
              id="taxCode"
              value={taxCode}
              onChange={(e) => setTaxCode(e.target.value)}
              className="block w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
              Percentage (%)
            </label>
            <input
              type="number"
              id="percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="block w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-semibold text-white transition-all bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Set Tax Rate
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaxationCompliance;
