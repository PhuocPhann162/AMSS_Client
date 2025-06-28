import { LenisProvider } from '@/contexts/lenis/lenis-provider';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';

export const CommodityOriginLayout = () => {
  return (
    <LenisProvider>
      <SidebarProvider>
        <div className='grow'>
          <Outlet />
        </div>
      </SidebarProvider>
    </LenisProvider>
  );
};
