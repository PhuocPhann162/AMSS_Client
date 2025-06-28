import { useEffect, useState } from 'react';
import * as turf from '@turf/turf';
import { toastNotify } from '@/helper';
import {
  useCreateFarmMutation,
  useGetAllFarmsQuery,
  useGetSuppliersByRoleQuery,
} from '@/api';
import {
  apiResponse,
  farmModel,
  locationModel,
  pointModel,
} from '@/interfaces';
import { useCreateFieldMutation } from '@/api';
import { SD_PlaceType } from '@/utils/SD';
import { AInput, AModal, ASelect } from '@/common/ui-common';
import { Form, Radio } from 'antd';
import {
  CreateLandFormState,
  CreateLocationDto,
  CreatePolygonDto,
} from '@/models/request/land/create-land-request';
import { Option } from 'antd/es/mentions';
import CreateLandIcon from '@/components/Icon/icon-svg/supplier-crop-sidebar.svg?react';
import TextArea from 'antd/es/input/TextArea';
import { GetSelectionSuppliersByRoleResponse } from '@/models';
import { ROLE } from '@/interfaces/role/role';

interface CreateLandModalProps {
  area?: number;
  location?: locationModel;
  points: pointModel[];
  onCancel?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateLandModal = ({
  area,
  location,
  points,
  onCancel,
  isOpen,
  setIsOpen,
}: CreateLandModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ownerFarmOptions, setOwnerFarmOptions] = useState<
    GetSelectionSuppliersByRoleResponse[]
  >([]);
  const [form] = Form.useForm<CreateLandFormState>();
  const placeTypeSelected = Form.useWatch('placeType', form);
  const [createFarm] = useCreateFarmMutation();
  const [createField] = useCreateFieldMutation();
  const { data: ownerFarms } = useGetSuppliersByRoleQuery(ROLE.OWNER_FARM);
  const { data } = useGetAllFarmsQuery('');

  const handleSubmit = async (values: CreateLandFormState) => {
    setIsLoading(true);

    try {
      if (location) {
        // Location Request
        const locationRequest: CreateLocationDto = {
          address: location.address ?? '',
          lat: location.lat ?? 0,
          lng: location.lng ?? 0,
          city: location.city,
          state: location.state,
          district: location.district,
          road: location.road,
          postCode: location.postCode,
          countryCode: location.countryCode,
        };

        // Polygon Request
        const polygonRequest: CreatePolygonDto = {
          color: form.getFieldValue('color') as string,
          type: placeTypeSelected === SD_PlaceType.FARM ? 1 : 0,
          positions: points,
        };

        // Create Farm or Field
        if (placeTypeSelected === SD_PlaceType.FARM) {
          const selectedOwner = ownerFarmOptions.find(
            (owner) => owner.supplierId === values.ownerId,
          );

          const response = await createFarm({
            name: values.name,
            area: area ?? 0,
            ownerName: selectedOwner?.contactName ?? '',
            ownerSupplierId: values.ownerId ?? '',
            location: locationRequest,
            polygon: polygonRequest,
          });

          if (response.data && response.data.isSuccess) {
            toastNotify(
              response.data?.successMessage || 'Farm created successfully',
            );
            setIsOpen(false);
          }
        } else if (placeTypeSelected === SD_PlaceType.FIELD) {
          const response = await createField({
            name: values.name,
            area: area ?? 0,
            farmId: values.farmId ?? '',
            location: locationRequest,
            polygon: polygonRequest,
          });

          if (response.data && response.data.isSuccess) {
            toastNotify(
              response.data?.successMessage || 'Field created successfully',
            );
            setIsOpen(false);
          }
        }
      } else {
        setIsLoading(false);
        toastNotify('Location is required', 'error');
      }
    } catch (e) {
      toastNotify(
        (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && location?.address) {
      form.setFieldsValue({ growLocation: location.address });
    }
  }, [isOpen, location, form]);

  useEffect(() => {
    if (ownerFarms) {
      setOwnerFarmOptions(ownerFarms.result ?? []);
    }
  }, [ownerFarms]);

  return (
    <>
      <AModal
        open={isOpen}
        title={
          <div className='flex items-center gap-2'>
            <CreateLandIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            <p className='w-100 text-base font-semibold tracking-wide'>
              Create Land
            </p>
          </div>
        }
        modalRender={(dom) => (
          <Form
            form={form}
            layout='horizontal'
            onFinish={handleSubmit}
            autoComplete='off'
          >
            {dom}
          </Form>
        )}
        okButtonProps={{
          type: 'primary',
          loading: isLoading,
          htmlType: 'submit',
        }}
        okText='Save'
        onCancel={() => {
          setIsOpen(false);
          if (onCancel) {
            onCancel();
          }
        }}
      >
        <div className='bg-white px-3 py-2'>
          <Form.Item
            label='Land name'
            name='name'
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <AInput placeholder='Type name here' />
          </Form.Item>

          <Form.Item
            label='Place type'
            name='placeType'
            rules={[
              { required: true, message: 'Please select the place type!' },
            ]}
          >
            <ASelect placeholder='Select Place Type'>
              <Option value={SD_PlaceType.FARM}>Farm</Option>
              <Option value={SD_PlaceType.FIELD}>Field</Option>
            </ASelect>
          </Form.Item>

          {placeTypeSelected === SD_PlaceType.FARM && (
            <>
              <Form.Item
                label='Owner name'
                name='ownerId'
                rules={[
                  { required: true, message: 'Please select the owner name!' },
                ]}
              >
                <ASelect
                  options={ownerFarmOptions}
                  fieldNames={{ label: 'contactName', value: 'supplierId' }}
                  optionFilterProp='contactName'
                  placeholder='Select Owner Name'
                />
              </Form.Item>

              <Form.Item
                label='Color'
                name='color'
                rules={[{ required: true, message: 'Please select a color!' }]}
              >
                <Radio.Group>
                  <Radio value='#5D3D2E' className='font-bold text-[#5D3D2E]'>
                    Brown
                  </Radio>
                  <Radio value='#4bc552' className='font-bold text-[#4bc552]'>
                    Green
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          {placeTypeSelected === SD_PlaceType.FIELD && (
            <>
              <Form.Item
                label='Farm'
                name='farmId'
                rules={[{ required: true, message: 'Please select a farm!' }]}
              >
                <ASelect placeholder='Select Existing Farm'>
                  {(data?.apiResponse?.result as farmModel[]).map(
                    (farm: farmModel) => (
                      <Option key={farm.id} value={farm.id}>
                        {farm.name}
                      </Option>
                    ),
                  )}
                </ASelect>
              </Form.Item>
              <Form.Item
                label='Color'
                name='color'
                rules={[{ required: true, message: 'Please select a color!' }]}
              >
                <Radio.Group>
                  <Radio value='#ffb100'>Yellow</Radio>
                  <Radio value='#00aeff'>Blue</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          <Form.Item
            label='Grow location'
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
                ({turf.convertArea(area!, 'meters', 'acres').toFixed(2)}{' '}
                acres){' '}
              </h5>
            </div>
          </div>
        </div>
      </AModal>
    </>
  );
};
