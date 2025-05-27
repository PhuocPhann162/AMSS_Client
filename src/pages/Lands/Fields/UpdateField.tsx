import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery, useUpdateFieldMutation } from '@/api';
import EditAreaIcon from '@/components/Icon/icon-svg/edit-area.svg?react';
import { Breadcrumb } from '@/components/UI';
import { getStatusColor, inputHelper, toastNotify } from '@/helper';
import { apiResponse, fieldModel } from '@/interfaces';
import { SD_FieldStatus } from '@/utils/SD';
import { AButton, ADescriptions, ATag } from '@/common/ui-common';
import { PopupConfirmation } from '@/components/UI/modal';
import { fieldEditDescriptionItems } from '@/helper/descriptionItems';
import { PopupCrop } from '@/components/Page/Crop';

type NextStatusType = {
  color: string;
  value: SD_FieldStatus;
};

export const UpdateField = () => {
  const navigate = useNavigate();
  const [fieldData, setFieldData] = useState<fieldModel>();
  const [loading, setLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: fieldData?.name ?? '',
  });
  const [isOpenUpdateFieldModal, setIsOpenUpdateFieldModal] =
    useState<boolean>(false);
  const { id } = useParams();
  const { data } = useGetFieldByIdQuery(id);
  const [updateField] = useUpdateFieldMutation();

  const nextStatus: NextStatusType | null =
    fieldData && fieldData?.status === SD_FieldStatus.IDLE
      ? { color: 'success', value: SD_FieldStatus.PLANTED }
      : fieldData?.status === SD_FieldStatus.PLANTED
        ? { color: 'info', value: SD_FieldStatus.NEEDS_CARE }
        : fieldData?.status === SD_FieldStatus.NEEDS_CARE
          ? { color: 'warning', value: SD_FieldStatus.AWAITING_HARVEST }
          : fieldData?.status === SD_FieldStatus.AWAITING_HARVEST
            ? { color: 'accent', value: SD_FieldStatus.HARVESTING }
            : fieldData?.status === SD_FieldStatus.HARVESTING
              ? { color: 'error', value: SD_FieldStatus.RECOVERY_NEEDED }
              : null;

  const handleNextStatus = async () => {
    setLoading(true);
    try {
      const response: apiResponse = await updateField({
        id: fieldData?.id,
        data: {
          id: fieldData?.id,
          status: nextStatus?.value,
        },
      });
      if (response && response.data?.isSuccess) {
        toastNotify("Field's status has been updated successfully", 'success');
        setIsOpenUpdateFieldModal(false);
      }
    } catch (e) {
      toastNotify(
        (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        'error',
      );
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
      } else {
        toastNotify('Failed to update field name', 'error');
      }
    } catch (e) {
      toastNotify(
        (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        'error',
      );
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpenUpdateFieldModal(false);
    setUserInputs({ name: fieldData?.name ?? '' });
  };

  useEffect(() => {
    if (data) {
      setFieldData(data.result);
    }
  }, [data]);

  return (
    <>
      <div>
        <PopupConfirmation
          isOpen={isOpenUpdateFieldModal}
          content={`Kind Reminder: This action will update status to ${nextStatus?.value} for this field`}
          onConfirm={handleNextStatus}
          onCancel={handleCancel}
        />
        <Breadcrumb pageParent='Field' pageName='Edit Field' />

        <div className='flex w-full items-center justify-center'>
          <div className='flex w-3/4 flex-col gap-3 bg-white px-10 py-10'>
            <PopupCrop fieldId={fieldData?.id ?? ''} isPlantedCrop={true} />
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='text-sm font-semibold underline underline-offset-8'>
                  <span className='text-danger'>*</span> Current status:{' '}
                </div>
                <ATag color={getStatusColor(fieldData?.status ?? '')}>
                  {fieldData?.status}
                </ATag>
              </div>
              <div className='flex items-center gap-2'>
                <div className='text-sm font-semibold underline underline-offset-8'>
                  <span className='text-danger'>*</span> Next status:{' '}
                </div>
                <div
                  className='tooltip tooltip-bottom'
                  data-tip='Click to change to next status'
                >
                  <AButton
                    type='link'
                    onClick={() => setIsOpenUpdateFieldModal(true)}
                    className='flex items-center gap-1 rounded-full border border-primary bg-gradient-to-r from-green-400 to-blue-400 px-3 py-1 font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                    aria-label='Next step: Change field status'
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ')
                        setIsOpenUpdateFieldModal(true);
                    }}
                  >
                    <ATag
                      color={getStatusColor(nextStatus?.value ?? '')}
                      className='border-none bg-white font-bold text-primary'
                    >
                      {nextStatus?.value ?? ''}
                    </ATag>
                    <svg
                      className='ml-1 h-4 w-4 text-white'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </AButton>
                </div>
              </div>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-6 rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm shadow-sm md:grid-cols-2'>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Internal ID:
                </span>
                <span className='font-semibold text-gray-900'>
                  {fieldData?.internalId ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Name:
                </span>
                <span className='font-semibold text-primary'>
                  {fieldData?.name ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Farm Name:
                </span>
                <span className='font-semibold text-green-700'>
                  {fieldData?.farm?.name ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Total Area:
                </span>
                <span className='inline-flex items-center gap-1 font-semibold text-blue-700'>
                  <svg
                    className='h-4 w-4 text-blue-400'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <rect
                      x='3'
                      y='3'
                      width='18'
                      height='18'
                      rx='2'
                      stroke='currentColor'
                      strokeWidth='2'
                      fill='none'
                    />
                    <path
                      d='M3 9h18M9 21V9'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                  </svg>
                  {fieldData?.area !== undefined
                    ? `${fieldData.area.toFixed(2)} m²`
                    : 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Location:
                </span>
                <span className='inline-flex items-center gap-1 font-semibold'>
                  {fieldData?.location?.address ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Planting Format:
                </span>
                <span className='font-semibold text-gray-700'>
                  {fieldData?.plantingFormat ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Location Type:
                </span>
                <span className='font-semibold text-gray-700'>
                  {fieldData?.locationType ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Light Profile:
                </span>
                <span className='font-semibold text-gray-700'>
                  {fieldData?.lightProfile ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Grazing Rest Days:
                </span>
                <span className='font-semibold text-gray-700'>
                  {fieldData?.grazingRestDays ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Owner Name:
                </span>
                <span className='font-semibold text-gray-700'>
                  {fieldData?.farm?.ownerName ?? 'N/A'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='min-w-[120px] font-medium text-gray-500'>
                  Created Date:
                </span>
                <span className='font-semibold text-gray-700'>
                  {fieldData?.createdAt
                    ? new Date(fieldData.createdAt).toLocaleString()
                    : 'N/A'}
                </span>
              </div>
            </div>
            <div className='mt-5 flex flex-col gap-3'>
              <Link
                to={`/app/map?fieldId=${fieldData?.id}&polygonId=${fieldData?.polygonApp?.id}&lat=${fieldData?.location?.lat}&lng=${fieldData?.location?.lng}`}
                className='flex items-center gap-1 font-medium underline underline-offset-4 hover:text-green-400 hover:decoration-2'
              >
                <EditAreaIcon />
                Edit area
              </Link>

              <div className='mt-6 flex items-center justify-center gap-2'>
                <AButton
                  type='primary'
                  color='default'
                  loading={loading}
                  className='btn btn-primary text-white'
                  onClick={handleUpdateField}
                >
                  Update Field
                </AButton>
                <AButton type='default' onClick={() => navigate(-1)}>
                  Back to list
                </AButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
