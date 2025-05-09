import { type GetRef } from 'antd/es/_util/type';
import Badge, { type BadgeProps } from 'antd/es/badge';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ABadgeProps extends BadgeProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ABadgeRef extends GetRef<typeof Badge> {}

export const ABadge = forwardRef<ABadgeRef, ABadgeProps>(
  ({ ...props }, ref) => {
    return <Badge ref={ref} {...props} />;
  },
);
ABadge.displayName = 'ABadge';
