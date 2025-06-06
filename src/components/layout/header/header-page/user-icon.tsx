import UserOutlined from '@ant-design/icons/UserOutlined';
import type { GetProps, GetRef } from 'antd/es/_util/type';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type UserIconRef = GetRef<typeof UserOutlined>;

type UserIconProps = GetProps<typeof UserOutlined>;

export const UserIcon = forwardRef<UserIconRef, UserIconProps>((props, ref) => {
  return (
    <UserOutlined
      ref={ref}
      {...props}
      className={twMerge('cursor-pointer p-2', props.className)}
    />
  );
});
UserIcon.displayName = 'UserIcon';
