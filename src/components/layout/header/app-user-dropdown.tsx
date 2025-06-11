import { ADropdown } from '@/common/ui-common';
import { AvatarWithUsername } from '@/components/ui/avatar-with-username.';
import { clearAuth } from '@/features/auth/store/auth-slice';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      <AvatarWithUsername
        showName={false}
        name={userState?.fullName}
        avatar={userState?.avatar}
      />
    </ADropdown>
  );
};
