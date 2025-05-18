import { HeaderPage } from '@/components/Layout/Header';
import { AppSidebar } from '@/components/Layout/SideBar';
import { SidebarProvider } from '@/components/ui/Sidebar';
import { useIsMobile } from '@/hooks';
import { dashboardRoutes } from '@/routes';
import { Outlet } from 'react-router-dom';

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
        <main className='p-6'>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
