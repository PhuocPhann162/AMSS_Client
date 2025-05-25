import { Footer } from '@/components/layout/footer/footer';
import { HeaderPage } from '@/components/layout/header';
import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/Sidebar';
import { useIsMobile } from '@/hooks';
import { dashboardRoutes } from '@/routes';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider className='flex flex-col'>
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
      <HeaderPage />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </SidebarProvider>
  );
};
