import { useMemo, useState } from 'react';
import { ScrollAnimationWrapper } from '~/components/Animation';
import { CardWeather, SearchWeather } from '~/components/Page/DashBoard';
import { getScrollAnimation } from '~/helper';
import { useForecast } from '~/hooks';
import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Degree } from '~/components/Page/Weather';

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
            {activeLink === 'hourly' && forecast && (
              <div className='flex items-center gap-10 w-full overflow-auto pb-5'>
                {forecast.list.map((item, index) => {
                  const currentDate = new Date(item.dt * 1000).toLocaleDateString();
                  const prevDate = index > 0 ? new Date(forecast.list[index - 1].dt * 1000).toLocaleDateString() : null;
                  console.log(item);

                  // Kiểm tra nếu ngày của mục hiện tại khác với ngày của mục trước đó
                  const showDate = currentDate !== prevDate;

                  return (
                    <>
                      <div key={item.dt.toString()} className='flex flex-col items-center justify-center mt-4'>
                        {showDate && <p className='font-bold'>{currentDate}</p>}
                        <p className='w-20 text-sm text-center'>
                          {new Date(item.dt * 1000).getHours() >= 12
                            ? `${new Date(item.dt * 1000).getHours() % 12} PM`
                            : `${new Date(item.dt * 1000).getHours()} AM`}
                        </p>
                        <div className='flex flex-col items-center'>
                          <img
                            className='w-15'
                            alt={`weather-icon-${item.weather[0].description}`}
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          />
                          <div className='font-semibold'>
                            <Degree temp={Math.round(item.main.temp)} />C
                          </div>
                        </div>
                        <p className='text-xs flex items-center gap-1'>
                          {item.wind.speed.toFixed(0)} m/s{' '}
                          <svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-3' viewBox='0 0 24 24'>
                            <title>wind_line</title>
                            <g id='wind_line' fill='none' fillRule='evenodd'>
                              <path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z' />
                              <path
                                fill='#64748B'
                                d='M10.5 4a1.5 1.5 0 0 0-1.47 1.199A1 1 0 1 1 7.07 4.8 3.5 3.5 0 1 1 10.5 9H5a1 1 0 0 1 0-2h5.5a1.5 1.5 0 0 0 0-3Zm8 4a1.5 1.5 0 0 0-1.47 1.199 1 1 0 1 1-1.96-.398A3.5 3.5 0 1 1 18.5 13H3a1 1 0 1 1 0-2h15.5a1.5 1.5 0 0 0 0-3Zm-5.47 10.801A1.5 1.5 0 1 0 14.5 17H8a1 1 0 1 1 0-2h6.5a3.5 3.5 0 1 1-3.43 4.199 1 1 0 1 1 1.96-.398Z'
                              />
                            </g>
                          </svg>
                        </p>
                        <p className='text-xs flex items-center gap-1'>
                          {item.rain?.['1h'] ?? item.rain?.['3h'] ?? 0} mm{' '}
                          <svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-3' viewBox='0 0 24 24'>
                            <title>drop_fill</title>
                            <g id='drop_fill' fill='none' fillRule='evenodd'>
                              <path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z' />
                              <path
                                fill='#64748B'
                                d='M11.249 2.321a1.18 1.18 0 0 1 1.502 0A28.635 28.635 0 0 1 16.682 6.3C18.322 8.339 20 11.106 20 14a8 8 0 0 1-16 0c0-2.894 1.678-5.661 3.318-7.701a28.636 28.636 0 0 1 3.93-3.978Z'
                              />
                            </g>
                          </svg>
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </>
  );
};
