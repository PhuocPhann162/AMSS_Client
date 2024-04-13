import { useState } from 'react';
import * as turf from '@turf/turf';
import { inputHelper, toastNotify } from '~/helper';
import { useCreateFarmMutation } from '~/api/farmApi';
import { apiResponse, locationModel } from '~/interfaces';
import { useCreateLocationMutation } from '~/api/locationApi';
import { useCreateFieldMutation } from '~/api/fieldApi';

interface CreateFarmModalProps {
  area?: number;
  location?: locationModel;
  onCancel?: () => void;
}

export const CreateFarmModal = ({ area, location, onCancel }: CreateFarmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: '',
    placeType: '',
    growLocation: ''
  });
  const [createLocation] = useCreateLocationMutation();
  const [createFarm] = useCreateFarmMutation();
  const [createField] = useCreateFieldMutation();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tạo location trước
      const newLocation: apiResponse = await createLocation(location);

      // Tạo farm hoặc field
      if (userInput.placeType == 'Farm') {
        const formData = new FormData();
        formData.append('Name', userInput.name);
        formData.append('LocationId', newLocation.data?.result.id ?? '');
        formData.append('Area', area!.toString());
        const response: apiResponse = await createFarm(formData);

        if (response.data && response.data.isSuccess) {
          setIsLoading(false);
          toastNotify(response.data?.successMessage || 'Farm created successfully');
        } else {
          setIsLoading(false);
          toastNotify(response.error?.data.errorMessages[0] ?? 'Something wrong when create farm', 'error');
        }
      } else if (userInput.placeType == 'Field') {
        const formData = new FormData();
        formData.append('Name', userInput.name);
        formData.append('LocationId', newLocation.data?.result.id ?? '');
        formData.append('Area', area!.toString());
        const response: apiResponse = await createField(formData);

        if (response.data && response.data.isSuccess) {
          setIsLoading(false);
          toastNotify(response.data?.successMessage || 'Field created successfully');
        } else {
          setIsLoading(false);
          toastNotify(response.error?.data.errorMessages[0] ?? 'Something wrong when create field', 'error');
        }
      }
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
                  value={userInput.name}
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
                  value={userInput.placeType}
                  onChange={handleUserInput}
                  required
                >
                  <option disabled>Place Type</option>
                  <option value='Farm'>Farm</option>
                  <option value='Field'>Field</option>
                </select>
              </div>
            </div>
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
                <h3 className='text-lg'>{area?.toFixed(2)} sqrt</h3>
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
