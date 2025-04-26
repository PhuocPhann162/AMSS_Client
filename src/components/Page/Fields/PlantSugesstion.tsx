import React, { useMemo } from 'react';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { getScrollAnimation } from '@/helper';
import { motion } from 'framer-motion';
import {
  CycleIcon,
  EditTableIcon,
  SunIcon,
  WateringIcon,
} from '@/components/Icon';
import { plantSuggestModel } from '@/interfaces';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AButton } from '@/common/ui-common';

interface PlantSugesstionProps {
  plantList: plantSuggestModel[];
}

export const PlantSugesstion = ({ plantList }: PlantSugesstionProps) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const navigate = useNavigate();
  return (
    <ScrollAnimationWrapper>
      <motion.div className='px-7.5 w-full rounded-sm border border-stroke bg-white py-6 shadow-default'>
        <div className='px-7 font-semibold'>Plant Suggesstion</div>
        <table className='min-w-full'>
          <thead className='bg-white font-bold text-type-2'>
            <tr>
              <th
                scope='col'
                className='border-r border-type-1 px-4 py-4 text-sm'
              ></th>
              <th
                scope='col'
                className='border-r border-type-1 px-4 py-3.5 text-left text-sm rtl:text-right'
              >
                <button className='flex items-center gap-x-1 focus:outline-none'>
                  <CycleIcon /> Cycle
                </button>
              </th>

              <th
                scope='col'
                className='border-r border-type-1 px-4 py-3.5 text-left text-sm rtl:text-right'
              >
                <button className='flex items-center gap-x-1 focus:outline-none'>
                  <WateringIcon /> Watering
                </button>
              </th>

              <th
                scope='col'
                className='border-r border-type-1 px-4 py-3.5 text-left text-sm rtl:text-right'
              >
                <button className='flex items-center gap-x-1 focus:outline-none'>
                  <SunIcon /> Sunlight
                </button>
              </th>
              <th scope='col' className='relative px-4 py-3.5'>
                <span className='sr-only'>Detail</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {plantList &&
              plantList.map((plant: plantSuggestModel) => (
                <tr key={plant.id}>
                  <td className='whitespace-nowrap border-r border-type-1 px-4 py-4 text-sm'>
                    <NavLink
                      to={`/app/land/field/suggestion/plantDetail/${plant.id}`}
                      className='flex items-center gap-2'
                    >
                      <motion.img
                        variants={scrollAnimation}
                        src={plant?.default_image?.original_url}
                        className='h-20 w-20 rounded-full'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      />
                      <span className='flex flex-col gap-1'>
                        <h1 className='font-semibold text-[#5D3D2E]'>
                          {plant.common_name}
                        </h1>
                        <p className='text-sm text-body'>
                          {plant.scientific_name}
                        </p>
                      </span>
                    </NavLink>
                  </td>
                  <td className='border-r border-type-1 px-4 py-4 text-sm text-body'>
                    {plant.cycle}
                  </td>
                  <td className='border-r border-type-1 px-4 py-4 text-sm text-body'>
                    {plant.watering}
                  </td>
                  <td className='border-r border-type-1 px-4 py-4 text-sm text-body'>
                    {plant.sunlight[0]}
                  </td>
                  <td className='px-4 py-4 text-sm text-body'>
                    <AButton
                      type='link'
                      variant='link'
                      color='default'
                      onClick={() =>
                        navigate(
                          `/app/land/field/suggestion/plantDetail/${plant.id}`,
                        )
                      }
                    >
                      <EditTableIcon /> Detail
                    </AButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </motion.div>
    </ScrollAnimationWrapper>
  );
};
