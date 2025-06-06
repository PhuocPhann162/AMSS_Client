import { Footer } from '@/components/layout/footer/footer';
import { DropdownUser } from '@/components/layout/header/dropdown-user';
import { HeaderPage } from '@/components/layout/header/header-page/header-page';
import { AppSidebar } from '@/components/layout/sidebar';
import { ButtonSignIn } from '@/components/ui/button-sign-in';
import { SidebarProvider } from '@/components/ui/Sidebar';
import { HomeAntConfigProvider } from '@/contexts/home-ant-config/home-ant-config-provider';
import { LenisProvider } from '@/contexts/lenis/lenis-provider';
import { useIsMobile } from '@/hooks';
import type { RouteHandle } from '@/route';
import { dashboardRoutes } from '@/routes';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { Outlet, useMatches } from 'react-router-dom';

export const HomeLayout = () => {
  const isMobile = useIsMobile();
  const authState = useAppSelector((state) => state.auth);

  const matches = useMatches();

  const currentMatch = matches[matches.length - 1];
  const routeHandle = currentMatch?.handle as RouteHandle | undefined;

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
          <HeaderPage hasHeaderOffset={routeHandle?.hasHeaderOffset} />
          <main className='grow'>
            <Outlet />
          </main>
          <Footer />
        </SidebarProvider>
      </HomeAntConfigProvider>
    </LenisProvider>
  );
};
