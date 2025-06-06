import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import {
  QuantityCounterInput,
  type QuantityCounterInputProps,
} from '@/features/cart/components/quantity-counter-input';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type QuantitySelectorProps = HTMLAttributes<HTMLDivElement> & {
  size?: SizeType;
  onQuantityChange?: QuantityCounterInputProps['onQuantityChange'];
  onClear?: () => void;
  defaultQuantity?: QuantityCounterInputProps['defaultQuantity'];
  quantity?: QuantityCounterInputProps['quantity'];
  min?: QuantityCounterInputProps['min'];
  max?: QuantityCounterInputProps['max'];
};

export const QuantitySelector = ({
  size,
  onQuantityChange,
  onClear,
  defaultQuantity,
  quantity,
  min,
  max,
  ...props
}: QuantitySelectorProps) => {
  return (
    <div
      {...props}
      className={twMerge('flex items-center gap-2', props.className)}
    >
      <QuantityCounterInput
        defaultQuantity={defaultQuantity}
        quantity={quantity}
        size={size}
        min={min}
        max={max}
        onQuantityChange={onQuantityChange}
      />
      <AHomeButton
        icon={<CloseOutlined />}
        size={size}
        variant='text'
        color='primary'
        shape='circle'
        onClick={onClear}
      />
    </div>
  );
};
