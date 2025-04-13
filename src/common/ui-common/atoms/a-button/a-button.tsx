import { type GetRef } from 'antd/es/_util/type';
import Button, { type ButtonProps } from 'antd/es/button';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AButtonProps extends ButtonProps {}

export type AButtonRef = GetRef<typeof Button>;

const AButton = forwardRef<AButtonRef, AButtonProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <Button
      style={{
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        height: 'auto',
        padding: '0.25rem 1rem',
        fontSize: props.size === 'large' ? '1rem' : '0.875rem',
      }}
      className={twMerge('rounded-md font-semibold', className)}
      {...rest}
      ref={ref}
    >
      {props.children}
    </Button>
  );
});

AButton.displayName = 'AButton';
export { AButton };
