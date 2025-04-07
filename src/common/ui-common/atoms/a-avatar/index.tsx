import { type GetRef } from 'antd/es/_util/type';
import Avatar, { type AvatarProps } from 'antd/es/avatar';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AAvatarProps extends AvatarProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AAvatarRef extends GetRef<typeof Avatar> {}

export const AAvatar = forwardRef<AAvatarRef, AAvatarProps>((props, ref) => (
  <Avatar ref={ref} {...props} />
));
AAvatar.displayName = 'AAvatar';
