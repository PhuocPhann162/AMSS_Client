import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCropByIdQuery } from '@/api/cropApi';
import {
  CareLevelIcon,
  CycleIcon,
  EdibleIcon,
  FruitsIcon,
  GrowthRateIcon,
  HardinessZoneIcon,
  PropogationIcon,
  SoilIcon,
  WateringIcon,
} from '@/components/Icon';
import { MainLoader } from '@/components/Page/common';
import { cropModel } from '@/interfaces';
import { AButton } from '@/common/ui-common';

export const CropDetail = () => {
  const navigate = useNavigate();
  const [cropDetail, setCropDetail] = useState<cropModel>();
  const { id } = useParams();
  const { data, isLoading } = useGetCropByIdQuery(id);
  useEffect(() => {
    if (data) {
      setCropDetail(data.result);
    }
  }, [data]);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className='grid h-full grid-cols-5 bg-white'>
          <div className='col-span-2'>
            <img
              className='h-full w-full px-4 py-6'
              src={cropDetail?.icon}
              alt={cropDetail?.name}
            />
          </div>
          <div className='col-span-3'>
            <div className='px-4 py-6'>
              <p className='text-4xl font-bold text-black'>
                {cropDetail?.name}
              </p>
              <p className='py-2 italic text-primary'>
                {cropDetail?.cropType?.type}
              </p>
              <p className='text-justify text-sm'>{cropDetail?.description}</p>
              <div className='mt-4 grid grid-cols-2 bg-be text-black'>
                <div className='px-6 py-4 text-sm'>
                  <div className='flex items-center gap-1'>
                    <CycleIcon /> Cycle:
                    <span>{cropDetail?.cycle}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <PropogationIcon /> Propagation:
                    <span>{cropDetail?.propogation}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CareLevelIcon /> Care Level:
                    <span>{cropDetail?.careLevel}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <SoilIcon /> Soil:
                    <span>{cropDetail?.soil}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <EdibleIcon /> Edible:
                    <span>{cropDetail?.edible}</span>
                  </div>
                </div>
                <div className='px-12 py-4 text-sm'>
                  <div className='flex items-center gap-1'>
                    <WateringIcon /> Watering:
                    <span>{cropDetail?.watering}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <HardinessZoneIcon /> Hardiness Zone:
                    <span>{cropDetail?.hardinessZone}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FruitsIcon /> Indoor:
                    <span>{cropDetail?.indoor}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <GrowthRateIcon /> Growth Rate:
                    <span>{cropDetail?.growthRate}</span>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex items-center gap-2'>
                <AButton type='primary'>Leave your experience</AButton>
                <AButton onClick={() => navigate(-1)}>Back to list</AButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
