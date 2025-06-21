import { AppUserDropdown } from '@/components/layout/header/app-user-dropdown';
import { NovarisLogo } from '@/components/UI';
import { HeaderSearch } from './header-search';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const HeaderApp = () => {
  return (
    <div className='sticky inset-x-0 top-0 z-50 flex h-[--admin-header-height] shrink-0 items-center justify-between px-4'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        <p className='flex items-center font-rubik text-lg'>
          <NovarisLogo /> Novaris
        </p>
      </div>
      <HeaderSearch />
      <AppUserDropdown />
    </div>
  );
};
