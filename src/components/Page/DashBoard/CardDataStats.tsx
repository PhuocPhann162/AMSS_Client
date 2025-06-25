import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className='px-7.5 shadow-default rounded-sm border border-gray-300 bg-white py-6 dark:border-slate-800 dark:bg-slate-900'>
      <div className='h-11.5 w-11.5 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-gray-900'>
        {children}
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-2xl font-bold text-black dark:text-white'>
            {total}
          </h4>
          <span className='text-sm font-medium'>{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && 'text-emerald-500'
          } ${levelDown && 'text-sky-600'} `}
        >
          {rate}

          {levelUp && (
            <svg
              className='fill-emerald-500'
              width='10'
              height='11'
              viewBox='0 0 10 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
                fill=''
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className='fill-sky-600'
              width='10'
              height='11'
              viewBox='0 0 10 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z'
                fill=''
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
