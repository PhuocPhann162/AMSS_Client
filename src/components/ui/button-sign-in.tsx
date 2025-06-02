import { AButton, type AButtonProps } from '@/common/ui-common';
import { Link } from 'react-router-dom';

export interface ButtonSignInProps {
  buttonProps?: AButtonProps;
  rootClassName?: string;
}

export const ButtonSignIn = ({
  buttonProps,
  rootClassName,
}: ButtonSignInProps) => {
  return (
    <Link to={'login'} className={rootClassName}>
      <AButton {...buttonProps}>Sign in</AButton>
    </Link>
  );
};
