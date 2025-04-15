import Select, { type RefSelectProps, type SelectProps } from 'antd/es/select';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ASelectProps extends SelectProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ASelectRef extends RefSelectProps {}

export const ASelect = forwardRef<ASelectRef, ASelectProps>((props, ref) => (
  <Select
    optionFilterProp='label'
    showSearch
    allowClear
    style={{
      height:
        props.size === 'large'
          ? '2.5rem'
          : props.size === 'small'
            ? '1.375rem'
            : '2rem',
      fontSize: props.size === 'large' ? '1rem' : '0.875rem',
    }}
    {...props}
    ref={ref}
    getPopupContainer={() => document.querySelector('article')!}
  />
));
ASelect.displayName = 'ASelect';
