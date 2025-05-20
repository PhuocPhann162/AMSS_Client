import { AAvatar, ADropdown } from '@/common/ui-common';
import { clearAuth } from '@/features/auth/store/auth-slice';
import { getFirstTwoCharacters } from '@/lib/string';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface DropdownUserProps {
  showName?: boolean;
}

export const DropdownUser = ({ showName }: DropdownUserProps) => {
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
      path: '/app/user/profile',
      icon: <UserOutlined />,
    },
    {
      label: 'Account Settings',
      path: '/app/user/settings',
      icon: <SettingOutlined />,
    },
    {
      label: 'Log Out',
      icon: <LogoutOutlined />,
      onClick: handleLogOut,
    },
  ];

  if (!userState) return null;

  return (
    <ADropdown
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
      <button className='flex items-center gap-2'>
        <AAvatar src={userState?.avatar}>
          {getFirstTwoCharacters(userState?.fullName || '')}
        </AAvatar>
        {showName && <p className='font-semibold'>{userState?.fullName}</p>}
      </button>
    </ADropdown>
  );
};
