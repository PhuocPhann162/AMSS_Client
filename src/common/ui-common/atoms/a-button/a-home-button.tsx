import { type GetRef } from 'antd/es/_util/type';
import Button, { type ButtonProps } from 'antd/es/button';
import { forwardRef } from 'react';

export type AButtonProps = ButtonProps;

export type AButtonRef = GetRef<typeof Button>;

export const AHomeButton = forwardRef<AButtonRef, AButtonProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />;
  },
);
AHomeButton.displayName = 'AHomeButton';
