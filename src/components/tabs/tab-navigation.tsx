import { motion } from 'framer-motion';
import { useState, type Key, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Tab<T extends Key = Key> {
  id: T;
  label: ReactNode;
  onClick?: () => void;
}

export interface TabNavigationProps<T extends Key = Key> {
  tabs?: Tab<T>[];
  defaultActiveTab?: Tab<T>['id'];
  activeTab?: Tab<T>['id'];
  rootClassName?: string;
  classNames?: Partial<Record<'tab', string>>;
}

export const TabNavigation = <T extends Key = Key>({
  tabs,
  activeTab,
  defaultActiveTab,
  rootClassName,
  classNames,
}: TabNavigationProps<T>) => {
  const [internalActiveTab, setInternalActiveTab] = useState<
    Tab['id'] | undefined
  >(defaultActiveTab);
  const currentActiveTab = activeTab ?? internalActiveTab;

  if (!tabs?.length) return null;

  return (
    <div
      className={twMerge(
        'relative flex w-max rounded-full bg-black/25 p-1 backdrop-blur-lg',
        rootClassName,
      )}
    >
      {tabs?.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setInternalActiveTab(tab.id);
            tab.onClick?.();
          }}
          className={twMerge(
            'relative rounded-full px-4 py-2 text-sm font-bold text-white transition-colors duration-300 ease-out',
            classNames?.tab,
            currentActiveTab === tab.id ? 'z-10 text-black' : '',
          )}
        >
          {currentActiveTab === tab.id && (
            <motion.div
              layoutId='activeTab'
              className='absolute inset-0 rounded-full bg-white'
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 30,
              }}
            />
          )}
          <p className='relative z-10'>{tab.label}</p>
        </button>
      ))}
    </div>
  );
};
