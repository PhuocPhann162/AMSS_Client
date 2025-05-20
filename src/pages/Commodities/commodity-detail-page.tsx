import { useGetCommodityByIdQuery } from '@/api';
import { AImage } from '@/common/ui-common';
import { ButtonAddToCart } from '@/features/cart/components/button-add-to-cart';
import {
  CommodityCategory,
  CommodityStatus,
  type Commodity,
} from '@/interfaces';
import { useParams } from 'react-router-dom';

export const CommodityDetailPage = () => {
  const { id } = useParams();

  const getCommodityById = useGetCommodityByIdQuery({ id: id ?? '' });

  const data: Commodity =
    getCommodityById.isSuccess && getCommodityById.currentData?.result
      ? getCommodityById.currentData?.result
      : {
          id: 'c001',
          name: 'Organic Rice',
          description:
            'Premium quality organic rice harvested from sustainable farms',
          specialTag: 'organic',
          category: CommodityCategory.Grain,
          price: 25.99,
          image:
            'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409_FMT_WHH?wid=1280&hei=492&fmt=webp&qlt=70&.v=aWs5czA5aDFXU0FlMGFGRlpYRXk2UWFRQXQ2R0JQTk5udUZxTkR3ZVlpTDBZWFRnV2wyTWZmOFczZysrOWJqeHVqay8zY0s4VHBsVmhRS2dCdnNPUGdtMENMdTZ6TWdSdXpYdHhkNkZjdVplNnlubXUzVTRJNEhLeHRadGtMWmNZWVlGTFd2cmdyUGlFSmo4RXNqbUV3&traceId=1',
          expirationDate: '2024-12-31',
          status: CommodityStatus.Active,
          supplierId: 's12345',
          cropId: 'cr789',
          createdAt: '2023-01-15T08:30:00Z',
          updatedAt: '2023-01-15T08:30:00Z',
        };

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-4xl font-bold'>{data.name}</h3>
      <div className='grid grid-cols-7 gap-4'>
        <AImage
          src={data.image}
          rootClassName='col-span-4 rounded-2xl overflow-hidden'
        />
        <div className='col-span-3'>
          <p className='text-lg font-bold'>{data.description}</p>
          <p className='text-xl font-bold text-gray-700'>{data.price}</p>
        </div>
      </div>
      <ButtonAddToCart id={data.id}>Add To Cart</ButtonAddToCart>
    </div>
  );
};
