import { Link } from 'react-router-dom';

import Avatar from '../../../../public/avatar.png';
import { userModel } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/storage/redux/store';
import { convertToEmoji, flagemojiToPNG } from '@/utils/convertEmoji';
import { emptyUserState, setLoggedInUser } from '@/storage/redux/authSlice';
import Dropdown from 'antd/es/dropdown';

export const DropdownUser = () => {
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore,
  );

  const items: {
    label: string;
    path: string;
  }[] = [
    {
      label: 'My Profile',
      path: '/app/user/profile',
    },
    {
      label: 'Account Settings',
      path: '/app/user/settings',
    },
    {
      label: 'Log Out',
      path: '/app/user/logout',
    },
  ];

  const handleLockOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    dispatch(setLoggedInUser({ ...emptyUserState }));
    window.location.replace('/');
  };

  return (
    <div className='relative'>
      <Dropdown
        menu={{
          items: items.map((item) => ({
            key: item.label,
            label: <Link to={item.path}>{item.label}</Link>,
          })),
        }}
      >
        <p>Avatar</p>
      </Dropdown>
    </div>
  );
};
