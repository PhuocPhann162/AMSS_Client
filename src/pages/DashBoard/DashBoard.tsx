import { useMemo, useState } from 'react';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { CardWeather, DailyWeather, FieldStatusList, SearchWeather } from '@/components/Page/DashBoard';
import { getScrollAnimation } from '@/helper';
import { useForecast } from '@/hooks';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export const DashBoard = () => {
  const [activeLink, setActiveLink] = useState('hourly');
  const { forecast, options, term, onOptionSelect, onSubmit, onInputChange } = useForecast();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <>
      <ScrollAnimationWrapper>
        <motion.div
          variants={scrollAnimation}
          className='grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5'
        >
          <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default w-full col-span-2'>
            {forecast && <CardWeather forecast={forecast} />}
            <SearchWeather
              term={term}
              options={options}
              onInputChange={onInputChange}
              onOptionSelect={onOptionSelect}
              onSubmit={onSubmit}
            />
          </div>
          <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default w-full col-span-4'>
            <div className='flex items-center gap-4'>
              <NavLink
                to='#'
                className={
                  'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative' +
                  (activeLink === 'hourly' ? ' text-primary animation-active ' : ' text-black hover:text-primary a')
                }
                onClick={() => setActiveLink('hourly')}
              >
                Hourly
              </NavLink>
              <NavLink
                to='#'
                className={
                  'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative' +
                  (activeLink === 'daily' ? ' text-primary animation-active ' : ' text-black hover:text-primary a')
                }
                onClick={() => setActiveLink('daily')}
              >
                Daily
              </NavLink>
            </div>
            <div className='divider w-full mx-2 divider-accent' />
            <div className='flex flex-wrap'>
              {activeLink === 'hourly' && forecast && <DailyWeather forecast={forecast} />}
            </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <motion.div variants={scrollAnimation}>
          <FieldStatusList />
        </motion.div>
      </ScrollAnimationWrapper>
    </>
  );
};
