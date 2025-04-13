import React, { useState } from 'react';
import { Breadcrumb } from '@/components/UI';
import { inputHelper, toastNotify } from '@/helper';
import ReactFlagsSelect from 'react-flags-select';
import { SD_Roles } from '@/utils/SD';
import { MainLoader } from '@/components/Page/common';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '@/api/authApi';
import type { RegisterRequest, RegisterResponse } from '@/models';

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState<RegisterRequest>({
    userName: '',
    password: '',
    repeatPassword: '',
    fullName: '',
    phoneNumber: '',
    country: '',
    provinceCode: '',
    streetAddress: '',
    city: '',
    state: '',
    avatar: '',
    phoneCode: '',
    role: undefined,
  });
  const [registerUser] = useRegisterUserMutation();

  const handleUserInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const tempData = inputHelper(e, userInputs);
    setUserInputs(tempData);
  };
  const handleCountrySelect = (countryCode: string) => {
    setUserInputs({ ...userInputs, country: countryCode });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await registerUser({
        ...userInputs,
        avatar: `https://ui-avatars.com/api/?name=${userInputs.fullName}&background=00c46a&color=fff`,
      }).unwrap();
      setIsLoading(false);
      toastNotify(
        response.successMessage ?? 'User registered successfully',
        'success',
      );
      navigate('/app/user/allUsers');
    } catch (error) {
      const _error = error as { data?: RegisterResponse } | undefined;
      const errMessage = _error?.data?.errorMessages[0] || 'Something wrong';
      toastNotify(errMessage, 'error');
      setIsLoading(false);
      console.error('Register failed', error);
      throw error;
    }
  };

  return (
    <div>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <Breadcrumb pageParent='Users' pageName='Registration' />
          <div className='mx-auto max-w-xl rounded-lg border border-white bg-white py-6 shadow-lg'>
            <form className='mx-auto max-w-md' onSubmit={handleSubmit}>
              <div className='group relative z-0 mb-5 w-full'>
                <input
                  type='email'
                  name='userName'
                  className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                  placeholder=' '
                  value={userInputs.userName}
                  onChange={handleUserInputs}
                  required
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'>
                  Email address (name@fuco.com)
                </label>
              </div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='group relative z-0 mb-5 w-full'>
                  <input
                    type='password'
                    name='password'
                    className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                    placeholder=' '
                    value={userInputs.password}
                    onChange={handleUserInputs}
                    required
                  />
                  <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4'>
                    Password
                  </label>
                </div>
                <div className='group relative z-0 mb-5 w-full'>
                  <input
                    type='password'
                    name='repeatPassword'
                    className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                    placeholder=' '
                    value={userInputs.repeatPassword}
                    onChange={handleUserInputs}
                    required
                  />
                  <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4'>
                    Confirm password
                  </label>
                </div>
              </div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='group relative z-0 mb-5 w-full'>
                  <input
                    type='text'
                    name='fullName'
                    className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                    placeholder=' '
                    value={userInputs.fullName}
                    onChange={handleUserInputs}
                    required
                  />
                  <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'>
                    Full name
                  </label>
                </div>
                <div className='group relative z-0 mb-5 w-full'>
                  <input
                    type='tel'
                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                    name='phoneNumber'
                    className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                    placeholder=' '
                    value={userInputs.phoneNumber}
                    onChange={handleUserInputs}
                    required
                  />
                  <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4'>
                    Phone number (123-456-7890)
                  </label>
                </div>
              </div>
              <div className='group z-0 mb-5 w-full'>
                <label className='top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4'>
                  Country
                </label>
                <ReactFlagsSelect
                  className='menu-flags peer block w-full appearance-none bg-transparent px-0 py-2.5 text-xs text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                  onSelect={handleCountrySelect}
                  selected={userInputs.country}
                  searchable={true}
                />
              </div>
              <div className='group relative z-0 mb-5 w-full'>
                <input
                  type='text'
                  name='streetAddress'
                  className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                  placeholder=' '
                  value={userInputs.streetAddress}
                  onChange={handleUserInputs}
                  required
                />
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'>
                  Street address
                </label>
              </div>

              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='group relative z-0 mb-5 w-full'>
                  <input
                    type='text'
                    name='city'
                    className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                    placeholder=' '
                    value={userInputs.city}
                    onChange={handleUserInputs}
                    required
                  />
                  <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4'>
                    City
                  </label>
                </div>
                <div className='group relative z-0 mb-5 w-full'>
                  <input
                    type='text'
                    name='state'
                    className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                    placeholder=' '
                    value={userInputs.state}
                    onChange={handleUserInputs}
                    required
                  />
                  <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4'>
                    State
                  </label>
                </div>
              </div>
              <div className='group relative z-0 mb-5 w-full'>
                <select
                  name='role'
                  className='select select-warning peer block w-full max-w-xs appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
                  onChange={handleUserInputs}
                  value={userInputs.role}
                  required
                >
                  <option value='' disabled defaultValue={''}>
                    Select role
                  </option>
                  <option key={SD_Roles.ADMIN} value={SD_Roles.ADMIN}>
                    Admin
                  </option>
                  <option key={SD_Roles.FARMER} value={SD_Roles.FARMER}>
                    Farmer
                  </option>
                  <option key={SD_Roles.OWNER} value={SD_Roles.OWNER}>
                    Owner
                  </option>
                </select>
                <label className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4'></label>
              </div>

              <button
                type='submit'
                className='w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto'
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
