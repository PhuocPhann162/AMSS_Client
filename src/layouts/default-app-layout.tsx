import { HeaderApp } from '@/components/layout/header';
import { AppSidebar } from '@/components/layout/sidebar';
import { sidebarOptions } from '@/components/layout/sidebar/sidebar-helper';
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/Sidebar';
import { withAdminAuth } from '@/HOC';
import { useCookie } from '@/hooks/useCookie';
import { Outlet } from 'react-router-dom';

function DefaultAppLayout() {
  const { value } = useCookie<boolean>(SIDEBAR_COOKIE_NAME);

  return (
    <SidebarProvider
      defaultOpen={value}
      className='flex h-screen flex-col bg-white [&_*]:[scrollbar-width:thin]'
    >
      <HeaderApp />
      <div className='flex min-h-0 grow'>
        <AppSidebar
          content={{ items: sidebarOptions }}
          className='md:pt-[--admin-header-height]'
        />
        <main className='min-w-0 grow p-2 pt-0'>
          <div className='h-full overflow-hidden rounded-xl border border-neutral-200 bg-gray-50'>
            <div className='h-full overflow-y-auto'>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

const EnhancedDefaultAppLayout = withAdminAuth(DefaultAppLayout);
export default EnhancedDefaultAppLayout;
