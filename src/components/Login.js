import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaTrainSubway } from 'react-icons/fa6';
import Footer from '../pages/Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessCreateAlert, setShowSuccessCreateAlert] = useState(false);
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors('Please enter a valid email address');
      return false;
    }
    if (!password || password.length < 6) {
      setErrors('Password must be at least 6 characters long');
      return false;
    }
    if (!isLogin && (!firstName || !lastName)) {
      setErrors('First name and last name are required');
      return false;
    }
    return true;
  };

  const handleLoginCreateAccount = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post(
          `${BASE_URL}/login`,
          { email, password },
          { withCredentials: true }
        );

        dispatch(addUser(res?.data?.user));

        if (res.data.success) {
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
            if (res.data.user.role === 'user') {
              navigate('/trains');
            } else {
              navigate('/adminDashboard');
            }
          }, 1000);
        }
      } else {
        const res = await axios.post(
          `${BASE_URL}/signup`,
          { firstName, lastName, email, password },
          { withCredentials: true }
        );

        if (res.data) {
          setShowSuccessCreateAlert(true);
          setTimeout(() => {
            setShowSuccessCreateAlert(false);
            navigate('/login');
          }, 1000);
        }
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || 'An error occurred. Please try again.';
      setErrors(errorMessage);
      setTimeout(() => setErrors(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />
      {showSuccessAlert && (
        <div
          role="alert"
          className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg"
        >
          <span>Login successful! Redirecting to app...</span>
        </div>
      )}
      {showSuccessCreateAlert && (
        <div
          role="alert"
          className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg"
        >
          <span>Account created successfully!</span>
        </div>
      )}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <FaTrainSubway className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            {isLogin ? 'Login to your account' : 'Create Account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLoginCreateAccount}>
            {!isLogin && (
              <>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3L21 21M12 7C14.7614 7 17 9.23858 17 12C17 12.8563 16.7366 13.6568 16.2678 14.3251M6.5 6.5C7.66912 5.55473 9.23838 5 11 5C15.4183 5 19.4183 8.58172 20.7552 13.0586M12 9C13.6569 9 15 10.3431 15 12C15 12.3453 14.9239 12.6804 14.7814 12.9837M4.46881 8.11881C3.56299 9.237 3 10.5789 3 12C3 16.4183 7.58172 20 12 20C13.7689 20 15.3461 19.4392 16.5188 18.521"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {errors && <p className="text-red-400 text-sm">{errors}</p>}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold ${
                  isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                {isLoading
                  ? 'Processing...'
                  : isLogin
                  ? 'Login'
                  : 'Sign up'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-300">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create one' : 'Login'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;