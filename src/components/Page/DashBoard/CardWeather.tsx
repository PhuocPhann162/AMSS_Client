import React, { ReactNode } from 'react';
import { forecastType } from '~/interfaces';
import { convertToEmoji, flagemojiToPNG } from '~/utils/convertEmoji';
import { Degree } from '../Weather';
import Sunrise from '../Weather/Icons/Sunrise';
import Sunset from '../Weather/Icons/Sunset';
import { getSunTime } from '~/helper';

interface CardWeatherProps {
  forecast: forecastType;
}

const CardWeather: React.FC<CardWeatherProps> = ({ forecast }) => {
  return (
    <section className='flex flex-col text-black'>
      <div>
        <h2 className='flex items-center gap-2'>
          Weather of {forecast.name},{' '}
          <span className='font-thin'> {flagemojiToPNG(convertToEmoji(forecast.country))}</span>
        </h2>
        <h1 className='text-4xl font-semibold flex items-center'>
          <Degree temp={Math.round(forecast.list[0].main.temp)} />C
          <img
            alt={`weather-icon-${forecast.list[0].weather[0].description}`}
            src={`http://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`}
          />
        </h1>
        <div className='flex items-center justify-between pb-1'>
          <p className='text-base font-semibold'>
            {forecast.list[0].weather[0].main} ({forecast.list[0].weather[0].description})
          </p>
          <p className='text-sm'>
            Feels like: <Degree temp={Math.round(forecast.list[0].main.feels_like)} />C{' '}
          </p>
        </div>

        <div className='flex items-center justify-between pb-1'>
          <p className='text-sm'>
            H: <Degree temp={Math.ceil(forecast.list[0].main.temp_max)} /> L:{' '}
            <Degree temp={Math.floor(forecast.list[0].main.temp_min)} />
          </p>
          <p className='text-sm'>Wind: {forecast.list[0].wind.speed} m/s</p>
        </div>

        <div className='flex items-center justify-between pb-1'>
          <p className='text-sm'>Humidity: {forecast.list[0].main.humidity}%</p>
          <p className='text-sm'>
            1-Hr Precip: {forecast.list[0].rain?.['1h'] ?? forecast.list[0].rain?.['3h'] ?? 0} mm
          </p>
        </div>

        <div className='text-sm flex items-center justify-between pb-1'>
          <p className='flex items-center gap-1'>
            <Sunrise /> <span className='mt-2'>{getSunTime(forecast.sunrise)}</span>
          </p>
          <p className='flex items-center gap-1'>
            <Sunset /> <span className='mt-2'>{getSunTime(forecast.sunset)}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardWeather;
