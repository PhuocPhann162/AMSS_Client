import { useState, useCallback } from 'react';
import { FloatButton } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { AButton } from '@/common/ui-common';
import { FaExpand, FaCompress, FaAngleDown } from 'react-icons/fa';
import { GooeyAiChat } from '@/components/UI/chat/chat-box';

export const ChatFloatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggle = useCallback(() => setIsOpen((open) => !open), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleFullscreen = useCallback(
    () => setIsFullscreen((prev) => !prev),
    [],
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleToggle();
      if (e.key === 'Escape') handleClose();
    },
    [handleToggle, handleClose],
  );

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <FloatButton.Group shape='circle' style={{ right: 0, bottom: 0 }}>
          <AButton
            type='text'
            tabIndex={0}
            aria-label='Open chat box'
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src='/novaris_logo.png'
              alt='Novaris Chat'
              width={40}
              height={40}
              className='h-14 w-14 rounded-full object-contain'
            />
          </AButton>
        </FloatButton.Group>
      </motion.div>
      <AnimatePresence mode='wait'>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
              },
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.95,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            }}
            className={`mb-4 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl ${
              isFullscreen ? 'fixed inset-4 z-50' : 'w-[370px] max-w-full'
            }`}
            style={{
              boxShadow:
                'rgba(255, 255, 255, 0.6) 0px 0px 15px, rgba(255, 255, 255, 0.5) 0px 0px 3px 1px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2'
            >
              <span className='font-semibold text-white'>Novaris</span>
              <div className='flex items-center gap-2'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label='Toggle fullscreen'
                  tabIndex={0}
                  onClick={handleFullscreen}
                  onKeyDown={(e) => e.key === 'Enter' && handleFullscreen()}
                  className='text-neutral-400 hover:text-white focus:outline-none'
                >
                  {isFullscreen ? (
                    <FaCompress className='h-4 w-4' />
                  ) : (
                    <FaExpand className='h-4 w-4' />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label='Close chat box'
                  tabIndex={0}
                  onClick={handleClose}
                  onKeyDown={(e) => e.key === 'Escape' && handleClose()}
                  className='text-neutral-400 hover:text-white focus:outline-none'
                >
                  <FaAngleDown />
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-[480px]'} bg-neutral-900`}
            >
              <GooeyAiChat isFullscreen={isFullscreen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
