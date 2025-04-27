import { cn } from '@/lib/utils';
import {
  type CSSProperties,
  memo,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface HeaderUnderOverlayProps {
  children?: ReactNode;
  classNames?: Partial<Record<'header' | 'overlay' | 'root', string>>;
}

export const HeaderUnderOverlay = memo<HeaderUnderOverlayProps>(
  ({ children, classNames }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const heightRatio = 2 / 3;

    useEffect(() => {
      if (!headerRef.current) return;

      const headerElement = headerRef.current;

      const updateHeaderHeight = () => {
        setHeaderHeight(headerElement.offsetHeight);
      };

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      updateHeaderHeight();
      handleScroll();

      const resizeHeaderHeightObs = new ResizeObserver(updateHeaderHeight);
      resizeHeaderHeightObs.observe(headerElement);

      window.addEventListener('resize', updateHeaderHeight);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', updateHeaderHeight);
        window.removeEventListener('scroll', handleScroll);
        resizeHeaderHeightObs.disconnect();
      };
    }, []);

    return (
      <header className={cn('relative', classNames?.root)}>
        <div
          style={
            {
              '--header-height': `${headerHeight}px`,
              '--overlay-height': `${headerHeight / heightRatio}px`,
              '--height-ratio': `${heightRatio}`,
            } as CSSProperties
          }
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[var(--overlay-height)] bg-gradient-to-b from-white/85 via-white/25 via-[length:calc(var(--height-ratio)*100%)] opacity-0 transition-[height,opacity] duration-500 [backdrop-filter:saturate(180%)_blur(12px)] [mask:linear-gradient(white,white_calc(var(--height-ratio)*100%),transparent)]',
            isScrolled && 'opacity-100',
            classNames?.overlay,
          )}
        />
        <div ref={headerRef} className={cn('relative', classNames?.header)}>
          {children}
        </div>
      </header>
    );
  },
);
HeaderUnderOverlay.displayName = 'HeaderUnderOverlay';
