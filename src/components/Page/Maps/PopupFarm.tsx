import farmModel from '~/interfaces/farmModel';
import * as turf from '@turf/turf';
import { Link } from 'react-router-dom';

interface PopupFarmProps {
  farmInfo: farmModel;
}

export const PopupFarm = ({ farmInfo }: PopupFarmProps) => {
  return (
    <div className='flex flex-col w-72 gap-1'>
      <div className='flex items-center font-bold text-lg text-brown gap-1'>
        {farmInfo.name}
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
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
          />
        </svg>
      </div>
      <Link to='/app/map' className='flex items-center font-bold underline text-sm text-brown gap-1'>
        {farmInfo.name}
      </Link>
      <div className='flex items-center text-sm gap-2 mt-1'>
        <div className='font-bold'>Total area:</div>
        <div className='text-zinc-500'>
          {farmInfo.area.toFixed(2)} sqrt ({turf.convertArea(farmInfo.area, 'meters', 'acres').toFixed(2)} acres)
        </div>
      </div>
      <div className='text-sm'>
        <Link to='/app/map' className='flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5 text-stone-800'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
            />
          </svg>
          <div className='underline'>Edit Detail</div>
        </Link>
      </div>
      <div className='text-sm'>
        <Link to='/app/map' className='flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5 text-error'
          >
            <path
              fill-rule='evenodd'
              d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z'
              clip-rule='evenodd'
            />
          </svg>
          <div className='underline'>Delete</div>
        </Link>
      </div>
    </div>
  );
};
