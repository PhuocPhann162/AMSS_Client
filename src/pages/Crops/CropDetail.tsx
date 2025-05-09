import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCropByIdQuery } from '@/api';
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
import { AButton, ACard, ADescriptions } from '@/common/ui-common';
import { supplierDescriptionItems } from '@/helper/descriptionItems';

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
              <p className='text-justify text-sm italic text-gray-600'>
                {cropDetail?.description}
              </p>
              <div className='mt-4 grid grid-cols-2 bg-be text-black'>
                <div className='flex flex-col gap-1 px-6 py-4 text-sm'>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <CycleIcon /> Cycle:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.cycle}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <PropogationIcon /> Propagation:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.propagation}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <CareLevelIcon /> Care Level:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.careLevel}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <SoilIcon /> Soil:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.soil}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <EdibleIcon /> Edible:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.edible ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                <div className='flex flex-col gap-1 px-12 py-4 text-sm'>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <WateringIcon /> Watering:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.watering}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <HardinessZoneIcon /> Hardiness Zone:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.hardinessZone}
                    </span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex gap-1'>
                      <FruitsIcon /> Indoor:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.indoor ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                      <GrowthRateIcon /> Growth Rate:
                    </div>
                    <span className='font-semibold text-[#5D3D2E]'>
                      {cropDetail?.growthRate}
                    </span>
                  </div>
                </div>
              </div>
              {cropDetail?.supplier && (
                <ACard title={'Supplier Information'} className='mt-4'>
                  <ADescriptions
                    column={2}
                    bordered
                    colon
                    layout='vertical'
                    items={supplierDescriptionItems(cropDetail?.supplier)}
                  />
                </ACard>
              )}
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
