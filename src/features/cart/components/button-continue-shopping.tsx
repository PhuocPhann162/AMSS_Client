import { AButton, type AButtonProps } from '@/common/ui-common';
import DoubleRightOutlined from '@ant-design/icons/lib/icons/DoubleRightOutlined';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ButtonContinueShoppingProps {
  children?: ReactNode;
  onClick?: AButtonProps['onClick'];
}

export const ButtonContinueShopping = ({
  children,
  onClick,
}: ButtonContinueShoppingProps) => {
  const navigate = useNavigate();

  return (
    <AButton
      type='primary'
      iconPosition='end'
      icon={<DoubleRightOutlined />}
      onClick={(e) => {
        onClick?.(e);

        navigate('/store');
      }}
    >
      {children ?? 'Continue Shopping'}
    </AButton>
  );
};
