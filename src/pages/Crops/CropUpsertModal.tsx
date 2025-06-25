import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import {
  useCreateCropMutation,
  useGetCropByIdQuery,
  useGetSuppliersByRoleQuery,
  useUpdateCropMutation,
} from '@/api';
import { AButton, AModal } from '@/common/ui-common';
import { EditTableIcon, UploadIcon } from '@/components/Icon';
import { inputHelper, LabelHelper, toastNotify } from '@/helper';
import { apiResponse, Role } from '@/interfaces';
import CreateCropIcon from '@/components/Icon/icon-svg/crop-upsert.svg?react';
import DatePickerIcon from '@/components/Icon/icon-svg/date-picker.svg?react';
import { GetSelectionSuppliersByRoleResponse } from '@/models';

interface CropUpsertModalProps {
  id?: string;
  setSelectedCropId?: (id: string) => void;
  onCancel?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const cropData = {
  name: '',
  cycle: '',
  edible: '',
  soil: '',
  watering: '',
  maintenance: '',
  hardinessZone: 0,
  indoor: '',
  propagation: '',
  careLevel: '',
  growthRate: '',
  cultivatedArea: 0,
  plantedDate: new Date(2023, 8, 23),
  expectedDate: new Date(2024, 4, 28),
  quantity: 0,
  cropType: '',
  description: '',
  supplierId: '',
};

export const CropUpsertModal = ({
  id,
  setSelectedCropId,
  onCancel,
  isOpen,
  setIsOpen,
}: CropUpsertModalProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>('');
  const [userInputs, setUserInputs] = useState(cropData);
  const [supplierOptions, setSupplierOptions] = useState<
    GetSelectionSuppliersByRoleResponse[]
  >([]);
  const [createCrop] = useCreateCropMutation();
  const [updateCrop] = useUpdateCropMutation();
  const { data } = useGetCropByIdQuery(id, {
    skip: !id,
  });
  const { data: cropSuppliers } = useGetSuppliersByRoleQuery(
    Role.SUPPLIER_CROP,
  );

  const handleUserInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const tempData = inputHelper(e, userInputs);
    setUserInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split('/')[1];
      const validImgTypes = ['jpeg', 'jpg', 'png'];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore('');
        toastNotify('File must be less than 1MB', 'error');
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore('');
        toastNotify('File must be in jpeg, jpg or png', 'error');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!imageToStore) {
        toastNotify('Please upload an image', 'error');
        setIsLoading(false);
        return;
      }
      const formattedPlantedDate = userInputs.plantedDate
        ? format(userInputs.plantedDate, "yyyy-MM-dd'T'HH:mm:ss")
        : null;
      const formattedExpectedDate = userInputs.expectedDate
        ? format(userInputs.expectedDate, "yyyy-MM-dd'T'HH:mm:ss")
        : null;

      const formData = new FormData();
      formData.append('Name', userInputs.name ?? '');
      formData.append('Cycle', userInputs.cycle ?? '');
      formData.append('Edible', userInputs.edible ?? '');
      formData.append('Soil', userInputs.soil ?? '');
      formData.append('Watering', userInputs.watering ?? '');
      formData.append('Maintenance', userInputs.maintenance ?? '');
      formData.append('HardinessZone', userInputs.hardinessZone.toString());
      formData.append('Indoor', userInputs.indoor ?? '');
      formData.append('Propogation', userInputs.propagation ?? '');
      formData.append('CareLevel', userInputs.careLevel ?? '');
      formData.append('GrowthRate', userInputs.growthRate ?? '');
      formData.append('Description', userInputs.description ?? '');
      formData.append('Quantity', userInputs.quantity.toString());
      formData.append('CultivatedArea', userInputs.cultivatedArea.toString());
      formData.append('PlantedDate', formattedPlantedDate ?? '');
      formData.append('ExpectedDate', formattedExpectedDate ?? '');
      formData.append('SupplierId', userInputs.supplierId ?? '');
      formData.append('CropTypeName', userInputs?.cropType.toString() ?? '');
      if (imageToDisplay) {
        formData.append('File', imageToStore);
      }

