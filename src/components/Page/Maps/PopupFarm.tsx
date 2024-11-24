import * as turf from '@turf/turf';
import { Link } from 'react-router-dom';
import { EditTableIcon, ForecastIcon, SearchWorldIcon } from '~/components/Icon';
import { farmModel } from '~/interfaces';

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
            strokeLinecap='round'
            strokeLinejoin='round'
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
          {farmInfo.area!.toFixed(2)} m² ({turf.convertArea(farmInfo.area!, 'meters', 'acres').toFixed(2)} acres)
        </div>
      </div>
      <div className='text-sm mt-2'>
        <Link to={`/app/gpaSearch/home/${farmInfo.id}?type=0`} className='flex items-center gap-1'>
          <SearchWorldIcon />
          <div className='underline'>Search Social Indicators</div>
        </Link>
      </div>
      <div className='text-sm'>
        <Link to={`/app/land/field/updateField/${farmInfo.id}`} className='flex items-center gap-1'>
          <ForecastIcon />
          <div className='underline'>Weather Forecast</div>
        </Link>
      </div>
      <div className='text-sm'>
        <Link to='/app/map' className='flex items-center gap-1'>
          <EditTableIcon />
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
              fillRule='evenodd'
              d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z'
              clipRule='evenodd'
            />
          </svg>
          <div className='underline'>Delete</div>
        </Link>
      </div>
    </div>
  );
};
