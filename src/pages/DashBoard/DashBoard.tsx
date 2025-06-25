import { useMemo, useState } from 'react';
import {
  CardWeather,
  DailyWeather,
  FieldStatusList,
  SearchWeather,
} from '@/components/Page/DashBoard';
import { getScrollAnimation } from '@/helper';
import { useForecast } from '@/hooks';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { PageCommon } from '@/components/layout/page/page-common';

export const DashBoard = () => {
  const [activeLink, setActiveLink] = useState('hourly');
  const { forecast, options, term, onOptionSelect, onSubmit, onInputChange } =
    useForecast();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <PageCommon headerTitle='Dashboard'>
      <motion.div variants={scrollAnimation} className='flex flex-col gap-3'>
        <div className='shadow-default flex w-full flex-col gap-2 rounded-sm border border-gray-300 bg-white p-6'>
          <SearchWeather
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
          {forecast && <CardWeather forecast={forecast} />}
        </div>
        <div className='shadow-default flex w-full flex-col gap-4 rounded-sm border border-gray-300 bg-white p-6'>
          <div className='flex gap-4'>
            {['hourly', 'daily'].map((link) => (
              <NavLink
                key={link}
                to='#'
                className={
                  'animation-hover relative mx-2 inline-block cursor-pointer px-4 py-2' +
                  (activeLink === link
                    ? ' animation-active text-primary'
                    : ' a text-black hover:text-primary')
                }
                onClick={() => setActiveLink(link)}
              >
                {link[0].toUpperCase() + link.slice(1)}
              </NavLink>
            ))}
          </div>
          <div className='overflow-x-auto'>
            {activeLink === 'hourly' && forecast && (
              <DailyWeather forecast={forecast} />
            )}
          </div>
        </div>
        <FieldStatusList />
      </motion.div>
    </PageCommon>
  );
};
