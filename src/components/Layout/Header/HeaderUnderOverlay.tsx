import { cn } from '@/lib/utils';
import { memo, type ReactNode, useEffect, useRef, useState } from 'react';

export interface HeaderUnderOverlayProps {
  className?: string;
  rootClassName?: string;
  children?: ReactNode;
}

export const HeaderUnderOverlay = memo<HeaderUnderOverlayProps>(
  ({ className, rootClassName, children }) => {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    }, []);

    return (
      <header className={cn('relative', rootClassName)}>
        <div
          className='pointer-events-none absolute inset-x-0 bg-gradient-to-b from-white/85 backdrop-blur [mask:linear-gradient(white,white,transparent)]'
          style={{
            height: `${navbarHeight * 1.5}px`,
            clipPath: `inset(${navbarHeight}px 0 0 0)`,
          }}
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
