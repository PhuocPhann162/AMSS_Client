import { useState } from 'react';
import * as turf from '@turf/turf';
import { inputHelper, toastNotify } from '~/helper';
import { useCreateFarmMutation, useGetAllFarmsQuery } from '~/api/farmApi';
import { apiResponse, farmModel, locationModel, pointModel, polygonModel } from '~/interfaces';
import { useCreateLocationMutation } from '~/api/locationApi';
import { useCreateFieldMutation } from '~/api/fieldApi';
import { SD_PlaceType } from '~/utils/SD';
import { useCreatePolygonMutation } from '~/api/polygonApi';
import { Polygon } from 'react-leaflet';

interface CreateFarmModalProps {
  area?: number;
  location?: locationModel;
  points?: pointModel[];
  mapRef?: any;
  onCancel?: () => void;
}

export const CreateFarmModal = ({ area, location, points, mapRef, onCancel }: CreateFarmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: '',
    placeType: '',
    growLocation: '',
    color: '',
    farmId: 0
  });
  const [createLocation] = useCreateLocationMutation();
  const [createPolygon] = useCreatePolygonMutation();
  const [createFarm] = useCreateFarmMutation();
  const [createField] = useCreateFieldMutation();
  const { data } = useGetAllFarmsQuery('');

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = inputHelper(e, userInputs);
    setUserInputs(tempData);
  };

  const createLocationAsync = async (locationData: locationModel) => {
    try {
      const newLocation: apiResponse = await createLocation(locationData);
      const locationId = newLocation.data?.result.id ?? '';
      return locationId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tạo location trước
      if (location) {
        const locationId = await createLocationAsync(location);
        if (locationId === '') {
          setIsLoading(false);
          toastNotify('Something wrong when create location', 'error');
          return;
        }
        // Tạo farm hoặc field
        if (userInputs.placeType === 'Farm') {
          const formData = new FormData();
          formData.append('Name', userInputs.name);
          formData.append('LocationId', locationId ?? '');
          formData.append('Area', area!.toString());
          const response: apiResponse = await createFarm(formData);

          if (response.data && response.data.isSuccess) {
            toastNotify(response.data?.successMessage || 'Farm created successfully');
          } else {
            setIsLoading(false);
            toastNotify(response.error?.data.errorMessages[0] ?? 'Something wrong when create farm', 'error');
          }

          const responsePolygon: apiResponse = await createPolygon({
            color: userInputs.color,
            farmId: response.data?.result.id,
            positions: points
          });
          if (responsePolygon?.data && responsePolygon?.data.isSuccess) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            toastNotify(responsePolygon.error?.data.errorMessages[0] ?? 'Something wrong when create polygon', 'error');
          }
        } else if (userInputs.placeType === 'Field') {
          const formData = new FormData();
          formData.append('Name', userInputs.name);
          formData.append('LocationId', locationId ?? '');
          formData.append('Area', area!.toString());
          formData.append('FarmId', userInputs.farmId.toString());
          const response: apiResponse = await createField(formData);

          if (response.data && response.data.isSuccess) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            toastNotify(response.error?.data.errorMessages[0] ?? 'Something wrong when create field', 'error');
          }
        }
      } else {
        setIsLoading(false);
        toastNotify('Location is required', 'error');
      }

      // Sau khi tạo thêm vào map và đóng form modal
      if (points !== undefined && mapRef.current !== undefined) {
        const newPolygon = (
          <Polygon positions={points.map((point) => [point.point[0]!, point.point[1]!])} color={userInputs.color} />
        );
        console.log(newPolygon);
        mapRef.current.addLayer(newPolygon);
      }
      (document.getElementById('create_farm_modal') as HTMLDialogElement)?.close();
    } catch (error: any) {
      setIsLoading(false);
      toastNotify(error.message, 'error');
    }
  };

  return (
    <>
      <dialog id='create_farm_modal' className='modal modal-top sm:modal-top w-3/5 mx-auto mt-6 border rounded-lg'>
        <div className='modal-box bg-white'>
          <div className=''>
            <h3 className='font-bold text-lg w-100 tracking-wide'>Create Farm</h3>
          </div>
          <div className='divider divide-neutral-400'></div>
          <form method='post' onSubmit={handleSubmit}>
            <div className='flex items-center justify-between gap-4'>
              <label className='text-sm flex-shrink-0 w-1/5 text-right'>Name</label>
              <div className='flex-grow w-full'>
                <input
                  type='text'
                  placeholder='Type name here'
                  className='input input-bordered input-warning input-md w-full max-w-lg bg-white'
                  name='name'
                  value={userInputs.name}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            <div className='flex items-center justify-between gap-4 mt-2'>
              <label className='text-sm flex-shrink-0 w-1/5 text-right'>Place type</label>
              <div className='flex-grow'>
                <select
                  className='select select-bordered select-warning w-full max-w-lg bg-white'
                  name='placeType'
                  value={userInputs.placeType}
                  onChange={handleUserInput}
                  required
                >
                  <option disabled value=''>
                    Select Place Type
                  </option>
                  <option key={SD_PlaceType.FARM} value={SD_PlaceType.FARM}>
                    Farm
                  </option>
                  <option key={SD_PlaceType.FIELD} value={SD_PlaceType.FIELD}>
                    Field
                  </option>
                </select>
              </div>
            </div>
            {userInputs.placeType === 'Farm' && (
              <div className='flex items-center gap-4 py-4'>
                <label className='text-sm flex-shrink-0 w-1/5 text-right'>Color</label>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center'>
                    <input
                      type='radio'
                      name='color'
                      value='#ffb100'
                      onChange={handleUserInput}
                      className='radio radio-warning'
                      checked={userInputs.color === '#ffb100'}
                    />
                    <label className='label'>Yellow</label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='radio'
                      name='color'
                      value='#4bc552'
                      onChange={handleUserInput}
                      className='radio radio-success form-control'
                      checked={userInputs.color === '#4bc552'}
                    />
                    <label className='label'>Green</label>
                  </div>
                </div>
              </div>
            )}{' '}
            {userInputs.placeType == 'Field' && (
              <div className='flex items-center justify-between gap-4 mt-2'>
                <label className='text-sm flex-shrink-0 w-1/5 text-right'>Color</label>
                <div className='flex-grow w-full'>
                  <input
                    type='radio'
                    name='color'
                    value='#ffb100'
                    onChange={handleUserInput}
                    className='radio radio-warning'
                    checked
                  />
                  <input
                    type='radio'
                    name='color'
                    value='#6741D9'
                    onChange={handleUserInput}
                    className='radio radio-base-100'
                  />
                </div>
              </div>
            )}
            <div className='flex items-center justify-between gap-4 mt-2'>
              <label className='text-sm flex-shrink-0 w-1/5 text-right'>Grow Location</label>
              <div className='flex-grow w-full'>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered input-warning input-md w-full max-w-lg bg-white'
                  name='growLocation'
                  defaultValue={location?.address}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            {userInputs.placeType === 'Field' && (
              <div className='flex items-center justify-between gap-4 mt-2'>
                <label className='text-sm flex-shrink-0 w-1/5 text-right'>Farm</label>
                <div className='flex-grow'>
                  <select
                    className='select select-bordered select-warning w-full max-w-lg bg-white'
                    name='farmId'
                    value={userInputs.farmId}
                    onChange={handleUserInput}
                    required
                  >
                    <option disabled value=''>
                      Select Existing Farm
                    </option>
                    {data?.apiResponse.result.map((farm: farmModel) => (
                      <option key={farm.id} value={farm.id}>
                        {farm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className='divider divide-neutral-400'></div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <h3 className='font-bold text-lg'>Total Area: </h3>
                <h3 className='text-lg'>{area?.toFixed(2)} m²</h3>
                <h5 className='text-sm'>({turf.convertArea(area!, 'meters', 'acres').toFixed(2)} acres) </h5>
              </div>
              <div className='modal-action flex justify-end'>
                {/* if there is a button in form, it will close the modal */}
                <button type='submit' className='btn btn-primary text-white'>
                  Save
                </button>
                <button
                  type='button'
                  className='btn btn-danger text-white'
                  onClick={() => {
                    (document.getElementById('create_farm_modal') as HTMLDialogElement)?.close();
                    if (onCancel) {
                      onCancel();
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
