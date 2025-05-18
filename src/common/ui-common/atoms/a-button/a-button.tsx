import { type GetRef } from 'antd/es/_util/type';
import Button, { type ButtonProps } from 'antd/es/button';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type AButtonProps = ButtonProps;

export type AButtonRef = GetRef<typeof Button>;

export const AButton = forwardRef<AButtonRef, AButtonProps>((props, ref) => {
  return (
    <Button
      {...props}
      style={{
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        height: 'auto',
        padding: '0.25rem 1rem',
        fontSize: props.size === 'large' ? '1rem' : '0.875rem',
        ...props.style,
      }}
      className={twMerge('rounded-md font-semibold', props.className)}
      ref={ref}
    >
      {props.children}
    </Button>
  );
});
AButton.displayName = 'AButton';
