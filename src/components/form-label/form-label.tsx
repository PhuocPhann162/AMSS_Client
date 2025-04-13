import {
  FormControlWrap,
  FormControlWrapProps,
} from '@/components/form-label/form-control-wrap';
import { Label } from '@/components/form-label/label';
import { cn } from '@/lib/utils';
import Form from 'antd/es/form';
import { type FC, type ReactNode, useMemo } from 'react';

export interface FormLabelProps {
  name?: string;
  label: string;
  rules?: FormControlWrapProps['rules'];
  colon?: boolean;
  classNames?: Partial<Record<'root' | 'label' | 'control', string>>;
  children: ReactNode;
  layout?: 'vertical' | 'horizontal';
}

export const FormLabel: FC<FormLabelProps> = ({
  name,
  label,
  rules,
  colon,
  classNames,
  children,
  layout = 'vertical',
}) => {
  const form = Form.useFormInstance();

  const required = useMemo(() => {
    if (rules) {
      return rules.some((rule) => {
        if (typeof rule === 'object') {
          return rule.required;
        }
        if (typeof rule === 'function') {
          return rule(form).required;
        }
        return false;
      });
    }
    return false;
  }, [form, rules]);

  return (
    <div
      className={cn(
        'flex gap-1',
        layout === 'vertical' ? 'flex-col' : '',
        classNames?.root,
      )}
    >
      <Label
        name={name}
        colon={colon}
        required={required}
        classNames={{ root: classNames?.label }}
      >
        {label}
      </Label>
      <FormControlWrap
        name={name}
        rules={rules}
        classNames={{ root: classNames?.control }}
      >
        {children}
      </FormControlWrap>
    </div>
  );
};
