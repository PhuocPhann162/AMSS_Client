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
          status: nextStatus?.value,
        },
      });
      if (response && response.data?.isSuccess) {
        toastNotify("Field's status has been updated successfully", 'success');
      } else {
        toastNotify('Failed to update field status', 'error');
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
          <div className='flex w-2/3 flex-col gap-3 bg-white px-10 py-10'>
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
                  >
                    <ATag color={getStatusColor(nextStatus?.value ?? '')}>
                      {nextStatus?.value ?? ''}
                    </ATag>
                  </AButton>
                </div>
              </div>
            </div>
            <div className='mt-5 flex flex-col gap-3'>
              <ADescriptions
                colon
                items={fieldEditDescriptionItems(fieldData)}
              />
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
