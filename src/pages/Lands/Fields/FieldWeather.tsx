import { useEffect, useMemo, useState } from 'react';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { DailyWeather } from '@/components/Page/DashBoard';
import { getAirPollution, getForecast, getScrollAnimation } from '@/helper';
import { motion } from 'framer-motion';
import { NavLink, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '@/api/app/fieldApi';
import { airPollutionType, forecastType, optionType } from '@/interfaces';
import { MainLoader } from '@/components/Page/common';
import { AirPollutionCard, Forecast } from '@/components/Page/Weather';
import { MyDoughnut } from '@/components/UI';

export const FieldWeather = () => {
  const [activeLink, setActiveLink] = useState('currently');
  const [forecast, setForecast] = useState<forecastType>();
  const [airPollution, setAirPollution] = useState<airPollutionType>();
  const { id } = useParams();
  const { data, isLoading } = useGetFieldByIdQuery(id);
  useEffect(() => {
    async function fetchData() {
      if (data) {
        const res = await getForecast({
          lat: data?.result.location?.lat,
          lon: data?.result.location?.lng,
        } as optionType);
        setForecast(res);
        const resAirPollution = await getAirPollution(
          data?.result.location?.lat,
          data?.result.location?.lng,
        );
        setAirPollution(resAirPollution);
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
            className='2xl:gap-7.5 grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6'
          >
            <div className='px-7.5 col-span-4 w-full rounded-sm border border-stroke bg-white py-6 shadow-default'>
              <div className='flex items-center gap-4'>
                <NavLink
                  to='#'
                  className={
                    'animation-hover relative mx-2 inline-block cursor-pointer px-4 py-2' +
                    (activeLink === 'currently'
                      ? ' animation-active text-primary'
                      : ' a text-black hover:text-primary')
                  }
                  onClick={() => setActiveLink('currently')}
                >
                  Hourly
                </NavLink>
                <NavLink
                  to='#'
                  className={
                    'animation-hover relative mx-2 inline-block cursor-pointer px-4 py-2' +
                    (activeLink === 'daily'
                      ? ' animation-active text-primary'
                      : ' a text-black hover:text-primary')
                  }
                  onClick={() => setActiveLink('daily')}
                >
                  Daily
                </NavLink>
              </div>
              <div className='divider divider-accent mx-2 w-full' />
              <div className='flex flex-wrap'>
                {activeLink === 'currently' && forecast && (
                  <Forecast data={forecast} />
                )}
                {activeLink === 'daily' && forecast && (
                  <DailyWeather forecast={forecast} />
                )}
              </div>
            </div>
            <div className='px-7.5 col-span-2 w-full rounded-sm border border-stroke bg-white py-6 shadow-default'>
              <h3 className='mb-7 mt-3 font-bold text-black'>Air Quality</h3>
              {airPollution && (
                <div className='flex flex-col gap-8'>
                  <MyDoughnut airPollution={airPollution} />{' '}
                  <AirPollutionCard airPollution={airPollution} />
                </div>
              )}
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      )}
    </>
  );
};
