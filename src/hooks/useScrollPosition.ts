import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, type RefObject } from 'react';

export interface UseScrollProps<T extends HTMLElement = HTMLElement> {
  element?: RefObject<T>;
}

export interface UseScrollPositionReturn {
  scrollX: number;
  scrollY: number;
}

export const useScrollPosition = ({
  element,
}: UseScrollProps = {}): UseScrollPositionReturn => {
  const { scrollY, scrollX } = useScroll({ container: element });

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
