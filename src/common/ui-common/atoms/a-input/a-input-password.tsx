import { type GetRef } from 'antd/es/_util/type';
import Input, { type PasswordProps } from 'antd/es/input';
import { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AInputPasswordProps extends PasswordProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AInputPasswordRef extends GetRef<typeof Input.Password> {}

export const AInputPassword = forwardRef<
  AInputPasswordRef,
  AInputPasswordProps
>((props, ref) => <Input.Password ref={ref} {...props} />);
AInputPassword.displayName = 'AInputPassword';
