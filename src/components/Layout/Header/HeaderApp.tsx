import { Logo } from '@/common';
import { DropdownUser } from '.';
import { useSidebar } from '@/components/ui/Sidebar';

const HeaderApp = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className='md:sticky md:top-0 z-999 flex h-12 md:h-16 bg-white/60 backdrop-blur-sm items-center justify-between px-6'>
      <div className='flex items-center gap-2'>
        {/* TODO: add button to toggle sidebar */}
        <p onClick={toggleSidebar}>X</p>
        <Logo />
      </div>
      <DropdownUser />
    </header>
  );
};

export default HeaderApp;
