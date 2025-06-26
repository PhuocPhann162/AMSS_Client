import { useCreateCommodityMutation } from '@/api';
import { AButton, AInput, ASelect } from '@/common/ui-common';
import { FormLabel } from '@/components/form-label';
import { toastNotify } from '@/helper';
import { cn } from '@/lib/utils';
import {
  COMMODITIES_CATEGORY_SEGMENTED,
  COMMODITY_STATUS_FILTER,
} from '@/helper/descriptionItems';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import dayjs from 'dayjs';
import type { CreateCommodityRequest } from '@/api/commodity-api';
import TextArea from 'antd/es/input/TextArea';
import { PageCommon } from '@/components/layout/page/page-common';
import { apiResponse } from '@/interfaces';

export function CreateCommodity() {
  const [form] = Form.useForm<CreateCommodityRequest>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [createCommodity] = useCreateCommodityMutation();

  const formItems = [
    {
      label: 'Name',
      name: 'name',
      rule: [{ required: true, message: 'Please enter commodity name' }],
      renderFormControl: <AInput placeholder='Enter commodity name' />,
    },
    {
      label: 'Description',
      name: 'description',
      rule: [{ required: true, message: 'Please enter description' }],
      renderFormControl: (
        <TextArea placeholder='Enter description' rows={4} className='w-full' />
      ),
    },
    {
      label: 'Special Tag',
      name: 'specialTag',
      renderFormControl: <AInput placeholder='Enter special tag (optional)' />,
    },
    {
      label: 'Category',
      name: 'category',
      rule: [{ required: true, message: 'Please select category' }],
      renderFormControl: (
        <ASelect
          options={COMMODITIES_CATEGORY_SEGMENTED}
          placeholder='Select category'
        />
      ),
    },
    {
      label: 'Price',
      name: 'price',
      rule: [{ required: true, message: 'Please enter price' }],
      renderFormControl: (
        <AInput
          min={0}
          step={0.01}
          prefix='$'
          placeholder='Enter price'
          className='w-full'
        />
      ),
    },
    {
      label: 'Expiration Date',
      name: 'expirationDate',
      rule: [{ required: true, message: 'Please select expiration date' }],
      renderFormControl: (
        <DatePicker
          className='w-full'
          placeholder='Select expiration date'
          disabledDate={(current) =>
            current && current < dayjs().startOf('day')
          }
        />
      ),
    },
    {
      label: 'Status',
      name: 'status',
      rule: [{ required: true, message: 'Please select status' }],
      renderFormControl: (
        <ASelect
          options={COMMODITY_STATUS_FILTER}
          placeholder='Select status'
        />
      ),
    },
    {
      label: 'Supplier ID',
      name: 'supplierId',
      rule: [{ required: true, message: 'Please enter supplier ID' }],
      renderFormControl: <AInput placeholder='Enter supplier ID' />,
    },
    {
      label: 'Crop ID',
      name: 'cropId',
      rule: [{ required: true, message: 'Please enter crop ID' }],
      renderFormControl: <AInput placeholder='Enter crop ID' />,
    },
    {
      label: 'Image',
      name: 'image',
      rule: [{ required: true, message: 'Please upload an image' }],
      renderFormControl: (
        <Upload
          listType='picture'
          maxCount={1}
          fileList={fileList}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error('You can only upload image files!');
              return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              message.error('Image must be smaller than 2MB!');
              return false;
            }
            return false;
          }}
          onChange={({ fileList }) => {
            setFileList(fileList);
            if (fileList.length > 0) {
              const reader = new FileReader();
              reader.onload = (e) => {
                form.setFieldValue('image', e.target?.result as string);
              };
              reader.readAsDataURL(fileList[0].originFileObj as Blob);
            } else {
              form.setFieldValue('image', undefined);
            }
          }}
        >
          <AButton icon={<UploadOutlined />}>Upload Image</AButton>
        </Upload>
      ),
    },
  ];

  const onFinish = async (values: CreateCommodityRequest) => {
    setIsLoading(true);
    try {
      const response = await createCommodity({
        ...values,
        expirationDate: values.expirationDate,
      }).unwrap();

      if (response.isSuccess) {
        toastNotify('Commodity created successfully!');
        navigate('/commodities');
      }
    } catch (error) {
      const errMessage =
        (error as apiResponse)?.data?.errorMessages?.[0] ||
        'Something went wrong';
      toastNotify(errMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageCommon
      headerTitle='Create New Commodity'
      renderHeader={(HeaderComp, title) => (
        <HeaderComp className='flex items-center justify-between'>
          {title}
        </HeaderComp>
      )}
    >
      <div className='flex flex-col gap-4'>
        <div className='mx-auto flex min-w-[60rem] max-w-full flex-col gap-4 rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0'>
          <Form form={form} onFinish={onFinish}>
            <div className='flex flex-col gap-6'>
              <div className='grid grid-cols-1 gap-x-4 gap-y-2'>
                {formItems.map((item, index) => (
                  <FormLabel
                    key={`${index}_${item.name}`}
                    name={item.name}
                    label={item.label}
                    rules={item.rule}
                    classNames={{
                      root: cn('col-span-1'),
                      label: 'font-semibold',
                    }}
                  >
                    {item.renderFormControl}
                  </FormLabel>
                ))}
              </div>

              <div className='flex gap-4'>
                <AButton
                  type='primary'
                  className='bg-yellow-600'
                  loading={isLoading}
                  htmlType='submit'
                >
                  Create Commodity
                </AButton>

                <AButton onClick={() => navigate('/app/commodity/managment')}>
                  Cancel
                </AButton>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </PageCommon>
  );
}
