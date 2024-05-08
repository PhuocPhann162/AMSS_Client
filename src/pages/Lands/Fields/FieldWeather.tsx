import { useEffect, useMemo, useState } from 'react';
import { ScrollAnimationWrapper } from '~/components/Animation';
import { DailyWeather } from '~/components/Page/DashBoard';
import { getAirPollution, getForecast, getScrollAnimation } from '~/helper';
import { motion } from 'framer-motion';
import { NavLink, useParams } from 'react-router-dom';
import { useGetFieldByIdQuery } from '~/api/fieldApi';
import { airPollutionType, forecastType, optionType } from '~/interfaces';
import { MainLoader } from '~/components/Page/common';
import { AirPollutionCard, Forecast } from '~/components/Page/Weather';

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
          lon: data?.result.location?.lng
        } as optionType);
        setForecast(res);
        const resAirPollution = await getAirPollution(data?.result.location?.lat, data?.result.location?.lng);
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
            className='grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5'
          >
            <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default w-full col-span-4'>
              <div className='flex items-center gap-4'>
                <NavLink
                  to='#'
                  className={
                    'px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative' +
                    (activeLink === 'currently'
                      ? ' text-primary animation-active '
                      : ' text-black hover:text-primary a')
                  }
                  onClick={() => setActiveLink('currently')}
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
                {activeLink === 'currently' && forecast && <Forecast data={forecast} />}
                {activeLink === 'daily' && forecast && <DailyWeather forecast={forecast} />}
              </div>
            </div>
            <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default w-full col-span-2'>
              <h3 className='mb-7 mt-3'>Air Quality</h3>
              {airPollution && <AirPollutionCard airPollution={airPollution} />}
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      )}
    </>
  );
};
