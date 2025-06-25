import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CareLevelIcon,
  CycleIcon,
  DroughtIcon,
  EdibleIcon,
  FlowersIcon,
  FruitsIcon,
  GrowthRateIcon,
  HardinessZoneIcon,
  LeafColorIcon,
  LeafIcon,
  MaintenanceIcon,
  PropogationIcon,
  SaltIcon,
  SoilIcon,
  SunIcon,
  TropicalIcon,
  WateringIcon,
} from '@/components/Icon';
import { getPlantSuggest } from '@/helper';
import { plantSuggestModel } from '@/interfaces';
import { AButton } from '@/common/ui-common';

export const PlantDetail = () => {
  const [plantDetail, setPlantDetail] = useState<plantSuggestModel | null>(
    null,
  );
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function fetchPlantDetail() {
      const response = await getPlantSuggest(id ?? '1');
      setPlantDetail(response);
    }
    fetchPlantDetail();
  }, []);

  return (
    <div className='grid h-full grid-cols-5 bg-white'>
      <div className='col-span-2'>
        <img
          className='h-2/3 w-full px-4 py-6'
          src={plantDetail?.default_image.original_url}
          alt={plantDetail?.default_image.license_name}
        />
      </div>
      <div className='col-span-3'>
        <div className='px-4 py-6'>
          <p className='text-4xl font-bold text-black'>
            {plantDetail?.common_name}
          </p>
          <p className='py-2 italic text-primary'>
            {plantDetail?.scientific_name}.
          </p>
          <p className='text-justify text-sm'>{plantDetail?.description}</p>
          <div className='mt-4 grid grid-cols-2 bg-stone-500 text-black'>
            <div className='px-6 py-4 text-sm'>
              <div className='flex items-center gap-1'>
                <CycleIcon /> Cycle:
                <span>{plantDetail?.cycle}</span>
              </div>
              <div className='flex items-center gap-1'>
                <PropogationIcon /> Propagation:
                <span>{plantDetail?.propagation.map((s) => s + ', ')}</span>
              </div>
              <div className='flex items-center gap-1'>
                <FlowersIcon /> Flowers:
                <span>{plantDetail?.flowers}</span>
              </div>
              <div className='flex items-center gap-1'>
                <SoilIcon /> Soil:
                <span>{plantDetail?.soil}</span>
              </div>
              <div className='flex items-center gap-1'>
                <EdibleIcon /> Edible:
                <span>{plantDetail?.edible_fruit}</span>
              </div>
              <div className='flex items-center gap-1'>
                <LeafColorIcon /> Leaf color:
                <span>{plantDetail?.leaf_color}</span>
              </div>
              <div className='flex items-center gap-1'>
                <MaintenanceIcon /> Maintenance:
                <span>{plantDetail?.maintenance}</span>
              </div>
              <div className='flex items-center gap-1'>
                <SaltIcon /> Salt Tolerant:
                <span>{plantDetail?.salt_tolerant}</span>
              </div>
              <div className='flex items-center gap-1'>
                <CareLevelIcon /> Care Level:
                <span>{plantDetail?.care_level}</span>
              </div>
            </div>
            <div className='px-12 py-4 text-sm'>
              <div className='flex items-center gap-1'>
                <WateringIcon /> Watering:
                <span>{plantDetail?.watering}</span>
              </div>
              <div className='flex items-center gap-1'>
                <HardinessZoneIcon /> Hardiness Zone:
                <span>{plantDetail?.hardiness.max}</span>
              </div>
              <div className='flex items-center gap-1'>
                <SunIcon /> Sun:
                <span>{plantDetail?.sunlight}</span>
              </div>
              <div className='flex items-center gap-1'>
                <FruitsIcon /> Fruits:
                <span>{plantDetail?.fruits}</span>
              </div>
              <div className='flex items-center gap-1'>
                <LeafIcon /> Leaf:
                <span>{plantDetail?.leaf}</span>
              </div>
              <div className='flex items-center gap-1'>
                <GrowthRateIcon /> Growth Rate:
                <span>{plantDetail?.growth_rate}</span>
              </div>
              <div className='flex items-center gap-1'>
                <DroughtIcon /> Drought Tolerant:
                <span>{plantDetail?.drought_tolerant}</span>
              </div>
              <div className='flex items-center gap-1'>
                <TropicalIcon /> Tropical:<span>{plantDetail?.tropical}</span>
              </div>
            </div>
          </div>
          <div className='mt-4 flex items-center gap-2'>
            <AButton variant='solid' color='cyan'>
              Leave your experience
            </AButton>
            <AButton type='default' onClick={() => navigate(-1)}>
              Back
            </AButton>
          </div>
        </div>
      </div>
    </div>
  );
};
