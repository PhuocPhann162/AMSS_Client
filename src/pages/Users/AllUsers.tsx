import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery, useLockUnLockUserMutation } from '@/api/app';
import { Modal, Pagination } from '@/common';
import { MainLoader } from '@/components/Page/common';
import { Breadcrumb } from '@/components/UI';
import { apiResponse, pageOptions, User } from '@/interfaces';
import { inputHelper, toastNotify } from '@/helper';
import { convertToEmoji, flagemojiToPNG } from '@/utils/convertEmoji';
import { CreateIcon, EditTableIcon, SearchIcon } from '@/components/Icon';

export const AllUsers = () => {
  let cnt: number = 1;
  const navigate = useNavigate();

  // Start State
  const [userList, setUserList] = useState<User[]>([]);
  const [userIdModal, setUserIdModal] = useState('');
  const [filters, setFilters] = useState({
    searchString: '',
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: '',
  });
  const [pageOptions, setPageOptions] = useState<pageOptions>({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  // End State

  const { data, isLoading } = useGetAllUsersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });
  const [lockUnlockUser] = useLockUnLockUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
    });
  };

  const handleLockUnlockUser = async (userId: string) => {
    try {
      const response: apiResponse = await lockUnlockUser(userId);
      if (response?.data && response.data?.isSuccess) {
        toastNotify(
          response?.data.successMessage ||
            'User account locked/unlocked successfully',
        );
      } else if (response?.error) {
        const errorMessage =
          response.error?.data.errorMessages[0] ?? 'Something wrong when login';
        toastNotify(errorMessage, 'error');
      }
    } catch (error: any) {
      toastNotify(error.message, 'error');
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
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex flex-col gap-4'>
              <div>
                <div className='flex items-center gap-x-3'>
                  <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                    Users
                  </h2>

                  <span className='rounded-full bg-green-100 px-3 py-1 text-xs text-green-600 shadow-md'>
                    {totalRecords} accounts
                  </span>
                </div>

                <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                  These accounts have managed in the last 12 months.
                </p>
              </div>
            </div>

            <div className='flex flex-col items-end gap-2'>
              <div className='mt-4 flex items-center gap-x-3'>
                <NavLink
                  to='/app/user/register'
                  className='hover:shadow-green flex w-1/2 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-green-500 px-5 py-2 text-sm tracking-wide text-white shadow-lg transition-colors duration-200 hover:bg-green-600 sm:w-auto'
                >
                  <CreateIcon />
                  <span>New User</span>
                </NavLink>
              </div>
              <div className='flex items-center gap-3'>
                <div className='relative mt-4 flex items-center md:mt-0'>
                  <span className='absolute'>
                    <SearchIcon />
                  </span>

                  <input
                    type='text'
                    placeholder='Search Name, Phone or Role'
                    className='block w-full rounded-lg bg-white py-1.5 pl-11 pr-5 text-gray-700 placeholder-gray-400/70 shadow-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:w-80 rtl:pl-5 rtl:pr-11'
                    name='searchString'
                    value={filters.searchString}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className='tooltip tooltip-bottom'
                  data-tip='Enter to Search'
                >
                  <button
                    className='btn btn-accent btn-sm text-whiten'
                    onClick={handleFilters}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='overflow-x-auto overflow-y-hidden rounded-lg py-4'>
            <table className='table-sm table rounded-md bg-white shadow-lg'>
              <thead className='text-md bg-status-white-light text-status-white-dark'>
                <tr className='border-b border-res-draft'>
                  <th>No</th>
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
                {userList.map((user: User) => (
                  <tr key={user.id} className='border-b border-res-draft'>
                    <th className='font-medium'>{cnt++}</th>
                    <td>{user.fullName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.streetAddress}</td>
                    <td>{user.city}</td>
                    <td>{user.state}</td>
                    <td>{flagemojiToPNG(convertToEmoji(user.country!))}</td>
                    <td>{user.role}</td>
                    <td className='flex items-center gap-2'>
                      {user.isActive ? (
                        <button
                          className='btn btn-sm btn-outline btn-success tooltip tooltip-bottom'
                          data-tip='Lock user account'
                          onClick={() => {
                            setUserIdModal(user.id!);
                            (
                              document.getElementById(
                                'fuco_modal',
                              ) as HTMLDialogElement
                            )?.showModal();
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-5 w-5'
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
                            setUserIdModal(user.id!);
                            (
                              document.getElementById(
                                'fuco_modal',
                              ) as HTMLDialogElement
                            )?.showModal();
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-5 w-5'
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
                            state: { userData: user },
                          })
                        }
                      >
                        <EditTableIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPageSize={currentPageSize}
            setCurrentPageSize={setCurrentPageSize}
            pageOptions={pageOptions}
            setPageOptions={setPageOptions}
            totalRecords={totalRecords}
          />

          <Modal
            width=''
            title='lock/unlock this user?'
            onConfirm={() => handleLockUnlockUser(userIdModal)}
          />
        </>
      )}
    </div>
  );
};
