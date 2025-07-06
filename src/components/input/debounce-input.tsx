import { Input, type InputProps } from 'antd';
import { useEffect, useRef } from 'react';

export interface DebounceInputProps extends Omit<InputProps, 'value'> {
  delay?: number;
}

export const DebounceInput = ({
  delay = 300,
  ...props
}: DebounceInputProps) => {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleClearTimeout = (timer?: NodeJS.Timeout) => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  const handleChange: InputProps['onChange'] = (e) => {
    handleClearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      props.onChange?.(e);
    }, delay);
  };

  useEffect(() => {
    return () => {
      handleClearTimeout(timerRef.current);
    };
  }, []);

  return <Input {...props} onChange={handleChange} />;
};
