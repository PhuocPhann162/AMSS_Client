import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/Layout/SideBar';
import { withAdminAuth } from '@/HOC';
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/Sidebar';
import { useCookie } from '@/hooks/useCookie';
import { HeaderApp } from '@/components/Layout/Header';
import { sidebarOptions } from '@/components/Layout/SideBar/sidebar_helper';

function DefaultAppLayout() {
  const { value } = useCookie<boolean>(SIDEBAR_COOKIE_NAME);

  return (
    <SidebarProvider defaultOpen={value}>
      <div className='flex min-h-screen flex-col'>
        <HeaderApp />
        <div className='flex flex-grow bg-neutral-50'>
          <AppSidebar content={{ items: sidebarOptions }} />
          <main className='min-w-0 grow p-4'>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const EnhancedDefaultAppLayout = withAdminAuth(DefaultAppLayout);
export default EnhancedDefaultAppLayout;
