import { cn } from '@/lib/utils';
import Menu, { type MenuProps, type MenuRef } from 'antd/es/menu';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AMenuProps extends MenuProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AMenuRef extends MenuRef {}

export const AMenu = forwardRef<AMenuRef, AMenuProps>(
  ({ rootClassName, ...props }, ref) => {
    return (
      <Menu
        ref={ref}
        rootClassName={cn('overflow-y-auto', rootClassName)}
        {...props}
      />
    );
  },
);
AMenu.displayName = 'AMenu';
