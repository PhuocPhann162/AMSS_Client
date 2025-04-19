import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery, useUpdateFieldMutation } from '@/api/app';
import { Modal } from '@/common';
import { MainLoader, MiniLoader } from '@/components/Page/common';
import { Breadcrumb } from '@/components/UI';
import { getStatusColor, inputHelper, toastNotify } from '@/helper';
import { apiResponse, fieldModel } from '@/interfaces';
import { SD_FieldStatus } from '@/utils/SD';

export const UpdateField = () => {
  const navigate = useNavigate();
  const [fieldData, setFieldData] = useState<fieldModel>();
  const [loading, setLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: fieldData?.name ?? '',
  });
  const { id } = useParams();
  const { data, isLoading } = useGetFieldByIdQuery(id);
  const [updateField] = useUpdateFieldMutation();

  const nextStatus: any =
    fieldData && fieldData?.status === SD_FieldStatus.IDLE
      ? { color: 'success', value: SD_FieldStatus.PLANTED }
      : fieldData?.status === SD_FieldStatus.PLANTED
        ? { color: 'info', value: SD_FieldStatus.NEEDS_CARE }
        : fieldData?.status === SD_FieldStatus.NEEDS_CARE
          ? { color: 'warning', value: SD_FieldStatus.AWAITING_HARVEST }
          : fieldData?.status === SD_FieldStatus.AWAITING_HARVEST
            ? { color: 'accent', value: SD_FieldStatus.HARVESTING }
            : fieldData?.status === SD_FieldStatus.HARVESTING && {
                color: 'error',
                value: SD_FieldStatus.RECOVERY_NEEDED,
              };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInputs);
    setUserInputs(tempData);
  };

  const handleNextStatus = async () => {
    setLoading(true);
    try {
      const response: apiResponse = await updateField({
        id: fieldData?.id,
        data: {
          id: fieldData?.id,
          status: nextStatus.value,
        },
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

    setLoading(false);
  };

  const handleUpdateField = async () => {
    setLoading(true);
    try {
      const response: apiResponse = await updateField({
        id: fieldData?.id,
        data: {
          id: fieldData?.id,
          name: userInputs.name === '' ? fieldData?.name : userInputs.name,
        },
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

    setLoading(false);
  };

  const handleCancel = () => {
    setUserInputs({ name: fieldData?.name ?? '' });
  };

  useEffect(() => {
    if (data) {
      setFieldData(data.result);
    }
  }, [data]);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div>
          <Breadcrumb pageParent='Field' pageName='Edit Field' />

          <div className='flex w-full items-center justify-center'>
            <div className='flex w-2/3 flex-col gap-3 bg-white px-10 py-10'>
              <div className='flex items-center justify-between px-5'>
                <div className='flex items-center gap-2'>
                  <div className='text-sm font-semibold underline underline-offset-8'>
                    <span className='text-danger'>*</span> Current status:{' '}
                  </div>
                  <button
                    type='button'
                    className={`btn border-0 bg-status-${getStatusColor(fieldData?.status as SD_FieldStatus)}-light text-status-${getStatusColor(fieldData?.status as SD_FieldStatus)}-dark`}
                  >
                    {fieldData?.status}
                  </button>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='text-sm font-semibold underline underline-offset-8'>
                    <span className='text-danger'>*</span> Next status:{' '}
                  </div>
                  <div
                    className='tooltip tooltip-bottom'
                    data-tip='Click to change to next status'
                    onClick={handleNextStatus}
                  >
                    <button
                      type='button'
                      className={`btn btn-outline btn-${nextStatus.color}`}
                    >
                      {nextStatus.value}
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <label className='input input-bordered mt-5 flex items-center gap-2 bg-white text-sm'>
                  <span className='font-bold'>Name</span>
                  <input
                    type='text'
                    className='grow opacity-90'
                    placeholder='Daisy'
                    defaultValue={fieldData?.name}
                    name='name'
                    onChange={handleChange}
                  />
                </label>
                <label className='input input-bordered flex items-center gap-2 bg-white text-sm'>
                  <span className='font-bold'>Farm Name</span>
                  <input
                    type='text'
                    className='grow cursor-not-allowed opacity-90'
                    placeholder='daisy@site.com'
                    name='farmName'
                    defaultValue={fieldData?.farm?.name}
                    readOnly
                  />
                </label>
                <label className='input input-bordered flex items-center gap-2 bg-white text-sm'>
                  <span className='font-bold'>Total Area</span>
                  <input
                    type='text'
                    className='grow cursor-not-allowed opacity-90'
                    placeholder='daisy@site.com'
                    value={fieldData?.area?.toFixed(2) + ' m²'}
                    onChange={handleChange}
                    name='area'
                    readOnly
                  />
                  <Link
                    to={`/app/map?fieldId=${fieldData?.id}&polygonId=${fieldData?.polygonApp?.id}&lat=${fieldData?.location?.lat}&lng=${fieldData?.location?.lng}`}
                    className='flex items-center gap-1 font-medium underline underline-offset-4 hover:text-green-400 hover:decoration-2'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 24 24'
                    >
                      <title>move_line</title>
                      <g id='move_line' fill='none' fillRule='nonzero'>
                        <path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z' />
                        <path
                          fill='#09244BFF'
                          d='M8.464 6.707a1 1 0 0 1 0-1.414l2.758-2.758a1.1 1.1 0 0 1 1.556 0l2.757 2.758a1 1 0 1 1-1.414 1.414L13 5.586V11h5.414l-1.121-1.121a1 1 0 0 1 1.414-1.415l2.758 2.758a1.1 1.1 0 0 1 0 1.556l-2.758 2.758a1 1 0 0 1-1.414-1.415L18.414 13H13v5.414l1.121-1.121a1 1 0 0 1 1.414 1.414l-2.757 2.758a1.1 1.1 0 0 1-1.556 0l-2.758-2.758a1 1 0 1 1 1.415-1.414l1.12 1.121V13H5.587l1.121 1.121a1 1 0 1 1-1.414 1.415l-2.758-2.758a1.1 1.1 0 0 1 0-1.556l2.758-2.758A1 1 0 0 1 6.707 9.88l-1.121 1.12H11V5.587L9.879 6.707a1 1 0 0 1-1.415 0Z'
                        />
                      </g>
                    </svg>
                    Edit area
                  </Link>
                </label>

                <div className='mt-6 flex items-center justify-end gap-2'>
                  <button
                    type='button'
                    disabled={loading}
                    className='btn btn-primary text-white'
                    onClick={() => {
                      (
                        document.getElementById(
                          'fuco_modal',
                        ) as HTMLDialogElement
                      )?.showModal();
                    }}
                  >
                    {!loading ? 'Update Field' : <MiniLoader />}
                  </button>
                  <button
                    type='button'
                    className='btn'
                    onClick={() => navigate(-1)}
                  >
                    Back to list
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal
            width=''
            title='update this farm name?'
            onConfirm={handleUpdateField}
            onCancel={handleCancel}
          />
        </div>
      )}
    </>
  );
};
