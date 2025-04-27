import { DropdownUser, HeaderUnderOverlay } from '@/components/Layout/Header';
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
        <p className='text-lg font-bold'>Novaris</p>
      </div>
      <DropdownUser />
    </HeaderUnderOverlay>
  );
};
