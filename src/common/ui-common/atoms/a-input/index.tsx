import { Input, InputProps, InputRef } from 'antd';
import { forwardRef, Ref } from 'react';

type AInputProps = InputProps;

const AInput = forwardRef<InputRef, AInputProps>((props, ref: Ref<InputRef>) => <Input {...props} ref={ref} />);

AInput.displayName = 'AInput';
export { AInput };
