import { forecastType } from '~/interfaces';
import { Degree } from '../Weather';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getScrollAnimation } from '~/helper';

interface DailyWeatherProps {
  forecast: forecastType;
}

export const DailyWeather = ({ forecast }: DailyWeatherProps) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const renderedItems = useMemo(() => {
    return forecast.list.map((item, index) => {
      const currentDate = new Date(item.dt * 1000).toLocaleDateString();
      const prevDate = index > 0 ? new Date(forecast.list[index - 1].dt * 1000).toLocaleDateString() : null;
      const showDate = currentDate !== prevDate;
      const hours = new Date(item.dt * 1000).getHours();
      const isPM = hours >= 12;
      const formattedHours = isPM ? `${hours % 12} PM` : `${hours} AM`;
      const windSpeed = item.wind.speed.toFixed(0);
      const rainAmount = item.rain?.['1h'] ?? item.rain?.['3h'] ?? 0;

      return (
        <div
          key={item.dt.toString()}
          className='flex flex-col flex-grow flex-shrink-0 items-center justify-center mt-4'
        >
          <p className='font-bold'>{showDate ? currentDate : '-'}</p>
          <p className='w-20 text-sm text-center'>{formattedHours}</p>
          <div className='flex flex-col items-center'>
            <motion.img
              variants={scrollAnimation}
              className='w-15'
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              loading='lazy'
            />
            <div className='font-semibold'>
              <Degree temp={Math.round(item.main.temp)} />C
            </div>
          </div>
          <p className='text-xs flex items-center gap-1'>
            {windSpeed} m/s{' '}
            <svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-3' viewBox='0 0 24 24'>
              {/* SVG dành cho wind */}
            </svg>
          </p>
          <p className='text-xs flex items-center gap-1'>
            {rainAmount} mm{' '}
            <svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-3' viewBox='0 0 24 24'>
              {/* SVG dành cho rain */}
            </svg>
          </p>
        </div>
      );
    });
  }, [forecast.list]);

  return <div className='flex items-center gap-10 w-full overflow-auto pb-5'>{renderedItems}</div>;
};
