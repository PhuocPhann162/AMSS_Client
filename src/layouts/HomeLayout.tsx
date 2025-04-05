import { HeaderPage } from '@/components/Layout/Header';
import { SidebarProvider } from '@/components/ui/Sidebar';
import { Outlet } from 'react-router-dom';

export const HomeLayout = () => {
  return (
    <SidebarProvider>
      <div className='relative flex flex-col'>
        <HeaderPage />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
