import { HeaderPage } from '@/components/Layout/Header';
import { SidebarDashboard } from '@/components/Layout/SideBar';
import { SidebarProvider } from '@/components/ui/Sidebar';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks';

export const HomeLayout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      {!!isMobile && <SidebarDashboard />}
      <div className='relative flex flex-col'>
        <HeaderPage />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
