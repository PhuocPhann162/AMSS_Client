import { DropdownUser } from '.';
import { SidebarTrigger } from '@/components/ui/Sidebar';

const HeaderApp = () => {
  return (
    <header className='right- left-0 z-999 flex h-12 items-center justify-between bg-white/80 px-6 backdrop-blur-sm md:sticky md:top-0 md:h-16'>
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        {/* TODO: Add logo */}
        <p className='text-lg font-bold'>AMSS</p>
      </div>
      <DropdownUser />
    </header>
  );
};

export default HeaderApp;
