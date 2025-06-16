import { useLoginUserMutation } from '@/api';
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from '@/features/auth/store/auth-slice';
import { inputHelper, toastNotify } from '@/helper';
import { Role } from '@/interfaces';
import type { LoginResponse } from '@/models';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: '',
    password: '',
  });
  const [loginUser] = useLoginUserMutation();

  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') || '/';

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({
        userName: userInput.userName,
        password: userInput.password,
      }).unwrap();

      const { user, token } = response.result;

      dispatch(setAccessToken(token.accessToken));
      dispatch(setRefreshToken(token.refreshToken));
      dispatch(setUser(user));

      setLoading(false);
      toastNotify(response.successMessage || '');

      const redirect = user.role === Role.ADMIN ? '/app/dashBoard' : from;

      navigate(redirect, { replace: true });
    } catch (error) {
      const _error = error as { data?: LoginResponse } | undefined;
      const errMessage = _error?.data?.errorMessages[0] || 'Something wrong';
      toastNotify(errMessage, 'error');
      setError(errMessage);
      setLoading(false);
      console.error('Login failed', error);
      throw error;
    }
  };

  return (
    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
      <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          Sign in to your account
        </h1>
        <form
          className='space-y-4 md:space-y-6'
          method='post'
          onSubmit={handleSubmit}
        >
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
              Your email
            </label>
            <input
              type='email'
              name='userName'
              className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
              placeholder='name@company.com'
              value={userInput.userName}
              onChange={handleUserInputs}
              required
            />
          </div>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
              placeholder='••••••••'
              value={userInput.password}
              onChange={handleUserInputs}
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start'>
              <div className='flex h-5 items-center'>
                <input
                  id='remember'
                  aria-describedby='remember'
                  type='checkbox'
                  className='focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label className='text-gray-500 dark:text-gray-300'>
                  Remember me
                </label>
              </div>
            </div>
            <a
              href='#'
              className='text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline'
            >
              Forgot password?
            </a>
          </div>
          <button
            disabled={loading}
            type='submit'
            className='w-full rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800'
          >
            Sign in
          </button>
          <p className='w-full text-sm text-gray-500 dark:text-gray-400'>
            Don’t have an account yet?{' '}
            <Link
              to='/register'
              className='text-primary-600 font-medium hover:underline'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
