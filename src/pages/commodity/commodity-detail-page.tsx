import { useGetCommodityByIdQuery } from '@/api';
import { AButton, AImage } from '@/common/ui-common';
import { useAddCartItem } from '@/hooks/cart/useAddCartItem';
import {
  CommodityCategory,
  CommodityStatus,
  type Commodity,
} from '@/interfaces';
import { useParams } from 'react-router-dom';

export const CommodityDetailPage = () => {
  const { id } = useParams();

  const getCommodityById = useGetCommodityByIdQuery({ id: id ?? '' });

  const { addCartItem } = useAddCartItem();

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
    <div>
      <h3>{data.name}</h3>
      <div className='grid grid-cols-7 gap-4'>
        <AImage src={data.image} rootClassName='col-span-4' />
        <div className='col-span-3'>
          <p>{data.description}</p>
          <p>{data.specialTag}</p>
          <p>{data.category}</p>
          <p>{data.price}</p>
          <p>{data.expirationDate}</p>
          <p>{data.status}</p>
          <p>{data.supplierId}</p>
          <p>{data.cropId}</p>
          <p>{data.createdAt}</p>
          <p>{data.updatedAt}</p>
        </div>
      </div>
      <AButton
        onClick={() =>
          addCartItem({
            id: id ?? '',
            quantity: 1,
            commodity: data,
            shoppingCartId: '',
          })
        }
      >
        Add to cart
      </AButton>
    </div>
  );
};
