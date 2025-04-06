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
  className?: string;
  overlayClassName?: string;
  children?: ReactNode;
}

export const HeaderUnderOverlay = memo<HeaderUnderOverlayProps>(
  ({ className, overlayClassName, children }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
      if (!headerRef.current) return;

      const headerElement = headerRef.current;

      const updateHeaderHeight = () => {
        setHeaderHeight(headerElement.offsetHeight);
      };

      updateHeaderHeight();

      const resizeHeaderHeightObs = new ResizeObserver(updateHeaderHeight);
      resizeHeaderHeightObs.observe(headerElement);

      window.addEventListener('resize', updateHeaderHeight);

      return () => {
        window.removeEventListener('resize', updateHeaderHeight);
        resizeHeaderHeightObs.disconnect();
      };
    }, []);

    return (
      <header ref={headerRef} className={cn('relative', className)}>
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[calc(var(--navbar-height)*3/2)] bg-gradient-to-b from-white/85 backdrop-blur [clip-path:inset(var(--navbar-height)_0_0_0)] [mask:linear-gradient(white,white,transparent)]',
            overlayClassName,
          )}
          style={
            {
              '--navbar-height': `${headerHeight}px`,
            } as CSSProperties
          }
        />
        {/* <div className='pointer-events-none absolute inset-x-0 h-[calc(var(--navbar-height)*3/2)] bg-gradient-to-b from-white/85 backdrop-blur duration-200 [mask:linear-gradient(white,white,transparent)]'></div> */}
        {children}
      </header>
    );
  },
);
HeaderUnderOverlay.displayName = 'HeaderUnderOverlay';
