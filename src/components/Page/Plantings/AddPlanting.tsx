import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Select,
  Button,
  Pagination,
  Modal,
  Form,
  DatePicker,
  InputNumber,
  Spin,
  Empty,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useAddCropPlatingMutation, useGetCropsQuery } from '@/api';
import { toastNotify } from '@/helper';
import { AButton } from '@/common/ui-common';
import {
  CropResponse,
  GetCropsRequest,
  PlantingModel,
} from '@/models/response/crop-response';

const { Option } = Select;
const { TextArea } = Input;

interface AddPlantingProps {
  locationId: string;
  locationName: string;
  onPlantingAdded: () => void;
  bedId?: string;
  bedName?: string;
}

const AddPlanting: React.FC<AddPlantingProps> = ({
  locationId,
  locationName,
  onPlantingAdded,
  bedId,
  bedName,
}) => {
  const [searchParams, setSearchParams] = useState<GetCropsRequest>({
    pageNumber: 1,
    pageSize: 10,
    searchString: '',
  });
  const [selectedCrops, setSelectedCrops] = useState<CropResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCrop, setCurrentCrop] = useState<CropResponse | null>(null);
  const [form] = Form.useForm();

  const {
    data: cropsData,
    isLoading,
    isFetching,
  } = useGetCropsQuery(searchParams);
  const [createPlanting, { isLoading: isCreating }] =
    useAddCropPlatingMutation();

  const handleSearch = (value: string) => {
    setSearchParams({
      ...searchParams,
      searchString: value,
      pageNumber: 1,
    });
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setSearchParams({
      ...searchParams,
      pageNumber: page,
      pageSize: pageSize || searchParams.pageSize,
    });
  };

  const handleSelectCrop = (crop: CropResponse) => {
    setCurrentCrop(crop);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleAddPlanting = async (values: any) => {
    if (!currentCrop) return;

    const newPlanting: PlantingModel = {
      cropId: currentCrop.id,
      cropName: currentCrop.name,
      locationId,
      bedId: bedId,
      plantingDate: values.plantingDate?.format('YYYY-MM-DD'),
      harvestDate: values.harvestDate?.format('YYYY-MM-DD'),
      quantity: values.quantity,
      unit: values.unit,
      status: values.status,
      notes: values.notes,
    };

    try {
      await createPlanting(newPlanting).unwrap();

      // Thêm vào danh sách đã chọn
      setSelectedCrops([
        ...selectedCrops,
        { ...currentCrop, planting: newPlanting },
      ]);

      // Đóng modal
      setIsModalVisible(false);

      // Thông báo thành công
      toastNotify(
        `Added ${currentCrop.name} to ${bedName || locationName}`,
        'success',
      );

      // Callback
      onPlantingAdded();
    } catch (error) {
      toastNotify('Failed to add planting', 'error');
    }
  };

  const handleRemoveCrop = (cropId: string) => {
    setSelectedCrops(selectedCrops.filter((crop) => crop.id !== cropId));
  };

  const columns = [
    {
      title: 'Crop Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: CropResponse) => (
        <div className='flex items-center'>
          {record.imageUrl && (
            <img
              src={record.imageUrl}
              alt={record.name}
              className='mr-2 h-8 w-8 rounded-full object-cover'
            />
          )}
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'cropType',
      key: 'cropType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: CropResponse) => (
        <AButton
          type='primary'
          size='small'
          onClick={() => handleSelectCrop(record)}
        >
          Select
        </AButton>
      ),
    },
  ];

  return (
    <div className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>
          Add Plantings to {bedName || locationName}
        </h2>
      </div>

      <div className='mb-4 flex items-center'>
        <Input
          placeholder='Search crops...'
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          className='mr-4 max-w-md'
          allowClear
        />
      </div>

      {isLoading ? (
        <div className='flex justify-center py-12'>
          <Spin size='large' />
        </div>
      ) : cropsData?.apiResponse?.result?.length === 0 ? (
        <Empty description='No crops found' />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={cropsData?.apiResponse?.result || []}
            rowKey='id'
            pagination={false}
            loading={isFetching}
            className='mb-4'
          />

          <Pagination
            current={searchParams.pageNumber}
            pageSize={searchParams.pageSize || 10}
            total={cropsData?.totalRecords || 0}
            onChange={handlePageChange}
            showSizeChanger
            showTotal={(total) => `Total ${total} items`}
            className='mt-4 text-right'
          />
        </>
      )}

      {selectedCrops.length > 0 && (
        <div className='mt-6'>
          <h3 className='mb-3 text-lg font-semibold'>Selected Crops</h3>
          <Table
            columns={[
              {
                title: 'Crop Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Planting Date',
                key: 'plantingDate',
                render: (_, record: any) =>
                  record.planting?.plantingDate || '-',
              },
              {
                title: 'Quantity',
                key: 'quantity',
                render: (_, record: any) =>
                  `${record.planting?.quantity || 0} ${record.planting?.unit || ''}`,
              },
              {
                title: 'Action',
                key: 'action',
                render: (_: any, record: CropResponse) => (
                  <Button
                    danger
                    size='small'
                    onClick={() => handleRemoveCrop(record.id)}
                  >
                    Remove
                  </Button>
                ),
              },
            ]}
            dataSource={selectedCrops}
            rowKey='id'
            pagination={false}
          />
        </div>
      )}

      <Modal
        title={`Add ${currentCrop?.name || 'Crop'} to ${bedName || locationName}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={isCreating}
            onClick={() => form.submit()}
          >
            Add Planting
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleAddPlanting}
          initialValues={{
            status: 'planned',
            quantity: 1,
            unit: 'plants',
          }}
        >
          <Form.Item
            name='plantingDate'
            label='Planting Date'
            rules={[{ required: true, message: 'Please select planting date' }]}
          >
            <DatePicker className='w-full' />
          </Form.Item>

          <Form.Item name='harvestDate' label='Expected Harvest Date'>
            <DatePicker className='w-full' />
          </Form.Item>

          <div className='grid grid-cols-2 gap-4'>
            <Form.Item
              name='quantity'
              label='Quantity'
              rules={[{ required: true, message: 'Please enter quantity' }]}
            >
              <InputNumber min={1} className='w-full' />
            </Form.Item>

            <Form.Item
              name='unit'
              label='Unit'
              rules={[{ required: true, message: 'Please select unit' }]}
            >
              <Select>
                <Option value='plants'>Plants</Option>
                <Option value='rows'>Rows</Option>
                <Option value='sqft'>Square Feet</Option>
                <Option value='seeds'>Seeds</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name='status'
            label='Status'
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value='planned'>Planned</Option>
              <Option value='planted'>Planted</Option>
              <Option value='growing'>Growing</Option>
              <Option value='harvested'>Harvested</Option>
            </Select>
          </Form.Item>

          <Form.Item name='notes' label='Notes'>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPlanting;
