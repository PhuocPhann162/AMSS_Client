import React, { useState } from 'react';
import { Breadcrumb } from '~/components/UI';
import { inputHelper, toastNotify } from '~/utils';
import ReactFlagsSelect from 'react-flags-select';
import { apiResponse } from '~/interfaces';
import { useRegisterUserMutation } from '~/api/authApi';
import { SD_Roles } from '~/utils/SD';
import { MainLoader } from '~/components/Page/common';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    userName: '',
    password: '',
    repeatPassword: '',
    fullName: '',
    phoneNumber: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    role: ''
  });
  const [registerUser] = useRegisterUserMutation();

  const handleUserInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = inputHelper(e, userInputs);
    setUserInputs(tempData);
  };
  const handleCountrySelect = (countryCode: string) => {
    setUserInputs({ ...userInputs, country: countryCode });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const response: apiResponse = await registerUser(userInputs);
    console.log(response);
    if (response.data && response.data.isSuccess) {
      toastNotify(response?.data.successMessage ?? '', 'success');
      navigate('/app/user/allUsers');
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], 'error');
    }

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <MainLoader />}
      <Breadcrumb pageParent='Users' pageName='Registration' />
      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='email'
            name='userName'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            value={userInputs.userName}
            onChange={handleUserInputs}
            required
          />
          <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            Email address (name@fuco.com)
          </label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='password'
              name='password'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={userInputs.password}
              onChange={handleUserInputs}
              required
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Password
            </label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='password'
              name='repeatPassword'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={userInputs.repeatPassword}
              onChange={handleUserInputs}
              required
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Confirm password
            </label>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='fullName'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={userInputs.fullName}
              onChange={handleUserInputs}
              required
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Full name
            </label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              name='phoneNumber'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={userInputs.phoneNumber}
              onChange={handleUserInputs}
              required
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Phone number (123-456-7890)
            </label>
          </div>
        </div>
        <div className='z-0 w-full mb-5 group'>
          <label className='peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            Country
          </label>
          <ReactFlagsSelect
            className='menu-flags block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            onSelect={handleCountrySelect}
            selected={userInputs.country}
            searchable={true}
          />
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='streetAddress'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            value={userInputs.streetAddress}
            onChange={handleUserInputs}
            required
          />
          <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
            Street address
          </label>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='city'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={userInputs.city}
              onChange={handleUserInputs}
              required
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              City
            </label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              name='state'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={userInputs.state}
              onChange={handleUserInputs}
              required
            />
            <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              State
            </label>
          </div>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <select
            name='role'
            className='select select-warning w-full max-w-xs block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
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
          <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'></label>
        </div>

        <button
          type='submit'
          className='text-white bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
