import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, useRef, type RefObject } from 'react';

export const DIRECTION_X = {
  left: 'left',
  right: 'right',
  none: 'none',
} as const;

export type DirectionX = (typeof DIRECTION_X)[keyof typeof DIRECTION_X];

export const DIRECTION_Y = {
  up: 'up',
  down: 'down',
  none: 'none',
} as const;

export type DirectionY = (typeof DIRECTION_Y)[keyof typeof DIRECTION_Y];

export interface UseScrollDirectionProps<T extends HTMLElement = HTMLElement> {
  element?: RefObject<T>;
  threshold?: number;
  initialValue?: {
    directionX?: DirectionX;
    directionY?: DirectionY;
  };
  enabled?: boolean;
}

export interface UseScrollDirectionReturn {
  directionX: DirectionX;
  directionY: DirectionY;
}

export const useScrollDirection = ({
  element,
  threshold = 0,
  initialValue,
  enabled = true,
}: UseScrollDirectionProps = {}): UseScrollDirectionReturn => {
  const [directionX, setDirectionX] = useState<DirectionX>(
    initialValue?.directionX ?? DIRECTION_X.none,
  );
  const [directionY, setDirectionY] = useState<DirectionY>(
    initialValue?.directionY ?? DIRECTION_Y.none,
  );

  const { scrollX, scrollY } = useScroll({ container: element });

  const prevScrollX = useRef(scrollX.get());
  const prevScrollY = useRef(scrollY.get());

  useMotionValueEvent(scrollX, 'change', (value) => {
    if (!enabled) return;

    const deltaX = value - prevScrollX.current;

    if (Math.abs(deltaX) > threshold) {
      const newDirection = deltaX > 0 ? DIRECTION_X.right : DIRECTION_X.left;

      setDirectionX(newDirection);
      prevScrollX.current = value;
    }
  });

  useMotionValueEvent(scrollY, 'change', (value) => {
    if (!enabled) return;

    const deltaY = value - prevScrollY.current;

    if (Math.abs(deltaY) > threshold) {
      const newDirection = deltaY > 0 ? DIRECTION_Y.down : DIRECTION_Y.up;

      setDirectionY(newDirection);
      prevScrollY.current = value;
    }
  });

  return {
    directionX,
    directionY,
  };
};
