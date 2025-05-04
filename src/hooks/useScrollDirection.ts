import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, useRef, RefObject } from 'react';

export const SCROLL_DIRECTION = {
  up: 'up',
  down: 'down',
  none: 'none',
} as const;

export type ScrollDirection =
  (typeof SCROLL_DIRECTION)[keyof typeof SCROLL_DIRECTION];

interface UseScrollDirectionOptions<T extends HTMLElement = HTMLElement> {
  element?: RefObject<T>;
  threshold?: number;
  initialDirection?: ScrollDirection;
  enabled?: boolean;
}

export const useScrollDirection = ({
  element,
  threshold = 10,
  initialDirection = SCROLL_DIRECTION.none,
  enabled = true,
}: UseScrollDirectionOptions = {}) => {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>(initialDirection);

  const { scrollY } = useScroll({ container: element });

  const lastScrollY = useRef(scrollY.get());

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!enabled) return;

    const lastScrollYValue = lastScrollY.current;

    if (Math.abs(latest - lastScrollYValue) < threshold) return;

    const newDirection =
      latest > lastScrollYValue ? SCROLL_DIRECTION.down : SCROLL_DIRECTION.up;

    setScrollDirection(newDirection);
    lastScrollY.current = latest;
  });

  return { direction: scrollDirection };
};
