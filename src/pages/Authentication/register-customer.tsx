import { useGetProvincesQuery, useRegisterUserMutation } from '@/api';
import { AButton, AInput, AInputPassword, ASelect } from '@/common/ui-common';
import { FormLabel } from '@/components/form-label';
import { SelectCountry } from '@/components/UI/select/select-country';
import { SelectPhoneCode } from '@/components/UI/select/select-phonecode';
import { Province } from '@/interfaces';
import { cn } from '@/lib/utils';
import { RegisterSupplier, type RegisterRequest } from '@/models';
import Form, { Rule } from 'antd/es/form';
import { useEffect, useMemo, useState, type FC, type ReactNode } from 'react';
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
  const [form] = Form.useForm<RegisterSupplier>();
  const country = Form.useWatch('country', form);
  const province = Form.useWatch('provinceCode', form);
  const [opsProvince, setOpsProvince] = useState<Province[]>([]);

  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();
  const { data: provinceOptions, isLoading: isLoadingProvinces } =
    useGetProvincesQuery(country, {
      skip: !country,
    });

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
        <ASelect options={opsProvince} placeholder='Select your province' />
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

  const onFinish = async (values: RegisterSupplier) => {
    try {
      console.log('[RegisterCustomer] [onFinish] submit values', values);
      await registerUser(values);
      navigate('/login');
    } catch (error) {
      console.error('[RegisterCustomer] [onFinish] submit error', error);
    }
  };

  useEffect(() => {
    const getOps = () => {
      setOpsProvince(provinceOptions?.result ?? []);
      const provinceValue = provinceOptions
        ? provinceOptions.result.find((x) => x.value === province)?.value
        : null;
      if (province) {
        form.setFieldValue('provinceCode', provinceValue);
      }
    };
    if (country) getOps();
    else {
      setOpsProvince([]);
    }
  }, [country, provinceOptions]);

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
