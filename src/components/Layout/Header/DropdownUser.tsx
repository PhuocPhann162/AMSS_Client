import { AAvatar } from '@/common/ui-common';
import { clearAuth } from '@/features/auth/store/auth-slice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getFirstTwoCharacters } from '@/lib/string';
import Dropdown from 'antd/es/dropdown';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface DropdownUserProps {
  showName?: boolean;
}

export const DropdownUser: FC<DropdownUserProps> = ({ showName }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.user);

  const handleLockOut = () => {
    dispatch(clearAuth());
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

  if (!userData) return null;

  return (
    <Dropdown
      trigger={['click']}
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
        <AAvatar src={userData?.avatar}>
          {getFirstTwoCharacters(userData?.fullName || '')}
        </AAvatar>
        {showName && <p className='font-semibold'>{userData?.fullName}</p>}
      </button>
    </Dropdown>
  );
};
