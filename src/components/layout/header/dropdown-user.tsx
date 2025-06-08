import { ADropdown } from '@/common/ui-common';
import { AvatarWithUsername } from '@/components/ui/avatar-with-username.';
import { clearAuth } from '@/features/auth/store/auth-slice';
import type { User } from '@/interfaces';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface DropdownUserProps {
  showName?: boolean;
  children?: ReactNode | ((user?: User) => ReactNode);
}

export const DropdownUser = ({ showName, children }: DropdownUserProps) => {
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
      label: 'Orders',
      path: '/orders',
      icon: <ShoppingOutlined />,
    },
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
      {typeof children === 'function' ? (
        children(userState)
      ) : children ? (
        children
      ) : (
        <AvatarWithUsername
          showName={showName}
          name={userState?.fullName}
          avatar={userState?.avatar}
        />
      )}
    </ADropdown>
  );
};
