import { optionType } from '@/interfaces';

type componentProps = {
  options: [];
  onSelect: (option: optionType) => void;
};

const Suggestions = ({ options, onSelect }: componentProps): JSX.Element => (
  <ul className='z-2000 absolute top-9 ml-1 rounded-b-md bg-white'>
    {options.map((option: optionType, index: number) => (
      <li key={option.name + '-' + index}>
        <button
          className='w-full cursor-pointer px-2 py-1 text-left text-sm hover:bg-zinc-700 hover:text-white'
          onClick={() => onSelect(option)}
        >
          {option.name}, {option.country}
        </button>
      </li>
    ))}
  </ul>
);

export default Suggestions;
