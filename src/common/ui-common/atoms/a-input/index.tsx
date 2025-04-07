import Input, { type InputProps, type InputRef } from 'antd/es/input';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AInputProps extends InputProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AInputRef extends InputRef {}

export const AInput = forwardRef<AInputRef, AInputProps>((props, ref) => (
  <Input ref={ref} {...props} />
));
AInput.displayName = 'AInput';
