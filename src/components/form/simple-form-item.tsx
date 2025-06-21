import { Form, type FormItemProps } from 'antd';
import { twMerge } from 'tailwind-merge';

export type SimpleFormItemProps<T = unknown> = FormItemProps<T>;

export const SimpleFormItem = <T = unknown,>(props: SimpleFormItemProps<T>) => {
  return <Form.Item {...props} className={twMerge('mb-0', props.className)} />;
};
