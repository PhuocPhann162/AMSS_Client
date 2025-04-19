import { apiResponse, locationModel, pointModel } from '@/interfaces';
import * as turf from '@turf/turf';
import { useUpdateFieldMutation } from '@/api/app';
import { toastNotify } from '@/helper';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MiniLoader } from '../common';
import { useUrlPosition } from '@/hooks';

interface UpdateLandModalProps {
  area?: number;
  location?: locationModel;
  points: pointModel[];
}

export const UpdateLandModal = ({
  area,
  location,
  points,
}: UpdateLandModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldId] = useUrlPosition();
  const navigate = useNavigate();
  const [updateField] = useUpdateFieldMutation();

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response: apiResponse = await updateField({
        id: fieldId,
        data: {
          id: parseInt(fieldId!),
          area: area,
          location: location,
          positions: points,
        },
      });

      if (response && response.data?.isSuccess) {
        toastNotify('Field location has been updated successfully', 'success');
        (
          document.getElementById('update_land_modal') as HTMLDialogElement
        )?.close();
      } else {
        toastNotify('Failed to update field location', 'error');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <dialog
        id='update_land_modal'
        className='modal modal-top sm:modal-top mx-auto mt-6 w-3/5 rounded-lg border'
      >
        <div className='modal-box bg-white'>
          <div className=''>
            <h3 className='w-100 text-lg font-bold tracking-wide'>
              Edit Field Area
            </h3>
          </div>
          <div className='divider divide-neutral-400'></div>
          <div>
            <div className='flex items-center justify-between gap-4'>
              <label className='w-1/5 flex-shrink-0 text-right text-sm'>
                Grow Location
              </label>
              <div className='w-full flex-grow'>
                <input
                  type='text'
                  placeholder='Type name here'
                  className='input input-bordered input-warning input-md w-full max-w-lg bg-white'
                  name='location'
                  value={location?.address}
                  readOnly
                />
              </div>
            </div>

            <div className='divider divide-neutral-400'></div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <h3 className='text-lg font-bold'>Total Area: </h3>
                <h3 className='text-lg'>{area?.toFixed(2)} m²</h3>
                <h5 className='text-sm'>
                  ({turf.convertArea(area!, 'meters', 'acres').toFixed(2)}{' '}
                  acres){' '}
                </h5>
              </div>
              <div className='modal-action flex justify-end'>
                {/* if there is a button in form, it will close the modal */}
                <button
                  type='button'
                  disabled={isLoading}
                  className='btn btn-primary text-white'
                  onClick={handleUpdate}
                >
                  {!isLoading ? 'Update Field' : <MiniLoader />}
                </button>
                <button
                  type='button'
                  className='btn text-white'
                  onClick={() => {
                    (
                      document.getElementById(
                        'update_land_modal',
                      ) as HTMLDialogElement
                    )?.close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
