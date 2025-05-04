import { useMotionValueEvent, useScroll } from 'framer-motion';
import { throttle } from 'lodash';
import { useCallback, useMemo, useState, type RefObject } from 'react';

export interface UseScrollProps<T extends HTMLElement = HTMLElement> {
  element?: RefObject<T>;
  delay?: number;
}

export const useScrollPosition = ({
  element,
  delay = 300,
}: UseScrollProps = {}) => {
  const { scrollY, scrollX } = useScroll({ container: element });

  const [scrollYValue, setScrollYValue] = useState(scrollY.get());
  const [scrollXValue, setScrollXValue] = useState(scrollX.get());

  // TODO: Optimize this
  const throttledSetY = useCallback(
    throttle((value: number) => {
      setScrollYValue(value);
    }, delay),
    [delay],
  );

  // TODO: Optimize this
  const throttledSetX = useCallback(
    throttle((value: number) => {
      setScrollXValue(value);
    }, delay),
    [delay],
  );

  useMotionValueEvent(scrollY, 'change', throttledSetY);

  useMotionValueEvent(scrollX, 'change', throttledSetX);

  return useMemo(
    () => ({
      scrollY: scrollYValue,
      scrollX: scrollXValue,
    }),
    [scrollYValue, scrollXValue],
  );
};
