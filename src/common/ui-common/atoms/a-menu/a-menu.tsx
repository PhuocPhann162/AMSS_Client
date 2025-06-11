import { cn } from '@/lib/utils';
import Menu, { type MenuProps, type MenuRef } from 'antd/es/menu';
import { forwardRef } from 'react';

export type AMenuProps = MenuProps;

export type AMenuRef = MenuRef;

export const AMenu = forwardRef<AMenuRef, AMenuProps>((props, ref) => {
  return (
    <Menu
      ref={ref}
      {...props}
      rootClassName={cn('overflow-y-auto', props.rootClassName)}
    />
  );
});
AMenu.displayName = 'AMenu';
