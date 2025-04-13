import { cn } from '@/lib/utils';
import { FormItemProps } from 'antd/es/form';
import FormItem from 'antd/es/form/FormItem';
import { FC } from 'react';

export interface FormControlWrapProps
  extends Pick<FormItemProps, 'children' | 'name' | 'rules'> {
  classNames?: Partial<Record<'root', string>>;
}

export const FormControlWrap: FC<FormControlWrapProps> = ({
  children,
  name,
  rules,
  classNames,
}) => {
  return (
    <FormItem
      name={name}
      rules={rules}
      className={cn('mb-0', classNames?.root)}
    >
      {children}
    </FormItem>
  );
};
