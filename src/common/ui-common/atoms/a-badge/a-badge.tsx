import { type GetRef } from 'antd/es/_util/type';
import Badge, { type BadgeProps } from 'antd/es/badge';
import { forwardRef } from 'react';

export type ABadgeProps = BadgeProps;

export type ABadgeRef = GetRef<typeof Badge>;

export const ABadge = forwardRef<ABadgeRef, ABadgeProps>((props, ref) => {
  return <Badge ref={ref} {...props} />;
});
ABadge.displayName = 'ABadge';
