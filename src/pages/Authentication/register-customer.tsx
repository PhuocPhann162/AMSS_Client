import { useGetProvincesQuery, useRegisterUserMutation } from '@/api/app';
import { AButton, AInput, AInputPassword, ASelect } from '@/common/ui-common';
import { FormLabel } from '@/components/form-label';
import { SelectCountry } from '@/components/UI/select/select-country';
import { SelectPhoneCode } from '@/components/UI/select/select-phonecode';
import { cn } from '@/lib/utils';
import { type RegisterRequest } from '@/models';
import Form, { Rule } from 'antd/es/form';
import { useMemo, type FC, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface RegisterCustomerProps {
  defaultValue?: RegisterRequest;
}

type FormItemType<T> = {
  [K in keyof T]: {
    label: string;
    name: keyof T | (string & { readonly __brand?: 'customName' });
    initialValue?: T[K];
    rule?: Rule[];
    renderFormControl: ReactNode;
    classNames?: {
      wrapper?: string;
    };
  };
}[keyof T];

export const RegisterCustomer: FC<RegisterCustomerProps> = ({
  defaultValue,
}) => {
  const [form] = Form.useForm<RegisterRequest>();

  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();
  const getProvinces = useGetProvincesQuery();

  const provinceOptions = useMemo(() => {
    if (
      !getProvinces.isFetching &&
      !getProvinces.isError &&
      getProvinces.data
    ) {
      return getProvinces.data.result.map((province) => ({
        value: province.value,
        label: province.name,
      }));
    }
    return [];
  }, [getProvinces.data, getProvinces.isFetching, getProvinces.isError]);

  const formItems: FormItemType<RegisterRequest>[] = [
    {
      label: 'Full Name',
      name: 'fullName',
      rule: [{ required: true }],
      renderFormControl: (
        <AInput autoComplete='fullName' placeholder='Enter your name' />
      ),
    },
    {
      label: 'Email',
      name: 'userName',
      rule: [{ required: true, type: 'email' }],
      renderFormControl: (
        <AInput
          allowClear
          autoComplete='email'
          placeholder='Enter your email'
        />
      ),
    },
    {
      label: 'Password',
      name: 'password',
      rule: [{ required: true }],
      renderFormControl: (
        <AInputPassword
          autoComplete='new-password'
          placeholder='Enter your password'
        />
      ),
    },
    {
      label: 'Confirm Password',
      name: 'repeatPassword',
      rule: [{ required: true }],
      renderFormControl: (
        <AInputPassword
          autoComplete='new-password'
          placeholder='Confirm your password'
        />
      ),
    },
    {
      label: 'Country',
      name: 'country',
      rule: [{ required: true }],
      renderFormControl: <SelectCountry placeholder='Select your country' />,
    },
    {
      label: 'Province',
      name: 'provinceCode',
      rule: [{ required: true }],
      renderFormControl: (
        <ASelect options={provinceOptions} placeholder='Select your province' />
      ),
    },
    {
      label: 'Code',
      name: 'phoneCode',
      rule: [{ required: true }],
      renderFormControl: (
        <SelectPhoneCode placeholder='Select your phone code' />
      ),
      classNames: {
        wrapper: 'col-span-2',
      },
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      rule: [{ required: true }],
      renderFormControl: (
        <AInput
          allowClear
          autoComplete='phoneNumber'
          placeholder='Enter your phone number'
        />
      ),
      classNames: {
        wrapper: 'col-span-4',
      },
    },

    {
      label: 'Street Address',
      name: 'streetAddress',
      rule: [{ required: true }],
      renderFormControl: (
        <AInput
          allowClear
          autoComplete='street'
          placeholder='Enter your street address'
        />
      ),
    },
  ];

  const onFinish = async (values: RegisterRequest) => {
    try {
      console.log('[RegisterCustomer] [onFinish] submit values', values);
      await registerUser(values);
      navigate('/login');
    } catch (error) {
      console.error('[RegisterCustomer] [onFinish] submit error', error);
    }
  };

  return (
    <div className='flex w-96 max-w-full flex-col gap-4 rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0'>
      <p className='text-2xl font-bold'>Register</p>
      <Form form={form} initialValues={defaultValue} onFinish={onFinish}>
        <div className='flex flex-col gap-6'>
          <div className='grid grid-cols-6 gap-x-4 gap-y-2'>
            {formItems.map((item, index) => (
              <FormLabel
                key={`${index}_${item?.name}`}
                name={item?.name}
                label={item?.label as string}
                rules={item?.rule}
                classNames={{
                  root: cn('col-span-6', item?.classNames?.wrapper),
                }}
              >
                {item?.renderFormControl}
              </FormLabel>
            ))}
          </div>
          <AButton type='primary' block htmlType='submit'>
            Register
          </AButton>
        </div>
      </Form>
    </div>
  );
};
