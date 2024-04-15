import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery, useLockUnLockUserMutation } from '~/api/userApi';
import { Modal } from '~/common';
import { MainLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';
import { apiResponse, pageOptions, userModel } from '~/interfaces';
import { inputHelper, toastNotify } from '~/helper';
import { convertToEmoji, flagemojiToPNG } from '~/utils/convertEmoji';

export const AllUsers = () => {
  let cnt: number = 1;
  const navigate = useNavigate();

  // Start State
  const [userList, setUserList] = useState<userModel[]>([]);
  const [userIdModal, setUserIdModal] = useState('');
  const [filters, setFilters] = useState({
    searchString: ''
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: ''
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 5
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  // End State

  const { data, isLoading } = useGetAllUsersQuery({
    ...(apiFilters && { searchString: apiFilters.searchString })
  });
  const [lockUnlockUser] = useLockUnLockUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  const handleLockUnlockUser = async (userId: string) => {
    try {
      const response: apiResponse = await lockUnlockUser(userId);
      if (response?.data && response.data?.isSuccess) {
        toastNotify(response?.data.successMessage || 'User account locked/unlocked successfully');
      } else if (response?.error) {
        const errorMessage = response.error?.data.errorMessages[0] ?? 'Something wrong when login';
        toastNotify(errorMessage, 'error');
      }
    } catch (error: any) {
      toastNotify(error.message, 'error');
    }
  };

  const getPageDetails = () => {
    const dataStartRecordNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndRecordNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartRecordNumber} - ${
      dataEndRecordNumber < totalRecords ? dataEndRecordNumber : totalRecords
    } of ${totalRecords}`;
  };

  const handlePageOptionsChange = (direction: string, pageSize?: number) => {
    if (direction === 'prev') {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber - 1
      });
    } else if (direction === 'next') {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber + 1
      });
    } else if (direction === 'change') {
      setPageOptions({
        pageSize: pageSize ? pageSize : currentPageSize,
        pageNumber: 1
      });
    }
  };

  useEffect(() => {
    if (data) {
      setUserList(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  return (
    <div>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <Breadcrumb pageParent='Users' pageName='All Users' />
          <div className='flex items-center justify-between'>
            <NavLink to='/app/user/register' className='btn btn-primary text-whiten'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              New User
            </NavLink>
            <label className='input input-bordered flex items-center gap-2 bg-whiter'>
              <input
                type='text'
                className='grow'
                placeholder='Search'
                name='searchString'
                value={filters.searchString}
                onChange={handleChange}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='w-4 h-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </label>
          </div>
          <div className='overflow-x-auto overflow-y-hidden py-4 rounded-lg'>
            <table className='table table-sm rounded-lg'>
              <thead className='text-black text-sm'>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Street Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user: userModel) => (
                  <tr key={user.id} className=''>
                    <th>{cnt++}</th>
                    <td>{user.fullName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.streetAddress}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{flagemojiToPNG(convertToEmoji(user.country))}</td>
                    <td>{user.role}</td>
                    <td className='flex items-center gap-2'>
                      {user.isActive ? (
                        <button
                          className='btn btn-sm btn-outline btn-success tooltip tooltip-bottom'
                          data-tip='Lock user account'
                          onClick={() => {
                            setUserIdModal(user.id);
                            (document.getElementById('fuco_modal') as HTMLDialogElement)?.showModal();
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className='btn btn-sm btn-outline btn-warning tooltip tooltip-bottom'
                          data-tip='Unlock user account'
                          onClick={() => {
                            setUserIdModal(user.id);
                            (document.getElementById('fuco_modal') as HTMLDialogElement)?.showModal();
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                            />
                          </svg>
                        </button>
                      )}
                      <button
                        className='btn btn-sm btn-outline btn-accent tooltip tooltip-bottom'
                        data-tip='Update user role'
                        onClick={() =>
                          navigate(`/app/user/allUsers/updateRole/${user.id}`, {
                            state: { userData: user as userModel }
                          })
                        }
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-5 h-5'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-6 sm:flex sm:items-center sm:justify-between'>
            <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
              <div>
                Page <span className='font-medium text-gray-700 dark:text-gray-100'>{getPageDetails()}</span>
              </div>
              <select
                className='select select-bordered select-sm max-w-xs select-info w-18 bg-white'
                value={currentPageSize}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handlePageOptionsChange('change', Number(e.target.value));
                  setCurrentPageSize(Number(e.target.value));
                }}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
              </select>
            </div>

            <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
              <button
                onClick={() => handlePageOptionsChange('prev')}
                disabled={pageOptions.pageNumber === 1}
                className='btn btn-outline btn-info flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-5 h-5 rtl:-scale-x-100'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
                </svg>

                <span>Previous</span>
              </button>

              <button
                onClick={() => handlePageOptionsChange('next')}
                disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
                className='btn btn-outline btn-info flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100'
              >
                <span>Next</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-5 h-5 rtl:-scale-x-100'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
                </svg>
              </button>
            </div>
          </div>

          <Modal width='' title='lock/unlock this user?' onConfirm={() => handleLockUnlockUser(userIdModal)} />
        </>
      )}
    </div>
  );
};
