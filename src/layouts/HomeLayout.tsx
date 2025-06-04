import { Footer } from '@/components/layout/footer/Footer';
import { HeaderPage } from '@/components/layout/header';
import { DropdownUser } from '@/components/layout/header/dropdown-user';
import { AppSidebar } from '@/components/layout/sidebar';
import { ButtonSignIn } from '@/components/ui/button-sign-in';
import { SidebarProvider } from '@/components/ui/Sidebar';
import { HomeAntConfigProvider } from '@/contexts/home-ant-config/home-ant-config-provider';
import { LenisProvider } from '@/contexts/lenis/lenis-provider';
import { useIsMobile } from '@/hooks';
import { dashboardRoutes } from '@/routes';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  const isMobile = useIsMobile();
  const authState = useAppSelector((state) => state.auth);

  return (
    <LenisProvider>
      <HomeAntConfigProvider>
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
              footer={
                authState.accessToken ? (
                  <DropdownUser showName />
                ) : (
                  <ButtonSignIn
                    buttonProps={{ type: 'primary', block: true }}
                  />
                )
              }
            />
          )}
          <HeaderPage />
          <main className='grow'>
            <Outlet />
          </main>
          <Footer />
        </SidebarProvider>
      </HomeAntConfigProvider>
    </LenisProvider>
  );
};
