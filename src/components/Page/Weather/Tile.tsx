import Feels from './Icons/Feels';
import Humidity from './Icons/Humidity';
import Pop from './Icons/Pop';
import Pressure from './Icons/Pressure';
import Visibility from './Icons/Visibility';
import Wind from './Icons/Wind';

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop';
  title: string;
  info: string | JSX.Element;
  description?: string | JSX.Element;
};

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
};

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className='backdrop-blur-ls mb-5 flex h-[130px] w-[140px] flex-col justify-between rounded border bg-white/20 p-2 text-zinc-700 drop-shadow-lg'>
      <div className='flex items-center text-sm font-bold'>
        <Icon /> <h4 className='ml-1'>{title}</h4>
      </div>
      <h3 className='mt-2 text-lg'>{info}</h3>

      <div className='text-xs font-bold'>{description}</div>
    </article>
  );
};
export default Tile;
