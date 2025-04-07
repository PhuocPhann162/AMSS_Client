import Select, { type RefSelectProps, type SelectProps } from 'antd/es/select';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ASelectProps extends SelectProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ASelectRef extends RefSelectProps {}

export const ASelect = forwardRef<ASelectRef, ASelectProps>((props, ref) => (
  <Select ref={ref} {...props} />
));
ASelect.displayName = 'ASelect';
