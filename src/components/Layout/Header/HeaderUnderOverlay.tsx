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
    const [isScrolled, setIsScrolled] = useState(false);

    console.log('HeaderUnderOverlay');
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
      <header ref={headerRef} className={cn('relative', className)}>
        <div
          style={
            {
              '--navbar-height': `${headerHeight}px`,
            } as CSSProperties
          }
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[calc(var(--navbar-height)*1.75)] bg-gradient-to-b from-white/85 opacity-0 backdrop-blur transition-[height,opacity] duration-300 [clip-path:inset(var(--navbar-height)_0_0_0)] [mask:linear-gradient(white,white,transparent)]',
            isScrolled && 'opacity-100',
            overlayClassName,
          )}
        />
        {/* <div
          style={
            {
              '--navbar-height': `${headerHeight}px`,
            } as CSSProperties
          }
          className='pointer-events-none absolute inset-x-0 top-0 h-[calc(var(--navbar-height)*1.75)] bg-gradient-to-b from-white/85 backdrop-blur duration-200 [clip-path:inset(var(--navbar-height)_0_0_0)] [mask:linear-gradient(white,white,transparent)]'
        ></div> */}
        {children}
      </header>
    );
  },
);
HeaderUnderOverlay.displayName = 'HeaderUnderOverlay';
