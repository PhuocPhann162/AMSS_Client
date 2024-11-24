import { Button, ButtonProps } from 'antd';
import { forwardRef, Ref } from 'react';
import { twMerge } from 'tailwind-merge';

type AButtonProps = ButtonProps;

const AButton = forwardRef<HTMLButtonElement, AButtonProps>((props, ref: Ref<HTMLButtonElement>) => {
  const { className, ...rest } = props;
  return (
    <Button className={twMerge('font-semibold', className)} {...rest} ref={ref}>
      {props.children}
    </Button>
  );
});

AButton.displayName = 'AButton';
export { AButton };
