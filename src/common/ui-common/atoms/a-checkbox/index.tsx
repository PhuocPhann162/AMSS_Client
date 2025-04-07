import Checkbox, {
  type CheckboxProps,
  type CheckboxRef,
} from 'antd/es/checkbox';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ACheckboxProps extends CheckboxProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ACheckboxRef extends CheckboxRef {}

export const ACheckbox = forwardRef<ACheckboxRef, ACheckboxProps>(
  ({ ...props }, ref) => <Checkbox ref={ref} {...props} />,
);
ACheckbox.displayName = 'ACheckbox';
