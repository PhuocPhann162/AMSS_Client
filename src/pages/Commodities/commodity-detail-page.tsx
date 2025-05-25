import { useGetCommodityByIdQuery } from '@/api';
import { ACardV2, ADivider, AImage, AQRCode, ATag } from '@/common/ui-common';
import { ButtonAddToCart } from '@/features/cart/components/button-add-to-cart';
import { QuantitySelector } from '@/features/cart/components/quantity-selector';
import { TagCommodityCategory } from '@/features/commodity/components/tag-commodity-category';
import { TagCommodityStatus } from '@/features/commodity/components/tag-commodity-status';
import {
  CommodityCategory,
  CommodityStatus,
  type Commodity,
} from '@/interfaces';
import { formatUsd } from '@/utils/number/format-usd';
import Collapse from 'antd/es/collapse';
import React, { Fragment, useState, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';

export const CommodityDetailPage = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

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
          category: CommodityCategory.Fruit,
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

  const infoItems: {
    label: ReactNode;
    render: (data?: Commodity) => React.ReactNode;
  }[] = [
    {
      label: 'Status',
      render: (data) =>
        typeof data?.status === 'number' ? (
          <TagCommodityStatus status={data.status} />
        ) : undefined,
    },
    {
      label: 'Category',
      render: (data) =>
        typeof data?.category === 'number' ? (
          <TagCommodityCategory category={data.category} />
        ) : undefined,
    },
  ];

  return (
    <div className='relative min-h-screen'>
      <AImage
        src={data.image}
        preview={false}
        rootClassName='top-0 sticky h-screen -mt-[100vh] block'
        className='[&.ant-image-img]:h-full'
      />
      <div className='flex min-h-screen flex-col-reverse items-center justify-between gap-6 px-4 pb-4 pt-[10%] md:flex-row md:items-start'>
        <CustomCard>
          <AQRCode value={'https://www.facebook.com/'} />
        </CustomCard>
        <div className='flex w-96 flex-col gap-4'>
          <CustomCard>
            {data.specialTag && (
              <ATag color='blue' bordered>
                {data.specialTag}
              </ATag>
            )}
            <div className='flex flex-col gap-1'>
              <h3 className='text-2xl font-medium md:text-4xl'>{data.name}</h3>
              <p className='text-xl font-bold'>{formatUsd(data.price)}</p>
            </div>
            <div className='flex flex-col gap-2'>
              {infoItems.map((item, index) => {
                const value = item.render(data);

                if (!value) return undefined;

                return (
                  <Fragment key={index}>
                    <div className='grid grid-cols-3 items-center'>
                      <p className='col-span-1 text-sm font-medium'>
                        {item.label}
                      </p>
                      {value}
                    </div>
                    {index < infoItems.length - 1 && <ADivider />}
                  </Fragment>
                );
              })}
            </div>
            <div className='flex items-center gap-1'>
              <p className='font-medium'>QTY:</p>
              <QuantitySelector
                defaultValue={quantity}
                onChange={setQuantity}
              />
            </div>
            <ButtonAddToCart id={data.id} quantity={quantity}>
              Add To Cart
            </ButtonAddToCart>
          </CustomCard>
          <CustomCard>
            <Collapse
              items={[
                {
                  key: '1',
                  label: 'Description',
                  children: (
                    <div className='flex flex-col gap-2'>
                      <p>
                        <span className='font-medium'>Expiration Date:</span>{' '}
                        {data.expirationDate}
                      </p>
                      <p>{data.description}</p>
                    </div>
                  ),
                },
              ]}
            />
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export const CustomCard = ({ children }: { children: ReactNode }) => {
  return (
    <ACardV2
      classNames={{
        body: 'flex flex-col gap-4',
      }}
    >
      {children}
    </ACardV2>
  );
};
