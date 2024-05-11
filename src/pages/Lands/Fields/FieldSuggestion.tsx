import { ScrollAnimationWrapper } from '~/components/Animation';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { getPlanListSuggest, getScrollAnimation } from '~/helper';
import { NavLink, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '~/api/fieldApi';
import { fieldModel, plantSuggestModel } from '~/interfaces';
import LandImage from '../../../../public/LandTemp.jpg';

export const FieldSuggestion = () => {
  const [fieldData, setFieldData] = useState<fieldModel>();
  const [plantList, setPlantList] = useState<plantSuggestModel[]>();
  const { id } = useParams();
  // const { data, isLoading } = useGetFieldByIdQuery(id);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

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
              <div className='grid grid-cols-2 py-4'>
                <img src={LandImage} />
                <div>Soil Information</div>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <motion.div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default w-full'>
            <div>Plant Suggesstion</div>
            <div className='grid grid-cols-12'>
              <div className='flex flex-col gap-6 py-4 col-span-5'>
                {plantList &&
                  plantList.map((plant: plantSuggestModel) => (
                    <ScrollAnimationWrapper>
                      <motion.div variants={scrollAnimation} className='w-full grid grid-cols-2'>
                        <NavLink key={plant.id} to='#' className='flex items-center gap-2'>
                          <motion.img
                            src={plant?.default_image?.original_url}
                            className='w-20 h-20 rounded-full'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          />
                          <div className='flex flex-col gap-1'>
                            <h1 className='text-accent'>{plant.common_name}</h1>
                            <p className='text-body text-sm'>{plant.scientific_name}</p>
                          </div>
                        </NavLink>
                        <div className='grid grid-cols-3'>
                          <p className='text-body text-sm'>{plant.cycle}</p>
                          <p className='text-body text-sm'>{plant.watering}</p>
                          <p className='text-body text-sm'>{plant.sunlight}</p>
                        </div>
                      </motion.div>
                    </ScrollAnimationWrapper>
                  ))}
              </div>
              <p className='text-body text-sm'>Cycle</p>
              <p className='text-body text-sm'>Watering</p>
              <p className='text-body text-sm'>Sunlight</p>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </>
  );
};
