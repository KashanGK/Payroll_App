import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeManagement from './components/EmployeeManagement';
import AttendanceTable from './components/attandanceTable';
import SalaryTable from './components/salaryTable';
import TaxTable from './components/taxTable';
import LeaveTable from './components/LeaveTable';
import Login from './components/Login';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Authentication state

  return (
    <Router>
      {isLoggedIn && <Header />}
      <div className="container mx-auto mt-10 max-w-7x">
        <Routes>
          {/* If Logged In */}
          {isLoggedIn ? (
            <>
              <Route path="/" element={<EmployeeManagement />} />
              <Route path="/attendance/:id" element={<AttendanceTable />} />
              <Route path="/salary/:id" element={<SalaryTable />} />
              <Route path="/tax/:id" element={<TaxTable />} />
              <Route path="/leaves/:id" element={<LeaveTable />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              {/* Redirect to Login */}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </div>
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
