import {
  useElementOffsetSize,
  useScrollDirection,
  useScrollPosition,
} from '@/hooks';
import { cn } from '@/lib/utils';
import { type CSSProperties, memo, type ReactNode } from 'react';

export interface HeaderUnderOverlayProps {
  children?: ReactNode;
  enableHiding?: boolean;
  heightRatio?: number;
  classNames?: Partial<Record<'header' | 'overlay' | 'root', string>>;
}

export const HeaderUnderOverlay = memo<HeaderUnderOverlayProps>(
  ({ children, enableHiding = false, heightRatio = 3 / 4, classNames }) => {
    const { height, ref } = useElementOffsetSize<HTMLDivElement>();
    const { direction } = useScrollDirection();
    const { scrollY } = useScrollPosition();

    const isHidden = enableHiding && direction === 'down';
    const shouldOpacity =
      scrollY > 0 && (enableHiding ? direction !== 'down' : true);

    return (
      <header
        className={cn(
          'relative transition-transform duration-700 ease-out',
          isHidden && '-translate-y-full',
          classNames?.root,
        )}
      >
        <div
          style={
            {
              '--header-height': `${height}px`,
              '--overlay-height': `${height / heightRatio}px`,
              '--height-ratio': `${heightRatio * 98}%`,
            } as CSSProperties
          }
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[var(--overlay-height)] bg-gradient-to-b from-white/85 via-white/35 via-[length:var(--height-ratio)] opacity-0 transition-[height,opacity] duration-700 ease-out [backdrop-filter:saturate(180%)_blur(8px)] [mask:linear-gradient(white,white_var(--height-ratio),transparent)]',
            shouldOpacity && 'opacity-100',
            classNames?.overlay,
          )}
        />
        <div ref={ref} className={cn('relative', classNames?.header)}>
          {children}
        </div>
      </header>
    );
  },
);
HeaderUnderOverlay.displayName = 'HeaderUnderOverlay';
