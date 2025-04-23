import { DropdownUser, HeaderUnderOverlay } from '@/components/Layout/Header';
import { SidebarTrigger } from '@/components/ui/Sidebar';

export const HeaderApp = () => {
  return (
    <HeaderUnderOverlay
      classNames={{
        root: 'sticky inset-x-0 top-0 z-50',
        header:
          'flex h-12 items-center justify-between bg-white/70 px-6 [backdrop-filter:saturate(180%)_blur(20px)] md:h-16',
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
