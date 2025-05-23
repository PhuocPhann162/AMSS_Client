import { forecastType } from '@/interfaces';
import Degree from './Degree';
import Sunrise from './Icons/Sunrise';
import Sunset from './Icons/Sunset';
import Tile from './Tile';
import {
  getWindDirection,
  getHumidityValue,
  getVisibilityValue,
  getSunTime,
  getPop,
} from '@/helper';

type Props = {
  data: forecastType;
};

const Forecast = ({ data }: Props) => {
  const today = data.list[0];

  return (
    <div className='backdrop-blur-ls h-full w-full rounded bg-white py-4 md:px-10 md:py-4 lg:h-auto lg:px-24'>
      <div className='mx-auto w-[300px]'>
        <section className='text-center'>
          <h2 className='text-2xl font-black'>
            {data.name} <span className='font-thin'>{data.country}</span>
          </h2>
          <h1 className='text-4xl font-extrabold'>
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className='text-sm'>
            {today.weather[0].main} ({today.weather[0].description})
          </p>
          <p className='text-sm'>
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className='mb-5 mt-4 flex overflow-x-scroll pb-2'>
          {data.list.map((item, i) => (
            <div
              key={i}
              className='inline-block w-[50px] flex-shrink-0 text-center'
            >
              <p className='text-sm'>
                {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className='text-sm font-bold'>
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className='flex flex-wrap justify-between text-zinc-700'>
          <div className='backdrop-blur-ls mb-5 flex w-[140px] flex-col items-center rounded border bg-white/20 py-4 text-xs font-bold drop-shadow-lg'>
            <Sunrise /> <span className='mt-2'>{getSunTime(data.sunrise)}</span>
          </div>
          <div className='backdrop-blur-ls mb-5 flex w-[140px] flex-col items-center rounded border bg-white/20 py-4 text-xs font-bold drop-shadow-lg'>
            <Sunset /> <span className='mt-2'>{getSunTime(data.sunset)}</span>
          </div>

          <Tile
            icon='wind'
            title='Wind'
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(Math.round(today.wind.deg))}, gusts 
            ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Tile
            icon='feels'
            title='Feels like'
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />
          <Tile
            icon='humidity'
            title='Humidity'
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Tile
            icon='pop'
            title='Precipitation'
            info={`${Math.round(today.pop * 100)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          <Tile
            icon='pressure'
            title='Pressure'
            info={`${today.main.pressure} hPa`}
            description={` ${Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'} than standard`}
          />
          <Tile
            icon='visibility'
            title='Visibility'
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  );
};

export default Forecast;
