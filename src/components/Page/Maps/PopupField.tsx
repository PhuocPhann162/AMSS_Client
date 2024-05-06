import * as turf from '@turf/turf';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteFieldMutation } from '~/api/fieldApi';
import { Modal } from '~/common';
import { EditTableIcon, ForecastIcon } from '~/components/Icon';
import { findNearestRiver } from '~/helper';
import { fieldModel } from '~/interfaces';

interface PopupFieldProps {
  fieldInfo: fieldModel;
}

export const PopupField = ({ fieldInfo }: PopupFieldProps) => {
  const [nearestRiver, setNearestRiver] = useState<string>('');
  const [deleteField] = useDeleteFieldMutation();

  const handleDelete = async (id: number) => {
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
      }
    }
    findNearestRiverAsync();
  }, [fieldInfo]);

  return (
    <div className='flex flex-col w-72 gap-1 '>
      <div className='flex items-center font-bold text-lg text-brown gap-1'>
        {fieldInfo.name}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
          />
        </svg>
      </div>
      <Link to='/app/map' className='flex items-center font-bold underline text-sm text-brown gap-1'>
        {fieldInfo.name}
      </Link>
      <div className='flex items-center text-sm gap-2 mt-1'>
        <div className='font-bold'>Total area:</div>
        <div className='text-zinc-500'>
          {fieldInfo.area!.toFixed(2)} m² ({turf.convertArea(fieldInfo.area!, 'meters', 'acres').toFixed(2)} acres)
        </div>
      </div>
      <div className='flex items-center text-sm gap-2'>
        <div className='font-bold'>Neareast River:</div>
        <div className='text-zinc-500'>{nearestRiver ? nearestRiver : 'No river found nearby'}</div>
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5 text-error'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z'
              clipRule='evenodd'
            />
          </svg>
          <div className='underline'>Delete</div>
        </button>
      </div>
      <Modal width='' title='delete this field?' onConfirm={() => handleDelete(fieldInfo.id ?? 0)} />
    </div>
  );
};
