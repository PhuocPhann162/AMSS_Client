import { evaluatePollutantLevelDescription } from '~/helper';
import { airPollutionType } from '~/interfaces';

interface AirPollutionCardProps {
  airPollution: airPollutionType;
}

const AirPollutionCard = ({ airPollution }: AirPollutionCardProps) => {
  return (
    <section className='flex flex-col text-black'>
      <div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>CO:</span> {airPollution.list[0].components.co}
          </div>
          <p className='text-primary'>{evaluatePollutantLevelDescription('co', airPollution.list[0].components.co)}</p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>NH3:</span> {airPollution.list[0].components.nh3}
          </div>
          <p className='text-primary'>
            {evaluatePollutantLevelDescription('nh3', airPollution.list[0].components.nh3)}
          </p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>NO:</span> {airPollution.list[0].components.no}
          </div>
          <p className='text-primary'>{evaluatePollutantLevelDescription('no', airPollution.list[0].components.no)}</p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>NO2:</span> {airPollution.list[0].components.no2}
          </div>
          <p className='text-primary'>
            {evaluatePollutantLevelDescription('no2', airPollution.list[0].components.no2)}
          </p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>O3:</span> {airPollution.list[0].components.o3}
          </div>
          <p className='text-primary'>{evaluatePollutantLevelDescription('o3', airPollution.list[0].components.o3)}</p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>PM2_5:</span> {airPollution.list[0].components.pm2_5}
          </div>
          <p className='text-primary'>
            {evaluatePollutantLevelDescription('pm2_5', airPollution.list[0].components.pm2_5)}
          </p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>PM10:</span> {airPollution.list[0].components.pm10}
          </div>
          <p className='text-primary'>
            {evaluatePollutantLevelDescription('pm10', airPollution.list[0].components.pm10)}
          </p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div>
            <span className='font-semibold'>SO2:</span> {airPollution.list[0].components.so2}
          </div>
          <p className='text-primary'>
            {evaluatePollutantLevelDescription('so2', airPollution.list[0].components.so2)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AirPollutionCard;
