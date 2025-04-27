import { HeaderPage } from '@/components/Layout/Header';
import { AppSidebar } from '@/components/Layout/SideBar';
import { SidebarProvider } from '@/components/ui/Sidebar';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks';
import { dashboardRoutes } from '@/routes';

export const HomeLayout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      {!!isMobile && (
        <AppSidebar
          content={{
            items: dashboardRoutes.map((route) => ({
              path: route.path,
              label: route.label,
              icon: route.icon,
            })),
          }}
        />
      )}
      <div className='relative flex flex-col'>
        <HeaderPage />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
