import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, type RefObject } from 'react';

export interface UseScrollProps<T extends HTMLElement = HTMLElement> {
  container?: RefObject<T>;
  target?: RefObject<T>;
}

export interface UseScrollPositionReturn {
  scrollX: number;
  scrollY: number;
}

export const useScrollPosition = ({
  container,
  target,
}: UseScrollProps = {}): UseScrollPositionReturn => {
  const { scrollY, scrollX } = useScroll({ container, target });

  const [scrollXValue, setScrollXValue] = useState(scrollX.get());
  const [scrollYValue, setScrollYValue] = useState(scrollY.get());

  useMotionValueEvent(scrollX, 'change', (value) => {
    setScrollXValue(value);
  });

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrollYValue(value);
  });

  return {
    scrollX: scrollXValue,
    scrollY: scrollYValue,
  };
};
