import { Checkbox, CheckboxProps, CheckboxRef } from 'antd';
import { forwardRef, Ref } from 'react';

type ACheckboxProps = CheckboxProps;

const ACheckbox = forwardRef<CheckboxRef, ACheckboxProps>((props, ref: Ref<CheckboxRef>) => (
  <Checkbox {...props} ref={ref} />
));

ACheckbox.displayName = 'ACheckbox';
export { ACheckbox };
