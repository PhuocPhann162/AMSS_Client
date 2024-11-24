import * as turf from '@turf/turf';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteFieldMutation } from '~/api/fieldApi';
import { Modal } from '~/common';
import {
  DeletePopupIcon,
  EditTableIcon,
  ForecastIcon,
  LightIcon,
  MarkerPopupIcon,
  RiverIcon,
  SearchWorldIcon
} from '~/components/Icon';
import { findNearestRiver } from '~/helper';
import { fieldModel } from '~/interfaces';
import { PopupCrop } from '../Crop';

interface PopupFieldProps {
  fieldInfo: fieldModel;
}

export const PopupField = ({ fieldInfo }: PopupFieldProps) => {
  const [nearestRiver, setNearestRiver] = useState<string>('');
  // const [platnSuggest, setPlantSuggest] = useState<plantSuggestModel | null>(null);
  const [deleteField] = useDeleteFieldMutation();

  const handleDelete = async (id?: string) => {
    try {
      toast.promise(
        deleteField(id),
        {
          pending: 'Processing your request...',
          success: 'Field deleted successfully 👌',

          error: 'An unexpected error occured 🤯'
        },
        {
          theme: 'colored'
        }
      );
      (document.getElementById('fuco_modal') as HTMLDialogElement)?.close();
    } catch (error: any) {
      console.log(error.message, 'error');
    }
  };

  useEffect(() => {
    async function findNearestRiverAsync() {
      if (fieldInfo) {
        const river = await findNearestRiver(fieldInfo.location?.lat ?? 0, fieldInfo.location?.lng ?? 0);
        setNearestRiver(river);
        // const plant = await getPlantSuggest();
        // console.log(plant);
        // setPlantSuggest(plant);
      }
    }
    findNearestRiverAsync();
  }, [fieldInfo]);

  return (
    <>
      <div className='flex flex-col w-80 gap-1 '>
        <PopupCrop fieldId={fieldInfo.id!} />

        <div className='flex items-center font-bold text-lg text-brown gap-1'>
          <MarkerPopupIcon />
          {fieldInfo.name}
        </div>

        <div className='flex items-center justify-between'>
          <Link
            to={`/app/land/field/suggestion/${fieldInfo.id}`}
            className='flex items-center font-bold underline text-sm text-brown gap-1'
          >
            {fieldInfo.name} <LightIcon />
          </Link>
        </div>

        <div className='flex items-center text-sm gap-2 mt-4'>
          <div className='font-bold'>Total area:</div>
          <div className='text-zinc-500'>
            {fieldInfo.area!.toFixed(2)} m² ({turf.convertArea(fieldInfo.area!, 'meters', 'acres').toFixed(2)} acres)
          </div>
        </div>
        <div className='flex items-center text-sm gap-2'>
          <div className='font-bold'>Neareast River:</div>
          <div className='text-zinc-500 flex items-center gap-1'>
            <RiverIcon />
            {nearestRiver ? nearestRiver : 'No river found nearby'}
          </div>
        </div>
        <div className='text-sm mt-2'>
          <Link to={`/app/gpaSearch/home/${fieldInfo.id}?type=1`} className='flex items-center gap-1'>
            <SearchWorldIcon />
            <div className='underline'>Search Social Indicators</div>
          </Link>
        </div>
        <div className='text-sm'>
          <Link to={`/app/land/field/weather/${fieldInfo.id}`} className='flex items-center gap-1'>
            <ForecastIcon />
            <div className='underline'>Weather Forecast</div>
          </Link>
        </div>
        <div className='text-sm flex items-center gap-1'>
          <EditTableIcon />
          <Link to={`/app/land/field/updateField/${fieldInfo.id}`} className='flex items-center gap-1'>
            <div className='underline'>Edit Detail</div>
          </Link>
        </div>
        <div className='text-sm'>
          <button
            className='flex items-center gap-1'
            onClick={() => {
              (document.getElementById('fuco_modal') as HTMLDialogElement)?.showModal();
            }}
          >
            <DeletePopupIcon />
            <div className='underline'>Delete</div>
          </button>
        </div>
        <Modal width='' title='delete this field?' onConfirm={() => handleDelete(fieldInfo.id ?? '')} />
      </div>
    </>
  );
};
