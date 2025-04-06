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
  rootClassName?: string;
  overlayClassName?: string;
  children?: ReactNode;
}

export const HeaderUnderOverlay = memo<HeaderUnderOverlayProps>(
  ({ className, rootClassName, overlayClassName, children }) => {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
      if (!navbarRef.current) return;

      const navbarElement = navbarRef.current;

      const updateNavbarHeight = () => {
        setNavbarHeight(navbarElement.offsetHeight);
      };

      updateNavbarHeight();

      const resizeNavHeightObs = new ResizeObserver(updateNavbarHeight);
      resizeNavHeightObs.observe(navbarElement);

      window.addEventListener('resize', updateNavbarHeight);

      return () => {
        window.removeEventListener('resize', updateNavbarHeight);
        resizeNavHeightObs.disconnect();
      };
    }, []);

    return (
      <header className={cn('relative', rootClassName)}>
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 h-[calc(var(--navbar-height)*3/2)] bg-gradient-to-b from-white/85 backdrop-blur [clip-path:inset(var(--navbar-height)_0_0_0)] [mask:linear-gradient(white,white,transparent)]',
            overlayClassName,
          )}
          style={
            {
              '--navbar-height': `${navbarHeight}px`,
            } as CSSProperties
          }
        />
        {/* <div className='pointer-events-none absolute inset-x-0 h-[calc(var(--navbar-height)*3/2)] bg-gradient-to-b from-white/85 backdrop-blur duration-200 [mask:linear-gradient(white,white,transparent)]'></div> */}
        <div ref={navbarRef} className={className}>
          {children}
        </div>
      </header>
    );
  },
);
HeaderUnderOverlay.displayName = 'HeaderUnderOverlay';
