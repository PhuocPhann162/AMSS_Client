import { useGetCommodityByIdQuery } from '@/api';
import {
  ACardV2,
  ADivider,
  AQRCode,
  ARawImage,
  ATooltip,
} from '@/common/ui-common';
import { ButtonAddToCart } from '@/features/cart/components/button-add-to-cart';
import { QuantitySelector } from '@/features/cart/components/quantity-selector';
import { TagCommodityCategory } from '@/features/commodity/components/tag-commodity-category';
import { TagCommodityStatus } from '@/features/commodity/components/tag-commodity-status';
import { type Commodity } from '@/interfaces';
import { formatUsd } from '@/utils/number/format-usd';
import Collapse from 'antd/es/collapse';
import { format } from 'date-fns';
import React, { Fragment, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';

export const CommodityDetailPage = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const getCommodityById = useGetCommodityByIdQuery({ id: id ?? '' });

  const data = getCommodityById.currentData?.result;

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

  if (!data) {
    return undefined;
  }

  const qrValue = `/logistics?supplierId=${data.supplierId}&commodityId=${id}&cropId=${data.cropId}`;

  return (
    <section>
      <ARawImage src={data.image} className='sticky top-0 h-screen' />
      <div className='-mt-[100vh] flex min-h-screen flex-col-reverse items-center justify-between gap-6 px-6 pb-6 pt-[55vh] md:flex-row md:items-start'>
        <CustomCard>
          <ATooltip title='Click to open in new tab'>
            <Link to={qrValue} target='_blank' rel='noopener noreferrer'>
              <AQRCode
                value={qrValue}
                rootClassName='cursor-pointer p-[initial] border-0 [overflow:initial]'
              />
            </Link>
          </ATooltip>
        </CustomCard>
        <div className='flex w-96 max-w-full flex-col gap-4'>
          <CustomCard>
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
            <div className='grid grid-cols-3 items-center'>
              <p className='col-span-1 font-medium'>QTY:</p>
              <QuantitySelector
                defaultValue={quantity}
                onChange={setQuantity}
                rootClassName='col-span-2'
              />
            </div>
            <ButtonAddToCart id={data.id} quantity={quantity} />
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
                        {data.expirationDate
                          ? format(new Date(data.expirationDate), 'dd/MM/yyyy')
                          : 'N/A'}
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
    </section>
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
