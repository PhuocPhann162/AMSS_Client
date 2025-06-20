import { ADropdown } from '@/common/ui-common';
import { AvatarWithUsername } from '@/components/ui/avatar-with-username.';
import { clearAuth } from '@/features/auth/store/auth-slice';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { convertToEmoji, flagemojiToPNG } from '@/utils/convertEmoji';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const AppUserDropdown = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearAuth());
    navigate('/');
  };

  const items: {
    label: string;
    path?: string;
    icon?: ReactNode;
    onClick?: () => void;
  }[] = [
    {
      label: 'My Profile',
      path: 'user/profile',
      icon: <UserOutlined />,
    },
    {
      label: 'Account Settings',
      path: 'user/settings',
      icon: <SettingOutlined />,
    },
    {
      label: 'Log Out',
      icon: <LogoutOutlined />,
      onClick: handleLogOut,
    },
  ];

  return (
    <ADropdown
      disabled={!userState}
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
            icon: item.icon,
            onClick: item.onClick,
          };
        }),
      }}
    >
      <div className='flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50'>
        <AvatarWithUsername
          showName={false}
          name={userState?.fullName}
          avatar={userState?.avatar}
        />
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-gray-900'>
            {userState?.fullName}
          </span>
          {userState?.countryCode && (
            <div className='flex items-center gap-1'>
              <span className='text-xs text-gray-500'>
                {flagemojiToPNG(convertToEmoji(userState.countryCode))}
              </span>
              <span className='text-xs text-gray-500'>
                {userState.countryName}
              </span>
            </div>
          )}
        </div>
      </div>
    </ADropdown>
  );
};
