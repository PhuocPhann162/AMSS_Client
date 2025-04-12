import { Link } from 'react-router-dom';
import { User } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/storage/redux/store';
import { emptyUserState, setLoggedInUser } from '@/storage/redux/authSlice';
import Dropdown from 'antd/es/dropdown';
import { AAvatar } from '@/common/ui-common';
import { getFirstTwoCharacters } from '@/lib/string';
import { FC } from 'react';

export interface DropdownUserProps {
  showName?: boolean;
}

export const DropdownUser: FC<DropdownUserProps> = ({ showName }) => {
  const dispatch = useDispatch();
  const userData: User = useSelector((state: RootState) => state.userAuthStore);

  const handleLockOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    dispatch(setLoggedInUser({ ...emptyUserState }));
    window.location.replace('/');
  };

  const items: {
    label: string;
    path?: string;
    onClick?: () => void;
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
      onClick: handleLockOut,
    },
  ];

  return (
    <Dropdown
      trigger={['click', 'hover']}
      menu={{
        items: items.map((item) => {
          return {
            key: item.label,
            label: item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              item.label
            ),
            onClick: item.onClick,
          };
        }),
      }}
    >
      <button className='flex items-center gap-2'>
        <AAvatar src={userData.avatar}>
          {getFirstTwoCharacters(userData.fullName || '')}
        </AAvatar>
        {showName && <p className='font-semibold'>{userData.fullName}</p>}
      </button>
    </Dropdown>
  );
};
