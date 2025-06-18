import { ADropdown } from '@/common/ui-common';
import { AvatarWithUsername } from '@/components/ui/avatar-with-username.';
import { clearAuth } from '@/features/auth/store/auth-slice';
import { Role, type User } from '@/interfaces';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import {
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
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

  const canAccessAdmin =
    userState?.role === Role.ADMIN ||
    userState?.role === Role.OWNER_FARM ||
    userState?.role === Role.SUPPLIER_COMMODITY ||
    userState?.role === Role.SUPPLIER_CROP;

  const handleLogOut = () => {
    dispatch(clearAuth());
    navigate('/');
  };

  const items = [
    canAccessAdmin
      ? {
          label: 'Admin',
          path: '/app/dashBoard',
          icon: <UserOutlined />,
        }
      : null,
    {
      label: 'Orders',
      path: '/orders',
      icon: <ShoppingOutlined />,
    },
    {
      label: 'My Profile',
      path: 'profile',
      icon: <UserOutlined />,
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
        items: items
          .filter((item) => !!item)
          .map((item) => {
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
