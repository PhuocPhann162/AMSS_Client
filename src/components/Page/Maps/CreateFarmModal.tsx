import { useState } from 'react';
import * as turf from '@turf/turf';
import { inputHelper, toastNotify } from '@/helper';
import { useCreateFarmMutation, useGetAllFarmsQuery } from '@/api/farmApi';
import { apiResponse, farmModel, locationModel, pointModel } from '@/interfaces';
import { useCreateLocationMutation } from '@/api/locationApi';
import { useCreateFieldMutation } from '@/api/fieldApi';
import { SD_PlaceType } from '@/utils/SD';
import { useCreatePolygonMutation } from '@/api/polygonApi';
import { MiniLoader } from '../common';
interface CreateFarmModalProps {
  area?: number;
  location?: locationModel;
  points: pointModel[];
  onCancel?: () => void;
}

export const CreateFarmModal = ({ area, location, points, onCancel }: CreateFarmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: '',
    ownerName: '',
    placeType: '',
    growLocation: '',
    color: '',
    farmId: ''
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

  const createPolygonAsync = async () => {
    try {
      const newPolygon: apiResponse = await createPolygon({
        color: userInputs.color,
        type: userInputs.placeType === 'Farm' ? 1 : 0,
        positions: points
      });
      const polygonId = newPolygon.data?.result.id ?? '';
      return polygonId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create location first
      if (location) {
        const locationId = await createLocationAsync(location);
        if (locationId === '') {
          setIsLoading(false);
          toastNotify('Something wrong when create location', 'error');
          return;
        }

        // Create Polygon
        const polygonId = await createPolygonAsync();

        if (polygonId === '') {
          setIsLoading(false);
          toastNotify('Something wrong when create polygon', 'error');
          return;
        }

        // Create farm or field
        const formData = new FormData();
        if (userInputs.placeType === 'Farm') {
          // Create Farm
          formData.append('Name', userInputs.name);
          formData.append('LocationId', locationId);
          formData.append('OwnerName', userInputs.ownerName);
          formData.append('Area', area!.toString());
          formData.append('PolygonAppId', polygonId);
          const response: apiResponse = await createFarm(formData);

          if (response.data && response.data.isSuccess) {
            setIsLoading(false);
            toastNotify(response.data?.successMessage || 'Farm created successfully');
          } else {
            setIsLoading(false);
            toastNotify(response.error?.data.errorMessages[0] ?? 'Something wrong when create farm', 'error');
          }
        } else if (userInputs.placeType === 'Field') {
          // Create Field
          formData.append('Name', userInputs.name);
          formData.append('LocationId', locationId);
          formData.append('Area', area!.toString());
          formData.append('FarmId', userInputs.farmId.toString());
          formData.append('PolygonAppId', polygonId);
          const response: apiResponse = await createField(formData);

          if (response.data && response.data.isSuccess) {
            setIsLoading(false);
            toastNotify(response.data?.successMessage || 'Field created successfully');
          } else {
            setIsLoading(false);
            toastNotify(response.error?.data.errorMessages[0] ?? 'Something wrong when create field', 'error');
          }
        }
      } else {
        setIsLoading(false);
        toastNotify('Location is required', 'error');
      }
      // Close Create Form Modal
      setUserInputs({
        name: '',
        ownerName: '',
        placeType: '',
        growLocation: '',
        color: '',
        farmId: ''
      });
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
            <h3 className='font-bold text-lg w-100 tracking-wide'>Create Land</h3>
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
              <>
                <div className='flex items-center justify-between gap-4 mt-2'>
                  <label className='text-sm flex-shrink-0 w-1/5 text-right'>Owner name</label>
                  <div className='flex-grow w-full'>
                    <input
                      type='text'
                      placeholder='Type owner name here'
                      className='input input-bordered input-warning input-md w-full max-w-lg bg-white'
                      name='ownerName'
                      value={userInputs.ownerName}
                      onChange={handleUserInput}
                      required
                    />
                  </div>
                </div>
                <div className='flex items-center gap-4 py-4'>
                  <label className='text-sm flex-shrink-0 w-1/5 text-right'>Color</label>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='color'
                        value='#5D3D2E'
                        onChange={handleUserInput}
                        className='radio radio-accent'
                        checked={userInputs.color === '#5D3D2E'}
                      />
                      <label className='label'>Brown</label>
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
              </>
            )}{' '}
            {userInputs.placeType == 'Field' && (
              <>
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
                        required
                      />
                      <label className='label'>Yellow</label>
                    </div>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='color'
                        value='#00aeff'
                        onChange={handleUserInput}
                        className='radio radio-info form-control'
                        checked={userInputs.color === '#00aeff'}
                        required
                      />
                      <label className='label'>Blue</label>
                    </div>
                  </div>
                </div>
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
                      {data &&
                        data?.apiResponse?.result.map((farm: farmModel) => (
                          <option key={farm.id} value={farm.id}>
                            {farm.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </>
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
            <div className='divider divide-neutral-400'></div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <h3 className='font-bold text-lg'>Total Area: </h3>
                <h3 className='text-lg'>{area?.toFixed(2)} m²</h3>
                <h5 className='text-sm'>({turf.convertArea(area!, 'meters', 'acres').toFixed(2)} acres) </h5>
              </div>
              <div className='modal-action flex justify-end'>
                {/* if there is a button in form, it will close the modal */}
                <button disabled={isLoading} type='submit' className='btn btn-primary text-white'>
                  {isLoading ? <MiniLoader /> : 'Save'}
                </button>
                <button
                  type='button'
                  className='btn text-white'
                  onClick={() => {
                    (document.getElementById('create_farm_modal') as HTMLDialogElement)?.close();
                    if (onCancel) {
                      setUserInputs({
                        name: '',
                        ownerName: '',
                        placeType: '',
                        growLocation: '',
                        color: '',
                        farmId: ''
                      });
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
