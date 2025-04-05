import { AButton } from '@/common/ui-common';
import { useRef, useState, useEffect, ReactNode } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface HorizontalProductListProps<T> {
  items: T[];
  title?: string;
  renderItem: (item: T) => ReactNode;
}

const HorizontalProductList = <T,>({
  items,
  renderItem,
}: HorizontalProductListProps<T>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftArrow(scrollLeft > 0);

      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    };

    checkScroll();

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);

      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = scrollContainerRef.current.clientWidth / 2;
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = scrollContainerRef.current.clientWidth / 2;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='group relative max-w-full py-4'>
      <div className='relative'>
        {showLeftArrow && (
          <AButton
            className='absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-300 ease-out hover:scale-110 group-hover:scale-100 group-hover:opacity-100'
            onClick={handleScrollLeft}
            aria-label='Scroll left'
          >
            <LeftOutlined />
          </AButton>
        )}

        <div
          className='scrollbar-hide flex gap-11 overflow-x-auto scroll-smooth px-2 py-16 pb-24'
          ref={scrollContainerRef}
        >
          {items.map((item) => renderItem(item))}
        </div>

        {showRightArrow && (
          <AButton
            className='absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-300 ease-out hover:scale-110 group-hover:scale-100 group-hover:opacity-100'
            onClick={handleScrollRight}
            aria-label='Scroll right'
          >
            <RightOutlined />
          </AButton>
        )}
      </div>
    </div>
  );
};

export default HorizontalProductList;
