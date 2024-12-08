import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const hardcodedEmail = 'admin@gmail.com';
    const hardcodedPassword = 'admin';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      dispatch(login());
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <p className="text-lg text-center text-gray-700">
          You are already logged in. Please go to the{' '}
          <a href="/" className="font-semibold text-purple-600 hover:text-purple-800">
            Home Page
          </a>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-pink-100 via-white to-purple-100 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-center text-purple-800">
            Sign in to your account
          </h2>
        </div>

        <div className="p-8 mt-10 bg-white shadow-lg sm:mx-auto sm:w-full sm:max-w-md rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-sm text-center text-red-500">{error}</p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg shadow-md focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg shadow-md focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
