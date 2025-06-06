import { useGetCommodityByIdQuery } from '@/api';
import { ADivider, AImage, AQRCode, ATooltip } from '@/common/ui-common';
import { AddToCartButton } from '@/features/cart/components/add-to-cart-button';
import { QuantityCounterInput } from '@/features/cart/components/quantity-counter-input';
import { SpecialTagTag } from '@/features/commodity/components/special-tag-tag';
import { TagCommodityStatus } from '@/features/commodity/components/tag-commodity-status';
import { type Commodity } from '@/interfaces';
import { formatUsd } from '@/utils/number/format-usd';
import { format } from 'date-fns';
import { Fragment, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const CommodityDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const getCommodityById = useGetCommodityByIdQuery({ id: id ?? '' });

  const data = getCommodityById.currentData?.result;

  const extraInfoItems: {
    label: ReactNode;
    render: (data?: Commodity) => ReactNode;
  }[] = [
    {
      label: 'Supplier',
      render: (data) => data?.supplier?.name,
    },
    {
      label: 'Crop',
      render: (data) => data?.crop?.name,
    },
    {
      label: 'Expiration Date',
      render: (data) =>
        data?.expirationDate
          ? format(new Date(data.expirationDate), 'MM/dd/yyyy')
          : 'N/A',
    },
  ];

  const renderInvalidValue = (value: ReactNode) => {
    return value ?? 'N/A';
  };

  if (!data) {
    return undefined;
  }

  const qrValue = `/logistics?supplierId=${data.supplierId}&commodityId=${id}&cropId=${data.cropId}`;

  return (
    <section>
      <AImage
        src={data.image}
        wrapperClassName='sticky top-0 h-screen w-full [&_.ant-image-mask]:!opacity-0'
      />
      <div className='-mt-[100vh] flex min-h-screen flex-col-reverse items-center justify-between gap-6 px-6 pb-6 pt-[55vh] md:flex-row md:items-start'>
        <CustomCard
          content={
            <ATooltip title='Click to open in new tab'>
              <Link to={qrValue} target='_blank' rel='noopener noreferrer'>
                <AQRCode
                  value={qrValue}
                  rootClassName='cursor-pointer p-[initial] border-0 [overflow:initial]'
                />
              </Link>
            </ATooltip>
          }
        />
        <div className='flex w-96 max-w-full flex-col gap-4'>
          <CustomCard
            content={
              <>
                <p
                  className='w-max cursor-pointer text-xs font-bold uppercase text-green-pea-500 opacity-70 transition-[opacity,color] ease-out hover:underline hover:opacity-100'
                  onClick={() => navigate(-1)}
                >
                  Back
                </p>
                <div className='flex flex-col gap-1'>
                  {!!data.specialTag && (
                    <SpecialTagTag value={data.specialTag} />
                  )}
                  <h3 className='text-3xl font-bold md:text-4xl'>
                    {data.name}
                  </h3>
                  <p className='text-sm'>{data.description}</p>
                </div>
                <TagCommodityStatus status={data.status} />
                <ADivider className='border-green [border-block-start-width:2px]' />
                {extraInfoItems.map((item, index) => (
                  <Fragment key={index}>
                    <div className='flex flex-col gap-1'>
                      <p className='text-xs'>{item.label}</p>
                      <p className='font-medium'>
                        {renderInvalidValue(item.render(data))}
                      </p>
                    </div>
                    {index !== extraInfoItems.length - 1 && (
                      <ADivider className='border-green opacity-30' />
                    )}
                  </Fragment>
                ))}
              </>
            }
            footer={
              <>
                <div className='flex items-center justify-between'>
                  <p className='font-medium'>Quantity</p>
                  <QuantityCounterInput
                    quantity={quantity}
                    min={1}
                    onQuantityChange={setQuantity}
                  />
                </div>
                <AddToCartButton id={data.id} quantity={quantity}>
                  Add To Cart - {formatUsd(data.price)}
                </AddToCartButton>
              </>
            }
            classNames={{
              content: 'flex flex-col gap-4',
              footer: 'flex flex-col gap-4',
            }}
          />
        </div>
      </div>
    </section>
  );
};

interface CustomCardProps {
  content: ReactNode;
  footer?: ReactNode;
  rootClassName?: string;
  classNames?: Partial<Record<'content' | 'footer', string>>;
}
const CustomCard = ({
  content,
  footer,
  classNames,
  rootClassName,
}: CustomCardProps) => {
  const sharedClassName = 'md:p-8 p-6';

  return (
    <article
      className={twMerge(
        'relative flex flex-col overflow-hidden rounded-2xl bg-ebb-50/80 backdrop-blur-20 backdrop-saturate-180',
        rootClassName,
      )}
    >
      <div className={twMerge(sharedClassName, classNames?.content)}>
        {content}
      </div>
      {!!footer && (
        <footer
          className={twMerge(
            sharedClassName,
            'bg-ebb-200/50',
            classNames?.footer,
          )}
        >
          {footer}
        </footer>
      )}
    </article>
  );
};
