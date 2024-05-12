import { ScrollAnimationWrapper } from '~/components/Animation';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { getPlanListSuggest, getScrollAnimation } from '~/helper';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '~/api/fieldApi';
import { fieldModel, plantSuggestModel } from '~/interfaces';
import LandImage from '../../../../public/LandTemp.jpg';
import { CycleIcon, EditTableIcon, SunIcon, WateringIcon } from '~/components/Icon';

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
            <table className='min-w-full'>
              <thead className='bg-white text-type-2 font-bold'>
                <tr>
                  <th scope='col' className='px-4 py-4 text-sm border-r border-type-1'></th>
                  <th scope='col' className='px-4 py-3.5 text-sm text-left rtl:text-right border-r border-type-1'>
                    <button className='flex items-center gap-x-1 focus:outline-none'>
                      <CycleIcon /> Cycle
                    </button>
                  </th>

                  <th scope='col' className='px-4 py-3.5 text-sm text-left rtl:text-right border-r border-type-1'>
                    <button className='flex items-center gap-x-1 focus:outline-none'>
                      <WateringIcon /> Watering
                    </button>
                  </th>

                  <th scope='col' className='px-4 py-3.5 text-sm text-left rtl:text-right border-r border-type-1'>
                    <button className='flex items-center gap-x-1 focus:outline-none'>
                      <SunIcon /> Sunlight
                    </button>
                  </th>
                  <th scope='col' className='relative py-3.5 px-4'>
                    <span className='sr-only'>Detail</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {plantList &&
                  plantList.map((plant: plantSuggestModel) => (
                    <tr key={plant.id}>
                      <td className='px-4 py-4 text-sm whitespace-nowrap border-r border-type-1'>
                        <NavLink to='#' className='flex items-center gap-2'>
                          <motion.img
                            src={plant?.default_image?.original_url}
                            className='w-20 h-20 rounded-full'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          />
                          <span className='flex flex-col gap-1'>
                            <h1 className='text-accent'>{plant.common_name}</h1>
                            <p className='text-body text-sm'>{plant.scientific_name}</p>
                          </span>
                        </NavLink>
                      </td>
                      <td className='px-4 py-4 text-sm text-body border-r border-type-1'>{plant.cycle}</td>
                      <td className='px-4 py-4 text-sm text-body border-r border-type-1'>{plant.watering}</td>
                      <td className='px-4 py-4 text-sm text-body border-r border-type-1'>
                        {plant.sunlight.map((s) => s + ', ')}
                      </td>
                      <td className='px-4 py-4 text-sm text-body'>
                        <Link to='#' className='text-primary underline flex items-center gap-1'>
                          <EditTableIcon /> Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </>
  );
};
