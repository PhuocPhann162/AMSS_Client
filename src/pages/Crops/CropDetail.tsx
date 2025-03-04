import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCropByIdQuery } from '~/api/cropApi';
import {
  CareLevelIcon,
  CycleIcon,
  EdibleIcon,
  FruitsIcon,
  GrowthRateIcon,
  HardinessZoneIcon,
  PropogationIcon,
  SoilIcon,
  WateringIcon
} from '~/components/Icon';
import { MainLoader } from '~/components/Page/common';
import { cropModel } from '~/interfaces';

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
        <div className='grid grid-cols-5 bg-white h-full'>
          <div className='col-span-2'>
            <img className='h-full w-full py-6 px-4' src={cropDetail?.icon} alt={cropDetail?.name} />
          </div>
          <div className='col-span-3'>
            <div className='px-4 py-6'>
              <p className='text-black font-bold text-4xl'>{cropDetail?.name}</p>
              <p className='text-primary italic py-2'>{cropDetail?.cropType?.type}.</p>
              <p className='text-sm text-justify'>{cropDetail?.description}</p>
              <div className='bg-be grid grid-cols-2 text-black mt-4'>
                <div className='text-sm py-4 px-6'>
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
                <div className='text-sm py-4 px-12'>
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
              <div className='flex items-center gap-2'>
                <button className='btn btn-accent mt-2 text-white'>Leave your experience</button>
                <button className='btn mt-2 text-white' onClick={() => navigate(-1)}>
                  Back to list
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
