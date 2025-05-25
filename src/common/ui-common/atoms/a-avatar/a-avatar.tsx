import type { GetRef } from 'antd/es/_util/type';
import type { AvatarProps } from 'antd/es/avatar';
import Avatar from 'antd/es/avatar';
import { forwardRef } from 'react';

export type AAvatarProps = AvatarProps;

export type AAvatarRef = GetRef<typeof Avatar>;

export const AAvatar = forwardRef<AAvatarRef, AAvatarProps>((props, ref) => (
  <Avatar ref={ref} {...props} />
));
AAvatar.displayName = 'AAvatar';
