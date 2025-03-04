import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '~/api/authApi';
import { Logo } from '~/common';
import { MainLoader } from '~/components/Page/common';
import { inputHelper, toastNotify } from '~/helper';
import { apiResponse, tokenModel, userModel } from '~/interfaces';
import { setLoggedInUser } from '~/storage/redux/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: '',
    password: ''
  });
  const [loginUser] = useLoginUserMutation();

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response: apiResponse = await loginUser({
        userName: userInput.userName,
        password: userInput.password
      });

      if (response.data) {
        const { user, token }: { user: userModel; token: tokenModel } = response?.data.result as any;

        localStorage.setItem('accessToken', token.accessToken);
        localStorage.setItem('refreshToken', token.refreshToken);

        localStorage.setItem('user', JSON.stringify(user));

        dispatch(setLoggedInUser(user));
        setLoading(false);
        toastNotify(response?.data.successMessage || '');
        navigate('/app/dashBoard');
      } else if (response?.error) {
        setLoading(false);
        const errorMessage = response.error?.data.errorMessages[0] ?? 'Something wrong when login';
        toastNotify(errorMessage, 'error');
        setError(errorMessage);
      }
    } catch (error: any) {
      toastNotify(error.message, 'error');
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <section className='bg-strokedark dark:bg-gray-900'>
      {loading && <MainLoader />}
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='flex items-center mb-6 mr-6 text-gray-900 dark:text-white'>
          <Logo />
        </div>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6' method='post' onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
                <input
                  type='email'
                  name='userName'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  value={userInput.userName}
                  onChange={handleUserInputs}
                  required
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                <input
                  type='password'
                  name='password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='••••••••'
                  value={userInput.password}
                  onChange={handleUserInputs}
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label className='text-gray-500 dark:text-gray-300'>Remember me</label>
                  </div>
                </div>
                <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Forgot password?
                </a>
              </div>
              <button
                disabled={loading}
                type='submit'
                className='w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400 w-full'>
                Don’t have an account yet? Please contact our admin{' '}
                <a href='#' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  admin@fuco.com
                </a>{' '}
                to create an account.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
