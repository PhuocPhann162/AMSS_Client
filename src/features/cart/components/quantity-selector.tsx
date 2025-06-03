import { AButton } from '@/common/ui-common';
import { cn } from '@/lib/utils';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import RestOutlined from '@ant-design/icons/RestOutlined';
import InputNumber from 'antd/es/input-number';
import { useState } from 'react';

export interface QuantitySelectorProps {
  defaultValue?: number;
  enableClear?: boolean;
  disabled?: boolean;
  onClear?: () => void;
  onChange?: (value: number) => void;
  rootClassName?: string;
}

export const QuantitySelector = ({
  defaultValue = 1,
  enableClear,
  disabled,
  onClear,
  onChange,
  rootClassName,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(defaultValue);

  const updateQuantity = (value: number) => {
    setQuantity(value);
    onChange?.(value);
  };

  return (
    <div className={cn('flex items-center gap-1', rootClassName)}>
      <AButton
        icon={
          quantity === 1 && enableClear ? <RestOutlined /> : <MinusOutlined />
        }
        danger
        type={'text'}
        disabled={disabled}
        onClick={() => {
          if (quantity > 1) {
            updateQuantity(quantity - 1);
          } else {
            onClear?.();
          }
        }}
      />
      <InputNumber
        controls={false}
        disabled={disabled}
        style={{ width: 60 }}
        rootClassName='[&.ant-input-number_input]:text-center'
        value={quantity}
        onChange={(value) => {
          if (value === null || value <= 0) {
            updateQuantity(1);
            return;
          }

          updateQuantity(value);
        }}
      />
      <AButton
        icon={<PlusOutlined />}
        type='text'
        disabled={disabled}
        onClick={() => updateQuantity(quantity + 1)}
      />
    </div>
  );
};
