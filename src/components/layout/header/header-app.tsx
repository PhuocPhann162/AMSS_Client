import { AppUserDropdown } from '@/components/layout/header/app-user-dropdown';
import { HeaderUnderOverlay } from '@/components/layout/header/header-under-overlay';
import { NovarisLogo } from '@/components/UI';
import { SidebarTrigger } from '@/components/ui/Sidebar';

export const HeaderApp = () => {
  return (
    <HeaderUnderOverlay
      classNames={{
        root: 'sticky inset-x-0 top-0 z-50 [--header-height:3rem] md:[--header-height:4rem]',
        overlay: '[clip-path:inset(var(--header-height)_0_0_0)]',
        header:
          'flex h-[--header-height] items-center justify-between bg-white/70 px-6 [backdrop-filter:saturate(180%)_blur(12px)]',
      }}
    >
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        {/* TODO: Add logo */}
        <p className='flex items-center font-rubik text-lg'>
          <NovarisLogo /> Novaris
        </p>
      </div>
      <AppUserDropdown />
    </HeaderUnderOverlay>
  );
};
