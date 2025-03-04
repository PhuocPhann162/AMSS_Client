import { format, set } from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useCreateCropMutation, useGetCropByIdQuery, useUpdateCropMutation } from '~/api/cropApi';
import { MiniLoader } from '~/components/Page/common';
import { inputHelper, toastNotify } from '~/helper';
import { apiResponse } from '~/interfaces';

interface CropUpsertModalProps {
  id?: string;
  setSelectedCropId?: (id: string) => void;
}

const cropData = {
  name: 'Mango',
  cycle: 'Annual',
  edible: 'true',
  soil: 'Clay',
  watering: 'Heavy',
  maintenance: 'Low',
  hardinessZone: 8,
  indoor: 'false',
  propogation: 'Seed',
  careLevel: 'Easy',
  growthRate: 'Fast',
  cultivatedArea: 894.0,
  plantedDate: new Date(2023, 8, 23),
  expectedDate: new Date(2024, 4, 28),
  quantity: 420,
  cropType: 'Cereal',
  description: 'Maize crop known for its versatility and use in various food products.'
};

export const CropUpsertModal = ({ id, setSelectedCropId }: CropUpsertModalProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<any>('');
  const [userInputs, setUserInputs] = useState(cropData);
  const [createCrop] = useCreateCropMutation();
  const [updateCrop] = useUpdateCropMutation();
  const { data } = useGetCropByIdQuery(id ?? 1);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      formData.append('Propogation', userInputs.propogation ?? '');
      formData.append('CareLevel', userInputs.careLevel ?? '');
      formData.append('GrowthRate', userInputs.growthRate ?? '');
      formData.append('Description', userInputs.description ?? '');
      formData.append('Quantity', userInputs.quantity.toString());
      formData.append('CultivatedArea', userInputs.cultivatedArea.toString());
      formData.append('PlantedDate', formattedPlantedDate ?? '');
      formData.append('ExpectedDate', formattedExpectedDate ?? '');
      formData.append('CropTypeName', userInputs?.cropType.toString() ?? '');
      console.log('userInputs', userInputs);
      console.log('formData', formData.values);
      if (imageToDisplay) {
        formData.append('File', imageToStore);
      }

      let response: apiResponse;
      console.log(id);
      if (!id) {
        response = await createCrop(formData);
        if (response.data && response.data?.isSuccess) {
          (document.querySelector('crop_upsert_modal') as HTMLDialogElement)?.close();
          toastNotify(response.data.successMessage ?? 'Crop created successfully!', 'success');
          navigate('/app/crop/myCrops');
        }
      } else {
        response = await updateCrop(formData);
        if (response.data && response.data?.isSuccess) {
          (document.querySelector('crop_upsert_modal') as HTMLDialogElement)?.close();
          toastNotify(response.data.successMessage ?? 'Crop updated successfully!', 'success');
          navigate('/app/crop/myCrops');
        }
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        cycle: data.result.cycle,
        edible: data.result.edible.toString(),
        soil: data.result.soil,
        watering: data.result.watering,
        maintenance: data.result.maintenance,
        hardinessZone: data.result.hardinessZone,
        indoor: data.result.indoor.toString(),
        propogation: data.result.propogation,
        careLevel: data.result.careLevel,
        growthRate: data.result.growthRate,
        cultivatedArea: data.result.cultivatedArea,
        plantedDate: new Date(data.result.plantedDate),
        expectedDate: new Date(data.result.expectedDate),
        quantity: data.result.quantity,
        cropType: data.result.cropType?.type,
        description: data.result.description
      };
      setUserInputs(tempData);
      setImageToDisplay(data.result.icon);
    }
  }, [data]);

  return (
    <>
      <dialog id='crop_upsert_modal' className='modal modal-top sm:modal-top w-3/5 mx-auto mt-6 border rounded-lg'>
        <div className='modal-box bg-white'>
          <div className='flex items-center gap-1'>
            <h3 className='font-bold text-lg text-black tracking-wide'>{id ? 'Update' : 'Create'} New Crop</h3>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <title>tree_3_fill</title>
              <g id='tree_3_fill' fill='none' fillRule='evenodd'>
                <path d='M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01-.184-.092Z' />
                <path
                  fill='#00c46a'
                  d='M9.479 3.04C10.259 2.479 11.167 2 12 2s1.74.479 2.521 1.04c.83.596 1.703 1.423 2.5 2.385C18.587 7.319 20 9.916 20 12.5c0 2.46-1.217 4.137-2.846 5.152-1.266.79-2.77 1.18-4.154 1.303V21a1 1 0 1 1-2 0v-2.045c-1.384-.124-2.888-.514-4.154-1.303C5.217 16.637 4 14.96 4 12.5c0-2.584 1.412-5.18 2.98-7.075.795-.962 1.67-1.79 2.499-2.385ZM12 17c.326 0 .662-.018 1-.055V14.32l2.314-3.239a1 1 0 1 0-1.628-1.162l-1.814 2.54-1.165-1.166a1 1 0 0 0-1.414 1.414L11 14.414v2.531c.338.037.674.055 1 .055Z'
                />
              </g>
            </svg>
          </div>
          <div className='divider divide-neutral-400'></div>
          <div className='px-6 mb-6 space-y-6'>
            <form action='#' method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
              <div className='overflow-auto h-100 px-6 mb-6 space-y-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div
                    id='FileUpload'
                    className='col-span-6 sm:col-span-6 relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5'
                  >
                    {imageToDisplay == '' ? (
                      <>
                        <input
                          type='file'
                          className='absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none'
                          onChange={handleFileChange}
                        />
                        <div className='flex flex-col items-center justify-center space-y-3'>
                          <span className='flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z'
                                fill='#3C50E0'
                              />
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z'
                                fill='#3C50E0'
                              />
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z'
                                fill='#3C50E0'
                              />
                            </svg>
                          </span>
                          <p>
                            <span className='text-primary'>Click to upload</span> or drag and drop
                          </p>
                          <p className='mt-1.5'>SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </>
                    ) : (
                      <div className='flex items-center'>
                        <div className='col-span-3 sm:col-span-3'>
                          <img src={imageToDisplay} style={{ width: '40%', borderRadius: '30px' }} alt='Upload Here' />
                        </div>
                        <div className='col-span-3 sm:col-span-3'>
                          <button className='btn btn-outline btn-primary' onClick={() => setImageToDisplay('')}>
                            Change Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Crop Name</label>
                    <input
                      type='text'
                      name='name'
                      className='text-black font-medium shadow-sm bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Corn Crop 1”'
                      value={userInputs.name}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Cycle</label>
                    <input
                      type='text'
                      name='cycle'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Annual'
                      value={userInputs.cycle}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Edible</label>
                    <div className='flex items-center mx-2 my-3'>
                      <input
                        type='radio'
                        id='edible-true'
                        name='edible'
                        value='true'
                        className='mr-2'
                        required
                        onChange={handleUserInput}
                      />
                      <label htmlFor='edible-true' className='text-sm font-medium text-black mr-4'>
                        True
                      </label>
                      <input
                        type='radio'
                        id='edible-false'
                        name='edible'
                        value='false'
                        className='mr-2 '
                        required
                        onChange={handleUserInput}
                      />
                      <label htmlFor='edible-false' className='text-sm font-medium text-black'>
                        False
                      </label>
                    </div>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Indoor</label>
                    <div className='flex items-center mx-2 my-3'>
                      <input
                        type='radio'
                        id='indoor-true'
                        name='indoor'
                        value='true'
                        className='mr-2'
                        required
                        onChange={handleUserInput}
                      />
                      <label htmlFor='indoor-true' className='text-sm font-medium text-black mr-4'>
                        True
                      </label>
                      <input
                        type='radio'
                        id='indoor-false'
                        name='indoor'
                        value='false'
                        className='mr-2 '
                        required
                        onChange={handleUserInput}
                      />
                      <label htmlFor='indoor-false' className='text-sm font-medium text-black'>
                        False
                      </label>
                    </div>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Soil</label>
                    <input
                      type='text'
                      name='soil'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Clay'
                      value={userInputs.soil}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Watering</label>
                    <input
                      type='text'
                      name='watering'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Heavy'
                      value={userInputs.watering}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Maintenance</label>
                    <input
                      type='text'
                      name='maintenance'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Low'
                      value={userInputs.maintenance}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Hardiness Zone</label>
                    <input
                      type='number'
                      name='hardinessZone'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='8'
                      value={userInputs.hardinessZone}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Propogation</label>
                    <input
                      type='text'
                      name='propogation'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Seed'
                      value={userInputs.propogation}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Care Level</label>
                    <input
                      type='text'
                      name='careLevel'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-mediumsm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Easy'
                      value={userInputs.careLevel}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Growth Rate</label>
                    <input
                      type='text'
                      name='growthRate'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='Fast'
                      value={userInputs.growthRate}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Cultivated Area</label>
                    <div className='flex items-end gap-2'>
                      <input
                        type='number'
                        name='cultivatedArea'
                        className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                        placeholder='894.0'
                        value={userInputs.cultivatedArea}
                        onChange={handleUserInput}
                        required={true}
                      />
                      <label className='text-sm font-medium text-gray-900 block mb-2'>m²</label>
                    </div>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Quantity</label>
                    <input
                      type='number'
                      name='quantity'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      placeholder='420'
                      value={userInputs.quantity}
                      onChange={handleUserInput}
                      required={true}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Crop Type</label>
                    <select
                      name='cropType'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
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
                        'Spice'
                      ].map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Planted Date</label>
                    <DatePicker
                      showIcon
                      selected={userInputs.plantedDate}
                      onChange={(date: Date) => setUserInputs({ ...userInputs, plantedDate: date })}
                      dateFormat='dd/MM/yyyy'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      icon={
                        <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'>
                          <mask id='ipSApplication0'>
                            <g fill='none' stroke='#fff' strokeLinejoin='round' strokeWidth='4'>
                              <path strokeLinecap='round' d='M40.04 22v20h-32V22'></path>
                              <path
                                fill='#fff'
                                d='M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z'
                              ></path>
                            </g>
                          </mask>
                          <path fill='currentColor' d='M0 0h48v48H0z' mask='url(#ipSApplication0)'></path>
                        </svg>
                      }
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Expected Date</label>
                    <DatePicker
                      showIcon
                      selected={userInputs.expectedDate}
                      onChange={(date: Date) => setUserInputs({ ...userInputs, expectedDate: date })}
                      dateFormat='dd/MM/yyyy'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                      icon={
                        <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'>
                          <mask id='ipSApplication0'>
                            <g fill='none' stroke='#fff' strokeLinejoin='round' strokeWidth='4'>
                              <path strokeLinecap='round' d='M40.04 22v20h-32V22'></path>
                              <path
                                fill='#fff'
                                d='M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z'
                              ></path>
                            </g>
                          </mask>
                          <path fill='currentColor' d='M0 0h48v48H0z' mask='url(#ipSApplication0)'></path>
                        </svg>
                      }
                    />
                  </div>

                  <div className='col-span-full'>
                    <label className='text-sm font-medium text-gray-900 block mb-2'>Description</label>
                    <textarea
                      name='description'
                      className='bg-gray-50 border border-gray-300 text-black font-medium sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4'
                      placeholder='Maize crop known for its versatility and use in various food products.'
                      required={true}
                      value={userInputs.description}
                      onChange={handleUserInput}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='p-6 border-t border-gray-200 rounded-b flex items-center justify-end gap-1'>
                <button
                  className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? <MiniLoader /> : 'Save all'}
                </button>
                <button
                  type='button'
                  className='text-white bg-body hover:bg-graydark focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  onClick={() => {
                    setSelectedCropId && setSelectedCropId('');
                    (document.getElementById('crop_upsert_modal') as HTMLDialogElement)?.close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
