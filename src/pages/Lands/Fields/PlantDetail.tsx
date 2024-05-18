import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  WateringIcon
} from '~/components/Icon';
import { getPlantSuggest } from '~/helper';
import { plantSuggestModel } from '~/interfaces';

export const PlantDetail = () => {
  const [plantDetail, setPlantDetail] = useState<plantSuggestModel | null>(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchPlantDetail() {
      const response = await getPlantSuggest(id ?? '1');
      setPlantDetail(response);
    }
    fetchPlantDetail();
  }, []);

  return (
    <div className='grid grid-cols-5 bg-white h-full'>
      <div className='col-span-2'>
        <img
          className='h-2/3 w-full py-6 px-4'
          src={plantDetail?.default_image.original_url}
          alt={plantDetail?.default_image.license_name}
        />
      </div>
      <div className='col-span-3'>
        <div className='px-4 py-6'>
          <p className='text-black font-bold text-4xl'>{plantDetail?.common_name}</p>
          <p className='text-primary italic py-2'>{plantDetail?.scientific_name}.</p>
          <p className='text-sm text-justify'>{plantDetail?.description}</p>
          <div className='bg-be grid grid-cols-2 text-black mt-4'>
            <div className='text-sm py-4 px-6'>
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
                <SaltIcon /> Salt Tolerant:<span>{plantDetail?.salt_tolerant}</span>
              </div>
              <div className='flex items-center gap-1'>
                <CareLevelIcon /> Care Level:<span>{plantDetail?.care_level}</span>
              </div>
            </div>
            <div className='text-sm py-4 px-12'>
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
                <DroughtIcon /> Drought Tolerant:<span>{plantDetail?.drought_tolerant}</span>
              </div>
              <div className='flex items-center gap-1'>
                <TropicalIcon /> Tropical:<span>{plantDetail?.tropical}</span>
              </div>
            </div>
          </div>
          <button className='btn btn-accent mt-2 text-white'>Leave your experience</button>
        </div>
      </div>
    </div>
  );
};
