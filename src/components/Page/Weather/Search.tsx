import { ChangeEvent } from 'react';

import Header from './Header';
import Suggestions from './Suggestions';
import { optionType } from '@/interfaces';

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props) => (
  <section className='backdrop-blur-ls flex h-full w-full flex-col items-center justify-center rounded bg-white bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg md:max-w-[500px] md:px-10 lg:h-[500px] lg:p-24'>
    <Header />

    <div className='relative mt-10 flex md:mt-4'>
      <input
        type='text'
        value={term}
        className='rounded-l-md border-2 border-white px-2 py-1'
        onChange={onInputChange}
      />

      <Suggestions options={options} onSelect={onOptionSelect} />

      <button
        className='cursor-pointer rounded-r-md border-2 border-zinc-100 px-2 py-1 text-zinc-100 hover:border-zinc-500 hover:text-zinc-500'
        onClick={onSubmit}
      >
        Search
      </button>
    </div>
  </section>
);

export default Search;