      let response: apiResponse;
      if (!id) {
        response = await createCrop(formData);
        if (response.data && response.data?.isSuccess) {
          toastNotify(
            response.data.successMessage ?? 'Crop created successfully!',
            'success',
          );
          setIsOpen(false);
          navigate('/app/crop/myCrops');
        }
      } else {
        response = await updateCrop(formData);
        if (response.data && response.data?.isSuccess) {
          toastNotify(
            response.data.successMessage ?? 'Crop updated successfully!',
            'success',
          );
          setIsOpen(false);
          navigate('/app/crop/myCrops');
        }
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
    if (id && data && data.result) {
      const tempData = {
        name: data.result.name,
        cycle: data.result.cycle,
        edible: data.result.edible.toString(),
        soil: data.result.soil,
        watering: data.result.watering,
        maintenance: data.result.maintenance,
        hardinessZone: data.result.hardinessZone,
        indoor: data.result.indoor.toString(),
        propagation: data.result.propagation,
        careLevel: data.result.careLevel,
        growthRate: data.result.growthRate,
        cultivatedArea: data.result.cultivatedArea,
        plantedDate: new Date(data.result.plantedDate),
        expectedDate: new Date(data.result.expectedDate),
        quantity: data.result.quantity,
        cropType: data.result.cropType?.type,
        description: data.result.description,
        supplierId: data.result.supplierId,
      };
      setUserInputs(tempData);
      setImageToDisplay(data.result.icon);
    }
  }, [data, id]);

  useEffect(() => {
    if (cropSuppliers?.result) {
      setSupplierOptions(cropSuppliers.result);
    }
  }, [cropSuppliers]);

  return (
    <>
      <AModal
        open={isOpen}
        title={
          <div className='flex items-center gap-1 px-4'>
            <h3 className='text-base font-bold tracking-wide text-black'>
              {id ? 'Update Crop' : 'Create New Crop'}
            </h3>
            <CreateCropIcon style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
        }
        modalRender={(dom) => (
          <form
            action='#'
            method='post'
            encType='multipart/form-data'
            onSubmit={handleSubmit}
          >
            {dom}
          </form>
        )}
        okButtonProps={{
          variant: 'solid',
          color: 'cyan',
          loading: isLoading,
          htmlType: 'submit',
        }}
        style={{ top: 20 }}
        okText='Save all'
        onCancel={() => {
          setIsOpen(false);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          setSelectedCropId && setSelectedCropId('');
          if (onCancel) {
            onCancel();
          }
        }}
        className='!w-[55vw]'
      >
        <div className='h-full px-6'>
          <div className='grid grid-cols-6 gap-6'>
            <div
              id='FileUpload'
              className='bg-gray relative col-span-6 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary px-4 py-4 dark:bg-gray-900 sm:col-span-6'
            >
              {imageToDisplay == '' ? (
                <>
                  <input
                    type='file'
                    className='absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none'
                    onChange={handleFileChange}
                  />
                  <div className='flex flex-col items-center justify-center space-y-3'>
                    <span className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white dark:border-slate-800 dark:bg-slate-900'>
                      <UploadIcon />
                    </span>
                    <p>
                      <span className='text-primary'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='mt-1.5'>SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </>
              ) : (
                <div className='flex items-center justify-center gap-10'>
                  <img
                    src={imageToDisplay}
                    className='h-50 w-40 rounded-md'
                    alt='Upload Here'
                  />
                  <AButton
                    className='btn btn-outline btn-primary'
                    onClick={() => setImageToDisplay('')}
                  >
                    <EditTableIcon />
                  </AButton>
                </div>
              )}
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Crop Name' required={true} />
              <input
                type='text'
                name='name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.name}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Cycle' required={true} />
              <input
                type='text'
                name='cycle'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.cycle}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Edible' required={true} />
              <div className='mx-2 my-3 flex items-center'>
                <input
                  type='radio'
                  id='edible-true'
                  name='edible'
                  value='true'
                  className='mr-2'
                  required
                  onChange={handleUserInput}
                />
                <label
                  htmlFor='edible-true'
                  className='mr-4 text-sm font-medium text-black'
                >
                  True
                </label>
                <input
                  type='radio'
                  id='edible-false'
                  name='edible'
                  value='false'
                  className='mr-2'
                  required
                  onChange={handleUserInput}
                />
                <label
                  htmlFor='edible-false'
                  className='text-sm font-medium text-black'
                >
                  False
                </label>
              </div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Indoor' required={true} />
              <div className='mx-2 my-3 flex items-center'>
                <input
                  type='radio'
                  id='indoor-true'
                  name='indoor'
                  value='true'
                  className='mr-2'
                  required
                  onChange={handleUserInput}
                />
                <label
                  htmlFor='indoor-true'
                  className='mr-4 text-sm font-medium text-black'
                >
                  True
                </label>
                <input
                  type='radio'
                  id='indoor-false'
                  name='indoor'
                  value='false'
                  className='mr-2'
                  required
                  onChange={handleUserInput}
                />
                <label
                  htmlFor='indoor-false'
                  className='text-sm font-medium text-black'
                >
                  False
                </label>
              </div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Soil' required={true} />
              <input
                type='text'
                name='soil'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.soil}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Watering' required={true} />
              <input
                type='text'
                name='watering'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.watering}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Maintenance' required={true} />
              <input
                type='text'
                name='maintenance'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.maintenance}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Hardiness Zone' required={true} />
              <input
                type='number'
                name='hardinessZone'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.hardinessZone}
                onChange={handleUserInput}
                required={true}
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Propogation' required={true} />
              <input
                type='text'
                name='propagation'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.propagation}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Care Level' required={true} />
              <input
                type='text'
                name='careLevel'
                className='font-mediumsm:text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600'
                value={userInputs.careLevel}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Growth Rate' required={true} />
              <input
                type='text'
                name='growthRate'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.growthRate}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Cultivated Area' required={true} />
              <div className='flex items-end gap-2'>
                <input
                  type='number'
                  name='cultivatedArea'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                  value={userInputs.cultivatedArea}
                  onChange={handleUserInput}
                  required={true}
                />
                <label className='mb-2 block text-sm font-medium text-gray-900'>
                  m²
                </label>
              </div>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Quantity' required={true} />
              <input
                type='number'
                name='quantity'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.quantity}
                onChange={handleUserInput}
                required={true}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Crop Type' required={true} />
              <select
                name='cropType'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.cropType}
                onChange={handleUserInput}
                required={true}
              >
                <option disabled value=''>
                  Select Crop Type
                </option>
                {[
                  'Cereal',
                  'Fruit',
                  'Vegetable',
                  'Herb',
                  'Flower',
                  'Grain',
                  'Legume',
                  'Nut',
                  'Pulse',
                  'Spice',
                ].map((ct) => (
                  <option key={ct} value={ct}>
                    {ct}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Planted Date' required={true} />
              <DatePicker
                showIcon
                selected={userInputs.plantedDate}
                onChange={(date: Date) =>
                  setUserInputs({ ...userInputs, plantedDate: date })
                }
                dateFormat='dd/MM/yyyy'
                className='block rounded-lg border border-gray-300 bg-gray-50 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                icon={<DatePickerIcon />}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Expected Date' required={true} />
              <DatePicker
                showIcon
                selected={userInputs.expectedDate}
                onChange={(date: Date) =>
                  setUserInputs({ ...userInputs, expectedDate: date })
                }
                dateFormat='dd/MM/yyyy'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                icon={<DatePickerIcon />}
              />
            </div>
            <div className='col-span-6 sm:col-span-3'>
              <LabelHelper text='Seed Crop Supplier' required={false} />
              <select
                name='supplierId'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-medium text-black shadow-sm focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                value={userInputs.supplierId}
                onChange={handleUserInput}
              >
                <option value=''>Select Supplier</option>
                {supplierOptions.map((supplier) => (
                  <option key={supplier.supplierId} value={supplier.supplierId}>
                    {supplier.contactName} ({supplier.companyName})
                  </option>
                ))}
              </select>
            </div>

            <div className='col-span-full'>
              <LabelHelper text='Description' required={true} />
              <textarea
                name='description'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 font-medium text-black focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm'
                required={true}
                value={userInputs.description}
                onChange={handleUserInput}
              ></textarea>
            </div>
          </div>
        </div>
      </AModal>
    </>
  );
};
