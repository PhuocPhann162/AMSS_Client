import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Radio,
  Tooltip,
  InputNumber,
  Divider,
  Spin,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FormLabel } from '@/components/form-label/form-label';
import { AButton } from '@/common/ui-common';
import {
  GrowLocationModel,
  PlantingFormatType,
} from '@/interfaces/growLocationModel';
import { farmModel } from '@/interfaces';

const { TextArea } = Input;
const { Option } = Select;

interface GrowLocationFormProps {
  onFinish: (values: GrowLocationModel) => void;
  initialValues?: Partial<GrowLocationModel>;
  isLoading?: boolean;
  farmsData?: farmModel[]; // Thêm prop farmsData
  isLoadingFarms?: boolean; // Thêm prop isLoadingFarms
}

const GrowLocationForm: React.FC<GrowLocationFormProps> = ({
  onFinish,
  initialValues,
  isLoading,
  farmsData = [], // Đặt giá trị mặc định là mảng rỗng
  isLoadingFarms = false, // Đặt giá trị mặc định là false
}) => {
  const [form] = Form.useForm();
  const [plantingFormat, setPlantingFormat] = useState<PlantingFormatType>(
    initialValues?.plantingFormat || 'beds',
  );

  const handlePlantingFormatChange = (e: any) => {
    setPlantingFormat(e.target.value);
  };

  const defaultValues: Partial<GrowLocationModel> = {
    locationType: 'Field',
    plantingFormat: 'beds',
    status: 'Planted',
    numberOfBeds: 5,
    bedLength: 100,
    bedWidth: 3,
  };

  const handleFinish = (values: GrowLocationModel) => {
    const processedValues = {
      ...values,
      numberOfBeds: values.numberOfBeds
        ? Number(values.numberOfBeds)
        : undefined,
      bedLength: values.bedLength ? Number(values.bedLength) : undefined,
      bedWidth: values.bedWidth ? Number(values.bedWidth) : undefined,
      grazingRestDays: values.grazingRestDays
        ? Number(values.grazingRestDays)
        : undefined,
    };

    onFinish(processedValues);
  };

  // // Thêm phần hiển thị danh sách farms
  // const renderFarmSelect = () => (
  //   <FormLabel
  //     name='farmId'
  //     label='Farm'
  //     rules={[{ required: true, message: 'Please select a farm' }]}
  //   >
  //     {isLoadingFarms ? (
  //       <Spin size='small' />
  //     ) : (
  //       <Select placeholder='Select a farm'>
  //         {farmsData.map((farm) => (
  //           <Option key={farm.id} value={farm.id}>
  //             {farm.name}
  //           </Option>
  //         ))}
  //       </Select>
  //     )}
  //   </FormLabel>
  // );

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleFinish}
      initialValues={defaultValues}
      className='max-w-4xl'
    >
      <div className='grid grid-cols-1 gap-6'>
        <FormLabel
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input placeholder='Example: Northwest Field' />
        </FormLabel>

        <div className='grid grid-cols-2 gap-6'>
          <FormLabel
            name='internalId'
            label='Internal Id'
            rules={[{ required: true, message: 'Please enter an internal ID' }]}
          >
            <Input
              placeholder='Example: F001'
              suffix={
                <Tooltip title='A unique identifier for internal reference'>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </FormLabel>

          <FormLabel
            name='locationType'
            label='Location Type'
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value='Field'>Field</Select.Option>
              <Select.Option value='Greenhouse'>Greenhouse</Select.Option>
              <Select.Option value='Garden'>Garden</Select.Option>
            </Select>
          </FormLabel>
        </div>

        <FormLabel
          name='plantingFormat'
          label='Planting Format'
          rules={[{ required: true }]}
        >
          <Radio.Group onChange={handlePlantingFormatChange} className='w-full'>
            <div className='grid grid-cols-4 gap-4'>
              <div
                className={`rounded-md border p-4 ${plantingFormat === 'beds' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white shadow-md'}`}
              >
                <Radio value='beds' className='w-full'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>≡</span>
                      <span className='font-medium'>Planted in Beds</span>
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      {`Defined number of beds for diverse crops. Often 100' length. Example: Carrots, Tomatoes, Spinach, etc. Plantings based on row length and count.`}
                    </p>
                  </div>
                </Radio>
              </div>

              <div
                className={`rounded-md border p-4 ${plantingFormat === 'cover' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white shadow-md'}`}
              >
                <Radio value='cover' className='w-full'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>■</span>
                      <span className='font-medium'>Cover Crop</span>
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      Complete crop coverage or grazing location. Example:
                      Alfalfa, Hay, Rye, Wheat, Pasture, etc. Planting coverage
                      based on location area.
                    </p>
                  </div>
                </Radio>
              </div>

              <div
                className={`rounded-md border p-4 ${plantingFormat === 'row' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white shadow-md'}`}
              >
                <Radio value='row' className='w-full'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>≋</span>
                      <span className='font-medium'>Row Crop</span>
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      One crop planted in rows wide enough to be cultivated by
                      machinery. Example: Corn, Soy, Beans, Hemp, Potatoes, etc.
                      Planting coverage based on location area.
                    </p>
                  </div>
                </Radio>
              </div>

              <div
                className={`rounded-md border p-4 ${plantingFormat === 'other' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white shadow-md'}`}
              >
                <Radio value='other' className='w-full'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>#</span>
                      <span className='font-medium'>Other</span>
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      Any alternative growing method. Example: Tree-nut,
                      aquaponics, plots, etc. Plantings based on specified
                      amount planted.
                    </p>
                  </div>
                </Radio>
              </div>
            </div>
          </Radio.Group>
        </FormLabel>

        {plantingFormat === 'beds' && (
          <>
            <div className='grid grid-cols-1 gap-6'>
              <FormLabel
                name='numberOfBeds'
                label='Number Of Beds'
                rules={[{ required: true }]}
              >
                <InputNumber min={1} className='w-full' />
              </FormLabel>

              <div className='grid grid-cols-2 gap-6'>
                <FormLabel
                  name='bedLength'
                  label='Bed Length'
                  rules={[
                    { required: true, message: 'Please enter bed length' },
                  ]}
                >
                  <div className='flex'>
                    <InputNumber min={1} className='flex-1' />
                    <div className='flex items-center rounded-r-md border border-l-0 bg-gray-100 px-4'>
                      Feet
                    </div>
                  </div>
                </FormLabel>

                <FormLabel
                  name='bedWidth'
                  label='Bed Width'
                  rules={[
                    { required: true, message: 'Please enter bed width' },
                  ]}
                >
                  <div className='flex'>
                    <InputNumber min={1} className='flex-1' />
                    <div className='flex items-center rounded-r-md border border-l-0 bg-gray-100 px-4'>
                      Feet
                    </div>
                  </div>
                </FormLabel>
              </div>
            </div>
          </>
        )}

        <div className='grid grid-cols-1 gap-6'>
          <div className='grid grid-cols-2 gap-6'>
            <FormLabel
              name='status'
              label='Status'
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value='Idle'>Idle</Select.Option>
                <Select.Option value='Planted'>Planted</Select.Option>
                <Select.Option value='Needs Care'>Needs Care</Select.Option>
                <Select.Option value='Awaiting Harvest'>
                  Awaiting Harvest
                </Select.Option>
                <Select.Option value='Harvesting'>Harvesting</Select.Option>
                <Select.Option value='Recovery Needed'>
                  Recovery Needed
                </Select.Option>
              </Select>
            </FormLabel>

            <FormLabel name='lightProfile' label='Light Profile'>
              <Select>
                <Select.Option value='Full Sun'>Full Sun</Select.Option>
                <Select.Option value='Partial Sun'>Partial Sun</Select.Option>
                <Select.Option value='Partial Shade'>
                  Partial Shade
                </Select.Option>
                <Select.Option value='Full Shade'>Full Shade</Select.Option>
              </Select>
            </FormLabel>
          </div>

          <FormLabel name='grazingRestDays' label='Grazing Rest Days'>
            <Input
              suffix={
                <Tooltip title='Number of days this location should rest between grazing'>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </FormLabel>

          <FormLabel name='description' label='Description'>
            <div className='relative'>
              <TextArea rows={4} placeholder='Describe this location' />
            </div>
          </FormLabel>
        </div>
      </div>
      <Divider style={{ borderColor: '#000000' }} />

      <div className='flex items-center justify-end gap-2'>
        <AButton onClick={() => form.resetFields()}>Reset</AButton>
        <AButton type='primary' htmlType='submit' loading={isLoading}>
          Save
        </AButton>
      </div>
    </Form>
  );
};

export default GrowLocationForm;
