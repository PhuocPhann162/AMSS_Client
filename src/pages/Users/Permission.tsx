import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRoleManagementMutation } from '~/api/userApi';
import { MiniLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';
import { apiResponse } from '~/interfaces';
import { inputHelper, toastNotify } from '~/utils';
import { SD_Roles } from '~/utils/SD';

export const Permission = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userSelected, setUserSelected] = useState({
    role: ''
  });
  const {
    state: { userData }
  } = useLocation();
  const [updateRole] = useRoleManagementMutation();

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tempData = inputHelper(e, userSelected);
    setUserSelected(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('Role', userSelected.role);
    try {
      const response: apiResponse = await updateRole({ userId: userData?.id, role: formData });
      console.log(response);
      if (response.data && response.data?.isSuccess) {
        if (response.data?.result) {
          setIsLoading(false);
          navigate('/app/user/allUsers');
          toastNotify(`Role of User ${userData?.userName} updated successfully`);
        } else {
          setIsLoading(false);
          const errorMessage = response.error?.data.errorMessages[0] ?? 'Something wrong when login';
          toastNotify(errorMessage, 'error');
        }
      }
    } catch (error: any) {
      toastNotify(error.message, 'error');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Breadcrumb pageParent='All Users' pageName='Permission' />

      <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1 w-2/3 translate-x-44'>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            <span className='font-bold'>Name</span>
            <input
              type='text'
              className='grow cursor-not-allowed'
              placeholder='Daisy'
              readOnly
              value={userData?.fullName}
            />
          </label>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            <span className='font-bold'>Username</span>
            <input
              type='text'
              className='grow cursor-not-allowed'
              placeholder='daisy@site.com'
              readOnly
              value={userData?.userName}
            />
          </label>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            <span className='font-bold'>Phone</span>
            <input
              type='text'
              className='grow cursor-not-allowed'
              placeholder='daisy@site.com'
              readOnly
              value={userData?.phoneNumber}
            />
            <kbd className='kbd kbd-sm bg-whiten'>⌘</kbd>
            <kbd className='kbd kbd-sm bg-whiten'>K</kbd>
          </label>
          <label className='bg-white input input-bordered flex items-center gap-2'>
            <span className='font-bold'>StreetAddress</span>
            <input
              type='text'
              className='grow cursor-not-allowed'
              placeholder='daisy@site.com'
              readOnly
              value={userData?.streetAddress}
            />
            <span className='badge badge-info'>Optional</span>
          </label>
          <div className='mt-2'>
            <label className='flex flex-col font-bold px-2'>* Select new role to update</label>
            <select
              className='select select-bordered w-full max-w-xs bg-white mt-2'
              name='role'
              defaultValue={userData.role}
              onChange={handleUserSelect}
              required
            >
              <option value={SD_Roles.ADMIN} disabled={SD_Roles.ADMIN === userData?.role}>
                Admin
              </option>
              <option value={SD_Roles.FARMER} disabled={SD_Roles.FARMER === userData?.role}>
                Farmer
              </option>
              <option value={SD_Roles.OWNER} disabled={SD_Roles.OWNER === userData?.role}>
                Owner
              </option>
            </select>
          </div>

          <div className='flex items-center justify-end gap-2 mt-4'>
            <button type='submit' className='btn btn-primary'>
              {!isLoading ? 'Update Role' : <MiniLoader />}
            </button>
            <button type='button' className='btn' onClick={() => navigate('/app/user/allUsers')}>
              Back to list
            </button>
          </div>
          <hr className='mt-2' />
        </div>
      </form>
    </div>
  );
};
