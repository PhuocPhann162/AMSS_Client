import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUpdateFieldMutation } from '~/api/fieldApi';
import { Modal } from '~/common';
import { MiniLoader } from '~/components/Page/common';
import { Breadcrumb } from '~/components/UI';
import { getStatusColor, inputHelper, toastNotify } from '~/helper';
import { apiResponse } from '~/interfaces';
import { SD_FieldStatus } from '~/utils/SD';

export const UpdateField = () => {
  const navigate = useNavigate();
  const {
    state: { fieldData }
  } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: fieldData.name
  });

  const [updateField] = useUpdateFieldMutation();

  const nextStatus: any =
    fieldData && fieldData.status! === SD_FieldStatus.IDLE
      ? { color: 'success', value: SD_FieldStatus.PLANTED }
      : fieldData.status! === SD_FieldStatus.PLANTED
        ? { color: 'info', value: SD_FieldStatus.NEEDS_CARE }
        : fieldData.status! === SD_FieldStatus.NEEDS_CARE
          ? { color: 'warning', value: SD_FieldStatus.AWAITING_HARVEST }
          : fieldData.status! === SD_FieldStatus.AWAITING_HARVEST
            ? { color: 'accent', value: SD_FieldStatus.HARVESTING }
            : fieldData.status! === SD_FieldStatus.HARVESTING && {
                color: 'error',
                value: SD_FieldStatus.RECOVERY_NEEDED
              };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInputs);
    setUserInputs(tempData);
  };

  const handleNextStatus = async () => {
    setIsLoading(true);
    try {
      const response: apiResponse = await updateField({
        id: fieldData.id,
        data: {
          id: fieldData.id,
          status: nextStatus.value
        }
      });
      if (response && response.data?.isSuccess) {
        toastNotify("Field's status has been updated successfully", 'success');
        navigate(-1);
      } else {
        toastNotify('Failed to update field status', 'error');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }

    setIsLoading(false);
  };

  const handleUpdateField = async () => {
    setIsLoading(true);
    try {
      const response: apiResponse = await updateField({
        id: fieldData.id,
        data: {
          id: fieldData.id,
          name: userInputs.name === '' ? fieldData.name : userInputs.name
        }
      });
      if (response && response.data?.isSuccess) {
        toastNotify('Field name has been updated successfully', 'success');
        navigate(-1);
      } else {
        toastNotify('Failed to update field name', 'error');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setUserInputs({ name: fieldData.name });
  };

  return (
    <div>
      <Breadcrumb pageParent='Field' pageName='Edit Field' />

      <div className='flex justify-center items-center w-full'>
        <div className='bg-white w-2/3 px-10 py-10 flex flex-col gap-3'>
          <div className='flex items-center justify-between px-5'>
            <div className='flex items-center gap-2'>
              <div className='underline underline-offset-8 font-semibold text-sm'>
                <span className='text-danger'>*</span> Current status:{' '}
              </div>
              <button
                type='button'
                className={`btn border-0 bg-status-${getStatusColor(fieldData.status)}-light text-status-${getStatusColor(fieldData.status)}-dark`}
              >
                {fieldData.status}
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <div className='underline underline-offset-8 font-semibold text-sm'>
                <span className='text-danger'>*</span> Next status:{' '}
              </div>
              <div
                className='tooltip tooltip-bottom'
                data-tip='Click to change to next status'
                onClick={handleNextStatus}
              >
                <button type='button' className={`btn btn-outline btn-${nextStatus.color}`}>
                  {nextStatus.value}
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <label className='bg-white input input-bordered text-sm flex items-center gap-2 mt-5'>
              <span className='font-bold'>Name</span>
              <input
                type='text'
                className='grow opacity-90'
                placeholder='Daisy'
                value={userInputs.name}
                name='name'
                onChange={handleChange}
              />
            </label>
            <label className='bg-white input input-bordered text-sm flex items-center gap-2'>
              <span className='font-bold'>Farm Name</span>
              <input
                type='text'
                className='grow opacity-90 cursor-not-allowed'
                placeholder='daisy@site.com'
                defaultValue={fieldData.farm.name}
                readOnly
              />
            </label>
            <label className='bg-white input input-bordered text-sm flex items-center gap-2'>
              <span className='font-bold'>Total Area</span>
              <input
                type='text'
                className='grow opacity-90 cursor-not-allowed'
                placeholder='daisy@site.com'
                defaultValue={`${fieldData.area} m²`}
                readOnly
              />
              <kbd className='kbd kbd-sm bg-whiten'>⌘</kbd>
              <kbd className='kbd kbd-sm bg-whiten'>K</kbd>
            </label>

            <div className='flex items-center justify-end gap-2 mt-6'>
              <button
                type='button'
                disabled={isLoading}
                className='btn btn-primary text-white'
                onClick={() => {
                  (document.getElementById('fuco_modal') as HTMLDialogElement)?.showModal();
                }}
              >
                {!isLoading ? 'Update Field' : <MiniLoader />}
              </button>
              <button type='button' className='btn' onClick={() => navigate(-1)}>
                Back to list
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal width='' title='update this farm name?' onConfirm={handleUpdateField} onCancel={handleCancel} />
    </div>
  );
};
