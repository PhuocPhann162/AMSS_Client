import { useEffect, useState } from 'react';
import { toastNotify } from '@/helper';
import type { RegisterResponse, RegisterSupplier } from '@/models';
import { AButton, AInput, ASelect } from '@/common/ui-common';
import { useRegisterUserMutation } from '@/api';
import { SelectPhoneCode } from '@/components/UI/select/select-phonecode';
import { SelectCountry } from '@/components/UI/select/select-country';
import { Country, Province } from '@/interfaces';
import { Col, Form, Row } from 'antd';
import { renderPlaceholder } from '@/helper/formHelper';
import { NOVARIS_ROLE_OPTIONS } from '@/constants/role.constants';
import MapboxAddressSearch, {
  AddressData,
} from '@/components/Page/Maps/MapBoxAddressSearch';
import { useGetProvincesQuery } from '@/api';
import { PageCommon } from '@/components/layout/page/page-common';

export const Register = () => {
  const [form] = Form.useForm<RegisterSupplier>();
  const [opsProvince, setOpsProvince] = useState<Province[]>([]);
  const country = Form.useWatch('country', form);
  const province = Form.useWatch('provinceCode', form);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null,
  );
  const { data: provinceOptions, isLoading: isLoadingProvinces } =
    useGetProvincesQuery(country, {
      skip: !country,
    });
  const handleAddressSelected = (address: AddressData | null) => {
    setSelectedAddress(address);
    form.setFieldValue('streetAddress', address?.fullAddress);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await registerUser({
        ...form.getFieldsValue(),
        streetAddress: selectedAddress?.fullAddress ?? '',
        avatar: `https://ui-avatars.com/api/?name=${form.getFieldValue('contactName').trim()}&background=00c46a&color=fff`,
        lat: selectedAddress?.coordinates.lat ?? 0,
        lng: selectedAddress?.coordinates.lng ?? 0,
      }).unwrap();
      toastNotify(
        response.successMessage ?? 'User registered successfully',
        'success',
      );
    } catch (error) {
      const _error = error as { data?: RegisterResponse } | undefined;
      const errMessage = _error?.data?.errorMessages[0] || 'Something wrong';
      toastNotify(errMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getOps = () => {
      setIsLoading(true);

      setOpsProvince(provinceOptions?.result ?? []);
      const provinceValue = provinceOptions
        ? provinceOptions.result.find((x) => x.value === province)?.value
        : null;
      if (province) {
        form.setFieldValue('provinceCode', provinceValue);
      }
      setIsLoading(false);
    };
    if (country) getOps();
    else {
      setOpsProvince([]);
    }
  }, [country, provinceOptions]);

  return (
    <PageCommon headerTitle='Registration'>
      <div className='mx-auto max-w-2xl rounded-lg border border-white bg-white px-6 py-6 shadow-lg'>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          autoComplete='off'
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name='contactName'
                label={'Contact Name'}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  },
                  { max: 150 },
                ]}
              >
                <AInput
                  placeholder={renderPlaceholder('input', 'ContactName', true)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='companyName'
                label={'Company Name'}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  },
                  { max: 150 },
                ]}
              >
                <AInput
                  placeholder={renderPlaceholder('input', 'CompanyName', true)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='userName'
                label={'Email Address'}
                rules={[
                  { required: true },
                  {
                    type: 'email',
                    message: 'Please enter valid email format (name@fuco.com)',
                  },
                ]}
              >
                <AInput
                  placeholder={renderPlaceholder(
                    'input',
                    'Emaill Address',
                    true,
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={opsProvince?.length > 0 ? 12 : 24}>
              <Form.Item
                name='country'
                label={'Country'}
                rules={[{ required: true }]}
              >
                <SelectCountry
                  placeholder={renderPlaceholder('select', 'Country', true)}
                  onChange={(_, ops) => {
                    form.setFieldValue('provinceCode', null);
                    form.setFieldValue(
                      'phoneCode',
                      (ops as Country).phoneCode?.split(',')[0],
                    );
                    form.validateFields(['phoneCode']);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={opsProvince.length > 0 ? 12 : 0}>
              <Form.Item name='provinceCode' label={'Province'}>
                <ASelect
                  options={opsProvince}
                  loading={isLoadingProvinces}
                  fieldNames={{ value: 'value', label: 'name' }}
                  optionFilterProp='name'
                  placeholder={renderPlaceholder('select', 'Province', true)}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name='phoneCode'
                label={'Phone Code'}
                rules={[{ required: true }]}
              >
                <SelectPhoneCode
                  placeholder={renderPlaceholder('select', 'Phone Code', true)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='phoneNumber'
                label={'Contact Number'}
                rules={[
                  {
                    pattern: /^\d+$/,
                    message: 'Contact Number must be numeric (allowed: 0-9)',
                  },
                  { required: true, max: 15 },
                ]}
              >
                <AInput
                  placeholder={renderPlaceholder(
                    'input',
                    'Contact Number',
                    true,
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='role'
                label={'Role'}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <ASelect
                  placeholder={renderPlaceholder('select', 'Role', true)}
                  options={NOVARIS_ROLE_OPTIONS}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name='streetAddress'
                label={'Street Address'}
                rules={[{ required: true, max: 255 }]}
              >
                <AInput
                  placeholder={renderPlaceholder(
                    'input',
                    'Street Address',
                    true,
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <MapboxAddressSearch
            onAddressSelected={handleAddressSelected}
            placeholder='Search your address...'
          />
          <Form.Item className='mt-5 flex justify-center'>
            <AButton
              type='primary'
              variant='solid'
              loading={isLoading}
              color='default'
              htmlType='submit'
            >
              Submit
            </AButton>
          </Form.Item>
        </Form>
      </div>
    </PageCommon>
  );
};
