import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAllUsersQuery } from '~/api/userApi';
import { MainLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';
import { userModel } from '~/interfaces';

export const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery('');

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  let cnt: number = 1;

  return (
    <div>
      {isLoading && <MainLoader />}
      <Breadcrumb pageParent='Users' pageName='All Users' />
      <div className='flex items-center justify-between'>
        <NavLink to='/app/user/register' className='btn btn-primary text-whiten'>
          New User
        </NavLink>
        <label className='input input-bordered flex items-center gap-2 bg-whiter'>
          <input type='text' className='grow' placeholder='Search' />
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
      <div className='overflow-x-auto overflow-y-hidden py-4'>
        <table className='table table-sm'>
          <thead className='text-black'>
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
            {data?.result.map((user: userModel) => (
              <tr key={user.id} className=''>
                <th>{cnt++}</th>
                <td>{user.fullName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.streetAddress}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.country}</td>
                <td>{user.role}</td>
                <td className='flex items-center gap-2'>
                  <button
                    className='btn btn-sm btn-outline btn-warning tooltip tooltip-bottom'
                    data-tip='Lock/Unlock user account'
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
                  <button
                    className='btn btn-sm btn-outline btn-info tooltip tooltip-bottom'
                    data-tip='Update user role'
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
      <div className='text-end'>
        <div className='join'>
          <button className='join-item btn btn-outline btn-graydark btn-sm'>1</button>
          <button className='join-item btn btn-outline btn-sm btn-graydark btn-active'>2</button>
          <button className='join-item btn btn-outline btn-sm btn-graydark'>3</button>
          <button className='join-item btn btn-outline btn-sm btn-graydark'>4</button>
        </div>
      </div>
    </div>
  );
};