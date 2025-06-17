import type { ButtonProps } from 'antd/es/button';
import Button from 'antd/es/button';
import type { HTMLAttributeAnchorTarget } from 'react';
import { Link } from 'react-router-dom';

interface LinkButtonProps extends Omit<ButtonProps, 'href'> {
  to: string;
  replace?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export const LinkButton = ({
  to,
  replace,
  target,
  children,
  ...buttonProps
}: LinkButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Link
        to={to}
        replace={replace}
        target={target}
        className='absolute inset-0'
      />
      {children}
    </Button>
  );
};
