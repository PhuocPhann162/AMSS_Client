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
        {fieldInfo.name}
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
        <div className='text-zinc-500 flex items-center gap-1'>
          <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 24 24'>
            <title>wave_line</title>
            <g id='wave_line' fill='none' fillRule='nonzero'>
              <path d='M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01-.184-.092Z' />
              <path
                fill='#09244BFF'
                d='M18.223 6.239a11.08 11.08 0 0 0-5.508.558l-.344.132a13.106 13.106 0 0 1-6.898.81c-1.002-.155-2.007-.39-2.92-.844a1 1 0 0 1 .784-1.836l.107.045c.721.351 1.547.537 2.333.658a11.08 11.08 0 0 0 5.508-.56l.344-.13a13.106 13.106 0 0 1 6.898-.81c.987.152 2.018.395 2.92.843a1 1 0 0 1 .448 1.342 1.01 1.01 0 0 1-1.34.448c-.728-.342-1.542-.535-2.332-.656Zm0 6a11.08 11.08 0 0 0-5.508.558l-.344.132a13.105 13.105 0 0 1-6.898.81c-1.002-.155-2.007-.39-2.92-.844a1 1 0 0 1 .784-1.836l.107.045c.721.351 1.547.537 2.333.658a11.08 11.08 0 0 0 5.508-.56l.344-.13a13.106 13.106 0 0 1 6.898-.81c.987.152 2.018.395 2.92.843a1 1 0 0 1 .448 1.342 1.01 1.01 0 0 1-1.34.448c-.728-.342-1.542-.535-2.332-.656Zm-6.218 6.83.366-.14c2.301-.92 4.365-.92 5.852-.69.79.121 1.604.314 2.331.656a1.01 1.01 0 0 0 1.34-.448 1 1 0 0 0-.448-1.342c-.901-.448-1.932-.691-2.919-.843a13.08 13.08 0 0 0-6.532.67l-.366.14c-2.301.92-4.365.919-5.852.69-.674-.104-1.376-.255-2.018-.517l-.315-.14a1 1 0 0 0-.89 1.79c.912.455 1.917.69 2.919.843 1.683.26 3.98.27 6.532-.669Z'
              />
            </g>
          </svg>
          {nearestRiver ? nearestRiver : 'No river found nearby'}
        </div>
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
