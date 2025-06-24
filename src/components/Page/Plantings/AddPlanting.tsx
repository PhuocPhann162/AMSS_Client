import React, { useEffect, useMemo, useState } from 'react';
import {
  Input,
  Select,
  Button,
  Form,
  DatePicker,
  InputNumber,
  Empty,
} from 'antd';
import {
  useAddCropPlatingMutation,
  useGetPlatingCropsQuery,
  useRemovePlantingCropMutation,
} from '@/api';
import { toastNotify } from '@/helper';
import { AButton, ADescriptions, AModal, ATable } from '@/common/ui-common';
import {
  AddPlatingCropsRequest,
  CropResponse,
  PlantingModel,
} from '@/models/response/crop-response';
import { TableParams } from '@/utils/models/Tables';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { SearchInput } from '@/components/UI';
import { ColumnsType } from 'antd/es/table';
import { apiResponse } from '@/interfaces';
import { cropDescriptionItems } from '@/helper/descriptionItems';
import dayjs from 'dayjs';
import { formatLocalDate } from '@/helper/dayFormat';

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
  const [selectedCrops, setSelectedCrops] = useState<CropResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCrop, setCurrentCrop] = useState<CropResponse | null>(null);
  const [currentViewCrop, setCurrentViewCrop] = useState<CropResponse>();
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState<string>('');

  const [tableParams, setTableParams] =
    useState<TableParams>(INITIAL_PAGINATION);
  const [dataTable, setDataTable] = useState<CropResponse[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);

  const [isOpenViewPlatingCropsModal, setIsOpenViewPlatingCropsModal] =
    useState<boolean>();

  const { data: plantingCrops, isLoading } = useGetPlatingCropsQuery({
    ...tableParams.filters,
    currentPage: tableParams.pagination?.current ?? 1,
    limit: tableParams.pagination?.pageSize ?? 10,
    orderBy: tableParams.sortField?.toString() ?? 'CreatedAt',
    orderByDirection: tableParams.sortOrder === 'ascend' ? 0 : 1,
    search: searchValue,
  });
  const [createPlanting, { isLoading: isCreating }] =
    useAddCropPlatingMutation();
  const [removePlantingCrop] = useRemovePlantingCropMutation();

  const handleSelectCrop = (crop: CropResponse) => {
    setCurrentCrop(crop);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleAddPlanting = async (values: PlantingModel) => {
    if (!currentCrop) return;

    const newPlanting: AddPlatingCropsRequest = {
      fieldId: locationId,
      cropId: currentCrop.id,
      quantity: values.quantity,
      notes: values.notes ?? '',
      status: values.status,
      unit: values.unit,
    };

    try {
      await createPlanting(newPlanting).unwrap();

      // Thêm vào danh sách đã chọn
      setSelectedCrops([...selectedCrops, { ...currentCrop }]);

      setIsModalVisible(false);

      toastNotify(
        `Added ${currentCrop.name} to ${bedName || locationName}`,
        'success',
      );

      onPlantingAdded();
    } catch {
      toastNotify('Failed to add planting', 'error');
    }
  };

  const handleViewCrop = (crop: CropResponse) => {
    setCurrentViewCrop(crop);
    setIsOpenViewPlatingCropsModal(true);
  };

  const handleRemoveCrop = async (cropId: string) => {
    try {
      await removePlantingCrop({
        fieldId: locationId,
        cropId: cropId,
      }).unwrap();

      setSelectedCrops(selectedCrops.filter((crop) => crop.id !== cropId));
      toastNotify('Planting crop removed successfully', 'success');
      onPlantingAdded();
    } catch (error) {
      toastNotify('Failed to remove planting crop', 'error');
    }
  };

  const platingCropCols: ColumnsType = useMemo(() => {
    return [
      {
        title: 'Crop Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => (
          <div className='flex items-center'>
            {record.icon && (
              <img
                src={record.icon as string}
                alt={record.name as string}
                className='mr-2 h-8 w-8 rounded-full object-cover'
              />
            )}
            <span>{record.name}</span>
          </div>
        ),
      },
      {
        title: 'Type',
        dataIndex: 'cropTypeName',
        key: 'cropTypeName',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
      },
      {
        title: 'Action',
        align: 'center',
        key: 'action',
        render: (_, record) => (
          <div>
            <div className='flex justify-center gap-2'>
              <AButton
                type='link'
                size='small'
                onClick={() => handleViewCrop(record as CropResponse)}
              >
                View
              </AButton>
              <AButton
                type='primary'
                size='small'
                onClick={() => handleSelectCrop(record as CropResponse)}
              >
                Select
              </AButton>
            </div>
          </div>
        ),
      },
    ];
  }, [isOpenViewPlatingCropsModal]);

  useEffect(() => {
    const getPlantingCrops = () => {
      try {
        setDataTable(plantingCrops?.apiResponse.result.collection ?? []);
        setTotalRecord(plantingCrops?.apiResponse.result.totalRow ?? 0);
      } catch (e) {
        toastNotify(
          (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        );
      }
    };
    getPlantingCrops();
  }, [searchValue, plantingCrops, tableParams]);

  return (
    <div>
      <AModal
        open={isOpenViewPlatingCropsModal}
        title={'Crop Detail'}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        style={{ top: 20 }}
        width={'50rem'}
        onCancel={() => setIsOpenViewPlatingCropsModal(false)}
      >
        {currentViewCrop && (
          <ADescriptions items={cropDescriptionItems(currentViewCrop)} />
        )}
      </AModal>
      <div className='flex items-center'>
        <SearchInput
          onSearch={(value) => {
            if (value !== searchValue) {
              setSearchValue(value);
              setTableParams((pre) => ({
                ...pre,
                pagination: {
                  ...pre.pagination,
                  current: 1,
                },
              }));
            }
          }}
          placeholder={'Search by Crop Name'}
          className='w-1/3 min-w-40'
        />
      </div>

      {plantingCrops?.apiResponse?.result?.collection?.length === 0 ? (
        <Empty description='No crops found' />
      ) : (
        <>
          <ATable
            columns={platingCropCols}
            dataSource={dataTable}
            tableParams={tableParams}
            totalRecord={totalRecord}
            loading={isLoading}
            scroll={{ y: '42vh' }}
            onChange={(params: TableParams) => {
              setTableParams(params);
            }}
          />
        </>
      )}

      {selectedCrops.length > 0 && (
        <div className='mt-6'>
          <h3 className='mb-3 text-lg font-semibold'>Selected Crops</h3>
          <ATable
            columns={
              [
                {
                  title: 'Crop Name',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Planting Date',
                  key: 'plantingDate',
                  render: (_, record: CropResponse) =>
                    formatLocalDate(record?.plantedDate) || '-',
                },
                {
                  title: 'Expected Harvest Date',
                  key: 'expectedHarvestDate',
                  render: (_, record: CropResponse) =>
                    formatLocalDate(record?.expectedDate) || '-',
                },
                {
                  title: 'Quantity',
                  key: 'quantity',
                  render: (_, record: CropResponse) =>
                    `${record?.quantity || 0}`,
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (_, record: CropResponse) => (
                    <Button
                      danger
                      size='small'
                      onClick={() => handleRemoveCrop(record.id)}
                    >
                      Remove
                    </Button>
                  ),
                },
              ] as ColumnsType
            }
            dataSource={selectedCrops}
            rowKey='id'
            pagination={false}
          />
        </div>
      )}

      <AModal
        title={`Add ${currentCrop?.name || 'Crop'} to ${bedName || locationName}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        style={{ top: 20 }}
        width={'40rem'}
        footer={[
          <AButton key='cancel' onClick={() => setIsModalVisible(false)}>
            Cancel
          </AButton>,
          <AButton
            key='submit'
            type='primary'
            loading={isCreating}
            onClick={() => form.submit()}
          >
            Add Planting
          </AButton>,
        ]}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleAddPlanting}
          initialValues={{
            status: 'planned',
            quantity: 2,
            unit: 'plants',
            plantingDate: dayjs(currentCrop?.plantedDate),
            harvestDate: dayjs(currentCrop?.expectedDate),
          }}
        >
          <Form.Item
            name='plantingDate'
            label='Planting Date'
            rules={[{ required: true, message: 'Please select planting date' }]}
          >
            <DatePicker className='w-full' disabled={true} />
          </Form.Item>

          <Form.Item
            name='harvestDate'
            label='Expected Harvest Date'
            rules={[{ required: true, message: 'Please select harvest date' }]}
          >
            <DatePicker className='w-full' disabled={true} />
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
      </AModal>
    </div>
  );
};

export default AddPlanting;
