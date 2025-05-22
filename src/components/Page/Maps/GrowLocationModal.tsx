import React, { useEffect } from 'react';
import { Form, Input, ColorPicker } from 'antd';
import { AInput, AModal, ASelect } from '@/common/ui-common';
import { farmModel, locationModel, pointModel } from '@/interfaces';
import * as turf from '@turf/turf';
import { Option } from 'antd/es/mentions';

const { TextArea } = Input;

interface GrowLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  location: locationModel;
  area: number;
  points: pointModel[];
  fieldName?: string;
  farmsData?: farmModel[];
}

interface GrowLocationFormState {
  name: string;
  color: string;
  farmId: string;
  growLocation: string;
}

export interface CreateGrowLocationFieldRequest extends GrowLocationFormState {
  area: number;
  location: locationModel;
  points: pointModel[];
}

const GrowLocationModal: React.FC<GrowLocationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  location,
  area,
  points,
  fieldName,
  farmsData = [],
}) => {
  const [form] = Form.useForm<GrowLocationFormState>();

  useEffect(() => {
    if (isOpen && location?.address) {
      form.setFieldsValue({
        growLocation: location.address,
        color: '#4bc552',
      });
    }
  }, [isOpen, location, form]);

  const handleSubmit = (values: GrowLocationFormState) => {
    onSubmit({
      ...values,
      area,
      location,
      points,
    });
  };

  return (
    <AModal
      open={isOpen}
      title={
        <div className='flex items-center gap-2'>
          <h3 className='text-base font-bold tracking-wide text-black'>
            Create New Grow Location
          </h3>
        </div>
      }
      onCancel={onClose}
      onOk={() => form.submit()}
      okText='Create'
      cancelText='Cancel'
      width={600}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        initialValues={{
          name: fieldName,
          color: '#4bc552',
        }}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <AInput placeholder='Type name here' />
        </Form.Item>

        <Form.Item
          label='Farm'
          name='farmId'
          rules={[{ required: true, message: 'Please select a farm!' }]}
        >
          <ASelect placeholder='Select Existing Farm'>
            {farmsData.map((farm: farmModel) => (
              <Option key={farm.id} value={farm.id}>
                {farm.name}
              </Option>
            ))}
          </ASelect>
        </Form.Item>
        <Form.Item
          label='Color'
          name='color'
          rules={[{ required: true, message: 'Please select a color!' }]}
        >
          <ColorPicker defaultValue='#ff8a16' showText allowClear />
        </Form.Item>

        <Form.Item
          label='Grow Location'
          name='growLocation'
          rules={[
            { required: true, message: 'Please input the grow location!' },
          ]}
        >
          <TextArea
            autoSize={{ minRows: 3, maxRows: 6 }}
            readOnly
            placeholder='Loading location address...'
          />
        </Form.Item>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <h3 className='font-bold'>Total Area: </h3>
            <h3 className=''>{area?.toFixed(2)} m²</h3>
            <h5 className='text-sm'>
              ({turf.convertArea(area, 'meters', 'acres').toFixed(2)} acres)
            </h5>
          </div>
        </div>
      </Form>
    </AModal>
  );
};

GrowLocationModal.displayName = 'GrowLocationModal';

export default GrowLocationModal;
