import { ScrollAnimationWrapper } from '~/components/Animation';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { getPlanListSuggest, getScrollAnimation } from '~/helper';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '~/api/fieldApi';
import { fieldModel, plantSuggestModel } from '~/interfaces';
import LandImage from '../../../../public/LandTemp.jpg';
import { PlantSugesstion } from '~/components/Page/Fields';

export const FieldSuggestion = () => {
  const [fieldData, setFieldData] = useState<fieldModel>();
  const [plantList, setPlantList] = useState<plantSuggestModel[]>();
  const { id } = useParams();
  const { data, isLoading } = useGetFieldByIdQuery(id);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  useEffect(() => {
    if (data) {
      setFieldData(data.result);
    }
  }, [data]);

  useEffect(() => {
    async function fetchPlantSuggest() {
      try {
        const response = await getPlanListSuggest(1);
        setPlantList(response.data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
      }
    }
    fetchPlantSuggest();
  }, []);
  console.log(plantList);

  return (
    <>
      <div className='flex flex-col gap-6'>
        <ScrollAnimationWrapper>
          <motion.div variants={scrollAnimation} className='grid grid-cols-1'>
            <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default w-full'>
              <div>Soil Quality</div>
              <div className='grid grid-cols-3 py-4 px-6'>
                <img src={LandImage} className='h-full col-span-1' />
                <div className='bg-be grid grid-cols-2 col-span-2'>
                  <div className='px-16 py-4'>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Chlorophyll:</p>
                      <p>{fieldData?.soilQuality?.chlorophyll} µg/L</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Iron:</p>
                      <p>{fieldData?.soilQuality?.iron} mol/L</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Nitrate:</p>
                      <p>{fieldData?.soilQuality?.nitrate} mol/L</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Phyto:</p>
                      <p>{fieldData?.soilQuality?.phyto} g C/m³L</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Oxygen:</p>
                      <p>{fieldData?.soilQuality?.oxygen} mol/L</p>
                    </div>

                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Phytoplankton:</p>
                      <p>{fieldData?.soilQuality?.phytoplankton} g C/m³</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Silicate:</p>
                      <p>{fieldData?.soilQuality?.silicate} mol/L</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>Salinity:</p>
                      <p>{fieldData?.soilQuality?.salinity} per mille</p>
                    </div>

                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>pH:</p>
                      <p>{fieldData?.soilQuality?.pH}</p>
                    </div>
                  </div>
                  <div className='px-12 py-4'>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>SoilTemperature:</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+0-10cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilTemperature}°C</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+10-40cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilTemperature10cm}°C</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+40-100cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilTemperature40cm}°C</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+100-200cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilTemperature100cm}°C</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='text-black font-medium'>SoilMoisture:</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+0-10cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilMoisture}%</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+10-40cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilMoisture10cm}%</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+40-100cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilMoisture40cm}%</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>+100-200cm below surface:</p>
                      <p>{fieldData?.soilQuality?.soilMoisture100cm}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
        <PlantSugesstion plantList={plantList ?? []} />
      </div>
    </>
  );
};
