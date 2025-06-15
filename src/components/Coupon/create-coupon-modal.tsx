import { useState } from 'react';
import { Form, Input, InputNumber, DatePicker } from 'antd';
import { CreateCouponRequest } from '@/models/request/coupon/create-coupon-request';
import dayjs, { Dayjs } from 'dayjs';
import { FaDollarSign, FaPercentage, FaTicketAlt } from 'react-icons/fa';
import { AModal } from '@/common/ui-common';
import { HiTicket } from 'react-icons/hi';

interface CreateCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCouponRequest) => void;
}

export const CreateCouponModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateCouponModalProps) => {
  const [form] = Form.useForm<CreateCouponRequest & { expiration: Dayjs }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      const formattedData: CreateCouponRequest = {
        code: values.code,
        discountAmount: values.discountAmount,
        minAmount: values.minAmount,
        expiration: values.expiration.toDate(),
        title: values.title,
        description: values.description,
      };
      onSubmit(formattedData);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <AModal
      title={
        <p className='flex items-center gap-2'>
          <FaTicketAlt /> Create New Coupon
        </p>
      }
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={isSubmitting}
      okText='Create'
      cancelText='Cancel'
      width={600}
      style={{ top: 20 }}
    >
      <Form form={form} layout='vertical' className='mt-4'>
        <Form.Item
          name='code'
          label='Coupon Code'
          rules={[
            { required: true, message: 'Please enter coupon code' },
            { min: 3, message: 'Coupon code must be at least 3 characters' },
          ]}
        >
          <Input placeholder='Enter coupon code' />
        </Form.Item>

        <Form.Item
          name='title'
          label='Title'
          rules={[
            { required: true, message: 'Please enter coupon title' },
            { min: 3, message: 'Title must be at least 3 characters' },
          ]}
        >
          <Input placeholder='Enter coupon title' />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[
            { required: true, message: 'Please enter coupon description' },
            { min: 10, message: 'Description must be at least 10 characters' },
          ]}
        >
          <Input.TextArea
            placeholder='Enter coupon description'
            rows={4}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          name='discountAmount'
          label='Discount Amount Percentage'
          rules={[
            { required: true, message: 'Please enter discount amount' },
            {
              type: 'number',
              min: 10,
              max: 100,
              message: 'Discount amount must be between 10 and 100',
            },
          ]}
        >
          <InputNumber
            className='w-full'
            placeholder='Enter discount amount percentage'
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            prefix={<FaPercentage />}
            parser={(value) => {
              const parsed = value!.replace(/\$\s?|(,*)/g, '');
              const num = parsed ? Number(parsed) : 10;
              return Math.min(Math.max(num, 10), 100) as 10 | 100;
            }}
            min={10}
            max={100}
            step={10}
          />
        </Form.Item>

        <Form.Item
          name='minAmount'
          label='Minimum Amount'
          rules={[
            { required: true, message: 'Please enter minimum amount' },
            {
              type: 'number',
              min: 0,
              message: 'Minimum amount must be greater than 0',
            },
          ]}
        >
          <InputNumber
            className='w-full'
            placeholder='Enter minimum amount'
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            prefix={<FaDollarSign />}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name='expiration'
          label='Expiration Date'
          rules={[
            { required: true, message: 'Please select expiration date' },
            {
              validator: (_, value) => {
                if (value && value.isBefore(dayjs())) {
                  return Promise.reject(
                    new Error('Expiration date must be in the future'),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            className='w-full'
            showTime
            format='YYYY-MM-DD HH:mm:ss'
            placeholder='Select expiration date and time'
          />
        </Form.Item>
      </Form>
    </AModal>
  );
};
