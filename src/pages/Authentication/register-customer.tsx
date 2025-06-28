import { useGetProvincesQuery, useRegisterUserMutation } from '@/api';
import { AButton, AInput, AInputPassword, ASelect } from '@/common/ui-common';
import { FormLabel } from '@/components/form-label';
import { SelectCountry } from '@/components/UI/select/select-country';
import { SelectPhoneCode } from '@/components/UI/select/select-phonecode';
import { toastNotify } from '@/helper';
import { Country, Province } from '@/interfaces';
import { ROLE } from '@/interfaces/role/role';
import { cn } from '@/lib/utils';
import {
  RegisterResponse,
  RegisterSupplier,
  type RegisterRequest,
} from '@/models';
import Form, { Rule } from 'antd/es/form';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    condition?: () => boolean;
  };
}[keyof T];

export const RegisterCustomer: FC<RegisterCustomerProps> = ({
  defaultValue,
}) => {
  const [form] = Form.useForm<RegisterSupplier>();
  const country = Form.useWatch('country', form);
  const province = Form.useWatch('provinceCode', form);
  const [opsProvince, setOpsProvince] = useState<Province[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();
  const { data: provinceOptions, isLoading: isLoadingProvinces } =
    useGetProvincesQuery(country, {
      skip: !country,
    });

  const formItems: FormItemType<RegisterRequest>[] = [
    {
      label: 'Contact Name',
      name: 'contactName',
      rule: [{ required: true, max: 150 }],
      renderFormControl: (
        <AInput autoComplete='contactName' placeholder='Enter your name' />
      ),
    },
    {
      label: 'Email',
      name: 'userName',
      rule: [
        { required: true },
        {
          type: 'email',
          message: 'Please enter valid email format (name@fuco.com)',
        },
      ],
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
      rule: [
        { required: true },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords do not match'));
          },
        }),
      ],
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
      renderFormControl: (
        <SelectCountry
          placeholder='Select your country'
          onChange={(_, ops) => {
            form.setFieldValue('provinceCode', null);
            form.setFieldValue(
              'phoneCode',
              (ops as Country).phoneCode?.split(',')[0],
            );
            form.validateFields(['phoneCode']);
          }}
        />
      ),
      classNames: {
        wrapper: opsProvince.length > 0 ? 'col-span-3' : 'col-span-6',
      },
    },
    {
      label: 'Province',
      name: 'provinceCode',
      rule: [{ required: opsProvince.length > 0 }],
      renderFormControl: (
        <ASelect
          options={opsProvince}
          loading={isLoadingProvinces}
          fieldNames={{ value: 'value', label: 'name' }}
          optionFilterProp='name'
          placeholder='Select your province'
        />
      ),
      classNames: {
        wrapper: opsProvince.length > 0 ? 'col-span-3' : 'hidden',
      },
      condition: () => opsProvince.length > 0,
    },
    {
      label: 'Phone Code',
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
      rule: [
        {
          pattern: /^\d+$/,
          message: 'Phone Number must be numeric (allowed: 0-9)',
        },
        { required: true, max: 15 },
      ],
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
    // {
    //   label: 'Street Address',
    //   name: 'streetAddress',
    //   rule: [{ required: true }],
    //   renderFormControl: (
    //     <AInput
    //       allowClear
    //       autoComplete='street'
    //       placeholder='Enter your street address'
    //     />
    //   ),
    // },
  ];

  const onFinish = async (values: RegisterSupplier) => {
    setIsLoading(true);
    try {
      const response = await registerUser({
        ...values,
        role: ROLE.CUSTOMER,
        avatar: `https://ui-avatars.com/api/?name=${form.getFieldValue('contactName').trim()}&background=00c46a&color=fff`,
      }).unwrap();
      if (response.isSuccess) {
        toastNotify('Sign up successfully! Please login to continue');
        navigate('/login');
      }
    } catch (error) {
      const _error = error as { data?: RegisterResponse } | undefined;
      const errMessage = _error?.data?.errorMessages[0] || 'Something wrong';
      toastNotify(errMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (country) {
      setOpsProvince(provinceOptions?.result ?? []);
      const provinceValue = provinceOptions
        ? provinceOptions.result.find((x) => x.value === province)?.value
        : null;
      if (province) {
        form.setFieldValue('provinceCode', provinceValue);
      }
    } else {
      setOpsProvince([]);
      form.setFieldValue('provinceCode', null);
    }
  }, [country, provinceOptions, province, form]);

  return (
    <div className='flex min-w-[30rem] max-w-full flex-col gap-4 rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0'>
      <p className='text-2xl font-bold'>Sign up to Novaris</p>
      <Form form={form} initialValues={defaultValue} onFinish={onFinish}>
        <div className='flex flex-col gap-6'>
          <div className='grid grid-cols-6 gap-x-4 gap-y-2'>
            {formItems.map(
              (item, index) =>
                (item?.condition === undefined || item.condition()) && (
                  <FormLabel
                    key={`${index}_${item?.name}`}
                    name={item?.name}
                    label={item?.label as string}
                    rules={item?.rule}
                    classNames={{
                      root: cn('col-span-6', item?.classNames?.wrapper),
                      label: 'font-semibold',
                    }}
                  >
                    {item?.renderFormControl}
                  </FormLabel>
                ),
            )}
          </div>
          <AButton
            type='primary'
            className='bg-yellow-600'
            loading={isLoading}
            htmlType='submit'
          >
            Sign up
          </AButton>
        </div>
      </Form>
      <p className='w-full text-sm text-gray-500 dark:text-gray-400'>
        You already have an account?{' '}
        <Link
          to='/login'
          className='text-primary-600 font-medium hover:underline'
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
