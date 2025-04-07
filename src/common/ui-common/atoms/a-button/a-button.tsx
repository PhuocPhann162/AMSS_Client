import { cn } from '@/lib/utils';
import { type GetRef } from 'antd/es/_util/type';
import Button, { type ButtonProps } from 'antd/es/button';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AButtonProps extends ButtonProps {}

export type AButtonRef = GetRef<typeof Button>;

export const AButton = forwardRef<AButtonRef, AButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn('font-semibold', className)} {...props}>
        {props.children}
      </Button>
    );
  },
);
AButton.displayName = 'AButton';
