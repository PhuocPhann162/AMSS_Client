import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery, useLockUnLockUserMutation } from '~/api/userApi';
import { Modal, Pagination } from '~/common';
import { MainLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';
import { apiResponse, pageOptions, userModel } from '~/interfaces';
import { inputHelper, toastNotify } from '~/helper';
import { convertToEmoji, flagemojiToPNG } from '~/utils/convertEmoji';
import { EditTableIcon } from '~/components/Icon';

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
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize
    })
  });
  const [lockUnlockUser] = useLockUnLockUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, filters);
    setFilters(tempData);
  };

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString
    });
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
          <div className='flex items-center justify-between mb-2'>
            <NavLink to='/app/user/register' className='btn btn-primary text-whiten shadow-lg'>
              New User
            </NavLink>
            <div className='flex items-center gap-3'>
              <label className='input input-bordered flex items-center gap-2 bg-whiter w-80'>
                <input
                  type='text'
                  className='grow w-full'
                  placeholder='Search Name, Phone or Role'
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
              <button className='btn btn-accent text-whiten' onClick={handleFilters}>
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
                    d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
                  />
                </svg>
                Filter
              </button>
            </div>
          </div>
          <div className='overflow-x-auto overflow-y-hidden py-4 rounded-lg'>
            <table className='table table-sm rounded-md shadow-lg bg-white'>
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
                    <td>{flagemojiToPNG(convertToEmoji(user.country!))}</td>
                    <td>{user.role}</td>
                    <td className='flex items-center gap-2'>
                      {user.isActive ? (
                        <button
                          className='btn btn-sm btn-outline btn-success tooltip tooltip-bottom'
                          data-tip='Lock user account'
                          onClick={() => {
                            setUserIdModal(user.id!);
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
                            setUserIdModal(user.id!);
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
                        <EditTableIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPageSize={currentPageSize!}
            setCurrentPageSize={setCurrentPageSize}
            pageOptions={pageOptions}
            setPageOptions={setPageOptions}
            totalRecords={totalRecords}
          />

          <Modal width='' title='lock/unlock this user?' onConfirm={() => handleLockUnlockUser(userIdModal)} />
        </>
      )}
    </div>
  );
};
