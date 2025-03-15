import { Outlet } from 'react-router-dom';
import { HeaderApp } from '@/components/Layout/Header';
import { AppSidebar } from '@/components/Layout/SideBar';
import { withAdminAuth } from '@/HOC';
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/Sidebar';
import { useCookie } from '@/hooks/useCookie';

function DefaultAppLayout() {
  const { value } = useCookie<boolean>(SIDEBAR_COOKIE_NAME);
  return (
    <SidebarProvider defaultOpen={value}>
      <div className='dark:bg-boxdark-2 dark:text-bodydark flex flex-col grow'>
        <HeaderApp />
        <div className='flex'>
          <AppSidebar />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const EnhancedDefaultAppLayout = withAdminAuth(DefaultAppLayout);
export default DefaultAppLayout;
