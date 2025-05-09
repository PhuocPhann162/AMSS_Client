import * as turf from '@turf/turf';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DeletePopupIcon,
  EditTableIcon,
  ForecastIcon,
  LightIcon,
  MarkerPopupIcon,
  RiverIcon,
  SearchWorldIcon,
} from '@/components/Icon';
import { findNearestRiver } from '@/helper';
import { fieldModel } from '@/interfaces';
import { PopupCrop } from '../Crop';

interface PopupFieldProps {
  fieldInfo: fieldModel;
}

export const PopupField = ({ fieldInfo }: PopupFieldProps) => {
  const [nearestRiver, setNearestRiver] = useState<string>('');
  // const [platnSuggest, setPlantSuggest] = useState<plantSuggestModel | null>(null);

  useEffect(() => {
    async function findNearestRiverAsync() {
      if (fieldInfo) {
        const river = await findNearestRiver(
          fieldInfo.location?.lat ?? 0,
          fieldInfo.location?.lng ?? 0,
        );
        setNearestRiver(river);
        // const plant = await getPlantSuggest();
        // setPlantSuggest(plant);
      }
    }
    findNearestRiverAsync();
  }, [fieldInfo]);

  return (
    <>
      <div className='flex w-80 flex-col gap-1'>
        <PopupCrop fieldId={fieldInfo.id!} />

        <div className='flex items-center gap-1 text-lg font-bold text-brown'>
          <MarkerPopupIcon />
          {fieldInfo.name}
        </div>

        <div className='flex items-center justify-between'>
          <Link
            to={`/app/land/field/suggestion/${fieldInfo.id}`}
            className='flex items-center gap-1 text-sm font-bold text-brown underline'
          >
            {fieldInfo.name} <LightIcon />
          </Link>
        </div>

        <div className='mt-4 flex items-center gap-2 text-sm'>
          <div className='font-bold'>Total area:</div>
          <div className='text-zinc-500'>
            {fieldInfo.area!.toFixed(2)} m² (
            {turf.convertArea(fieldInfo.area!, 'meters', 'acres').toFixed(2)}{' '}
            acres)
          </div>
        </div>
        <div className='flex items-center gap-2 text-sm'>
          <div className='font-bold'>Neareast River:</div>
          <div className='flex items-center gap-1 text-zinc-500'>
            <RiverIcon />
            {nearestRiver ? nearestRiver : 'No river found nearby'}
          </div>
        </div>
        <div className='mt-2 text-sm'>
          <Link
            to={`/app/gpaSearch/home/${fieldInfo.id}?type=1`}
            className='flex items-center gap-1'
          >
            <SearchWorldIcon />
            <div className='underline'>Search Social Indicators</div>
          </Link>
        </div>
        <div className='text-sm'>
          <Link
            to={`/app/land/field/weather/${fieldInfo.id}`}
            className='flex items-center gap-1'
          >
            <ForecastIcon />
            <div className='underline'>Weather Forecast</div>
          </Link>
        </div>
        <div className='flex items-center gap-1 text-sm'>
          <EditTableIcon />
          <Link
            to={`/app/land/field/updateField/${fieldInfo.id}`}
            className='flex items-center gap-1'
          >
            <div className='underline'>Edit Detail</div>
          </Link>
        </div>
        <div className='text-sm'>
          <button className='flex items-center gap-1'>
            <DeletePopupIcon />
            <div className='underline'>Delete</div>
          </button>
        </div>
      </div>
    </>
  );
};
