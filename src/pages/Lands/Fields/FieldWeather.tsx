import { useEffect, useMemo, useState } from 'react';
import { ScrollAnimationWrapper } from '~/components/Animation';
import { CardWeather, DailyWeather } from '~/components/Page/DashBoard';
import { getForecast, getScrollAnimation } from '~/helper';
import { motion } from 'framer-motion';
import { NavLink, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '~/api/fieldApi';
import { forecastType, optionType } from '~/interfaces';
import { MainLoader } from '~/components/Page/common';

export const FieldWeather = () => {
  const [activeLink, setActiveLink] = useState('hourly');
  const { id } = useParams();
  const [forecast, setForecast] = useState<forecastType>();
  const { data, isLoading } = useGetFieldByIdQuery(id);
  useEffect(() => {
    async function fetchData() {
      if (data) {
        const res = await getForecast({
          lat: data?.result.location?.lat,
          lon: data?.result.location?.lng
        } as optionType);
        setForecast(res);
      }
    }
    fetchData();
  }, [data]);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <ScrollAnimationWrapper>
          <motion.div
            variants={scrollAnimation}
            className='grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5'
          >
            <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default w-full col-span-2'>
              <h3 className='mb-7 mt-3'>WEATHER FORECAST</h3>
              {forecast && <CardWeather forecast={forecast} />}
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
      )}
    </>
  );
};
