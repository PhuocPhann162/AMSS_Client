import { DropdownUser } from '.';
import { SidebarTrigger } from '@/components/ui/Sidebar';

const HeaderApp = () => {
  return (
    <header className='inset-x-0 z-[999] flex h-12 items-center justify-between bg-white/80 px-6 backdrop-blur-lg md:sticky md:top-0 md:h-16'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        {/* TODO: Add logo */}
        <p className='text-lg font-bold'>Novaris</p>
      </div>
      <DropdownUser />
    </header>
  );
};

export default HeaderApp;
