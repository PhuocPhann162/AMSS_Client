import { ChangeEvent } from 'react';

import { optionType } from '~/interfaces';
import { Suggestions } from '../Weather';
import { motion } from 'framer-motion';

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const SearchWeather = ({ term, options, onInputChange, onOptionSelect, onSubmit }: Props) => (
  <section>
    <div className='relative flex mt-10 md:mt-6'>
      <input
        type='text'
        value={term}
        className='px-2 py-1 rounded-l-md border-2 border-zinc-100'
        onChange={onInputChange}
      />

      <Suggestions options={options} onSelect={onOptionSelect} />

      <motion.div
        className='box rounded-r-md border-2 border-zinc-100 bg-primary text-white px-2 py-1 cursor-pointer'
        onClick={onSubmit}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        Search City
      </motion.div>
    </div>
  </section>
);

export default SearchWeather;
