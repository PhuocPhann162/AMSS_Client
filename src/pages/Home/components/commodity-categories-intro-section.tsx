import FruitImage from '@/assets/images/commodity-category/fruit.png';
import GrainImage from '@/assets/images/commodity-category/grain.png';
import SeedImage from '@/assets/images/commodity-category/seed.png';
import VegetableImage from '@/assets/images/commodity-category/vegetable.png';
import { ARawImage } from '@/common/ui-common';
import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import { CommodityCategory } from '@/interfaces';
import { Link, useNavigate } from 'react-router-dom';

export const CommodityCategoriesIntroSection = () => {
  const navigate = useNavigate();

  const categoryItems: Record<
    CommodityCategory,
    {
      label: string;
      image: string;
    }
  > = {
    [CommodityCategory.Vegetable]: {
      label: 'Vegetable',
      image: VegetableImage,
    },
    [CommodityCategory.Fruit]: {
      label: 'Fruit',
      image: FruitImage,
    },
    [CommodityCategory.Grain]: {
      label: 'Grain',
      image: GrainImage,
    },
    [CommodityCategory.Seed]: {
      label: 'Seed',
      image: SeedImage,
    },
  };

  return (
    <section className='relative flex flex-col gap-16 pt-8'>
      <div className='p-x-6 flex flex-col items-center justify-center text-3xl md:text-5xl'>
        <h1 className='font-bold'>WE HAVE 4</h1>
        <div className='flex flex-col md:flex-row'>
          <div className='-rotate-3 border border-amber-50 bg-amber-950 p-1'>
            <h1 className='font-bold text-amber-50'>COMMODITY</h1>
          </div>
          <div className='-rotate-3 border border-amber-50 bg-amber-950 p-1'>
            <h1 className='font-bold text-amber-50'>CATEGORIES</h1>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='relative grid grid-rows-1 gap-8 px-6 pb-0 md:grid-cols-2 md:gap-16 md:pb-0'>
          {Object.entries(categoryItems).map(([key, item]) => (
            <Link
              key={key}
              to={`/store?category=${key}`}
              className='relative overflow-hidden rounded-2xl'
            >
              <ARawImage
                src={item.image}
                alt={item.label}
                className='h-[40vh] transition-transform duration-500 ease-out hover:[transform:scale3d(1.05,1.1,1.1)_rotate(3deg)]'
              />
              <p className='absolute bottom-3 left-3 text-3xl font-bold text-amber-50'>
                {item.label}
              </p>
            </Link>
          ))}
        </div>
        <div className='sticky bottom-0 flex items-center justify-center pb-6'>
          <AHomeButton type={'primary'} onClick={() => navigate('/store')}>
            SHOP IN STORE
          </AHomeButton>
        </div>
      </div>
    </section>
  );
};
