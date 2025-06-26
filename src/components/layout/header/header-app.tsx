import { AppUserDropdown } from '@/components/layout/header/app-user-dropdown';
import { NovarisLogo } from '@/components/UI';
import { HeaderSearch } from './header-search';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

export const HeaderApp = () => {
  return (
    <div className='sticky inset-x-0 top-0 z-50 flex h-[--admin-header-height] shrink-0 items-center justify-between px-4'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        <Link
          className='flex items-center text-lg font-bold hover:underline'
          to={'/'}
        >
          <NovarisLogo /> Novaris
        </Link>
      </div>
      <HeaderSearch />
      <AppUserDropdown />
    </div>
  );
};
