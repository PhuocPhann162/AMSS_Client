import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import InputNumber from 'antd/es/input-number';
import { useState, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type QuantityCounterInputProps = HTMLAttributes<HTMLDivElement> & {
  defaultQuantity?: number;
  quantity?: number;
  min?: number;
  max?: number;
  size?: SizeType;
  onQuantityChange?: (value: number) => void;
};

export const QuantityCounterInput = ({
  defaultQuantity = 1,
  quantity,
  min,
  max,
  size,
  onQuantityChange,
  ...props
}: QuantityCounterInputProps) => {
  const [internalValue, setInternalValue] = useState(defaultQuantity);
  const currentValue = quantity ?? internalValue;

  const updateQuantity = (value: number) => {
    setInternalValue(value);
    onQuantityChange?.(value);
  };

  const updateQuantityLogic = (value?: number | null) => {
    if (typeof value !== 'number') {
      if (typeof min === 'number') {
        updateQuantity(min);
        return;
      }

      updateQuantity(1);
      return;
    }

    if (typeof min === 'number' && value < min) {
      updateQuantity(min);
      return;
    }

    if (typeof max === 'number' && value > max) {
      updateQuantity(max);
      return;
    }

    updateQuantity(value);
  };

  return (
    <div
      {...props}
      className={twMerge(
        'flex items-center gap-1 rounded-full bg-white1 p-1 shadow-md',
        props.className,
      )}
    >
      <AHomeButton
        disabled={typeof min === 'number' && currentValue <= min}
        icon={<MinusOutlined />}
        shape='circle'
        size={size}
        color='primary'
        variant='text'
        onClick={() => {
          updateQuantityLogic(currentValue - 1);
        }}
      />
      <InputNumber
        controls={false}
        style={{ width: '2.75rem' }}
        variant={'borderless'}
        rootClassName='[&.ant-input-number_input]:text-center [&.ant-input-number_input]:font-bold'
        value={currentValue}
        size={size}
        onChange={(value) => {
          updateQuantityLogic(value);
        }}
      />
      <AHomeButton
        disabled={typeof max === 'number' && currentValue >= max}
        icon={<PlusOutlined />}
        shape='circle'
        color='primary'
        variant='text'
        size={size}
        onClick={() => {
          updateQuantityLogic(currentValue + 1);
        }}
      />
    </div>
  );
};
