import { Tooltip } from 'antd';
import Input, { type InputProps, type InputRef } from 'antd/es/input';
import clsx from 'clsx';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AInputProps extends InputProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AInputRef extends InputRef {}

export const AInput = forwardRef<AInputRef, AInputProps>((props, ref) => {
  const { value, ...restProps } = props;

  return (
    <Tooltip
      title={
        typeof value === 'string' && value.length > 100 ? value : undefined
      }
      placement='top'
    >
      <Input
        style={{
          fontSize: props.size === 'large' ? '1rem' : '0.875rem',
          padding:
            props.size === 'large' ? '0.4375rem 0.75rem' : '0.25rem 0.75rem',
        }}
        {...restProps}
        className={clsx('rounded-md', props.className)}
        value={value}
        ref={ref}
      />
    </Tooltip>
  );
});
AInput.displayName = 'AInput';
