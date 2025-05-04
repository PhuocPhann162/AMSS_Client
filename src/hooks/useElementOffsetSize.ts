import { throttle } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseElementOffsetSizeProps {
  delay?: number;
  enabled?: boolean;
}

export const useElementOffsetSize = <T extends HTMLElement = HTMLElement>({
  delay = 300,
  enabled = true,
}: UseElementOffsetSizeProps = {}) => {
  const elementRef = useRef<T>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const throttledFnRef = useRef<ReturnType<typeof throttle>>(undefined);

  useEffect(() => {
    throttledFnRef.current?.cancel();

    throttledFnRef.current = throttle(() => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
        setHeight(elementRef.current.offsetHeight);
      }
    }, delay);

    return () => {
      throttledFnRef.current?.cancel();
    };
  }, [delay]);

  const updateSize = useCallback(() => {
    throttledFnRef.current?.();
  }, []);

  useEffect(() => {
    if (!elementRef.current || !enabled) return;

    updateSize();

    const observer = new ResizeObserver((entries) => {
      if (entries.length === 0) return;

      updateSize();
    });

    observer.observe(elementRef.current);

    window.addEventListener('resize', updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [updateSize, enabled]);

  return { ref: elementRef, width, height, updateSize };
};
