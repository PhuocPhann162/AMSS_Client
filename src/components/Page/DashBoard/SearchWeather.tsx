import { ChangeEvent } from 'react';

import { optionType } from '~/interfaces';
import { Suggestions } from '../Weather';

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const SearchWeather = ({ term, options, onInputChange, onOptionSelect, onSubmit }: Props) => (
  <section>
    <div className='relative flex mt-10 md:mt-4'>
      <input
        type='text'
        value={term}
        className='px-2 py-1 rounded-l-md border-2 border-zinc-100'
        onChange={onInputChange}
      />

      <Suggestions options={options} onSelect={onOptionSelect} />

      <button
        className='rounded-r-md border-2 border-zinc-100 hover:bg-green-400 bg-primary text-white px-2 py-1 cursor-pointer'
        onClick={onSubmit}
      >
        Search City
      </button>
    </div>
  </section>
);

export default SearchWeather;
