import { useDispatch } from 'react-redux';

const PayrollProcessing = () => {
  const dispatch = useDispatch(); // Add process payroll action if needed

  const handleProcessPayroll = () => {
    // dispatch(processPayroll()); // Implement this action in your Redux slice
    alert('Payroll processed!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-indigo-800">Process Payroll</h2>
        <button
          onClick={handleProcessPayroll}
          className="w-full px-4 py-2 text-sm font-semibold text-white transition-all bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Process Now
        </button>
      </div>
    </div>
  );
};

export default PayrollProcessing;
