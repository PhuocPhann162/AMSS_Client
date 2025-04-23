import { ACarousel, AImage } from '@/common/ui-common';
import Horizontal from '@/pages/store/Horizontal';
import { FC } from 'react';

export const StorePage: FC = () => {
  const items = [
    {
      id: 1,
      name: 'Product 1',
      price: 100000,
      description: 'Product 1 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200000,
      description: 'Product 2 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300000,
      description: 'Product 3 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 400000,
      description: 'Product 4 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 500000,
      description: 'Product 5 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 6,
      name: 'Product 6',
      price: 600000,
      description: 'Product 6 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 7,
      name: 'Product 7',
      price: 700000,
      description: 'Product 7 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 8,
      name: 'Product 8',
      price: 800000,
      description: 'Product 8 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 9,
      name: 'Product 9',
      price: 900000,
      description: 'Product 9 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 10,
      name: 'Product 10',
      price: 1000000,
      description: 'Product 10 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
    {
      id: 11,
      name: 'Product 11',
      price: 1100000,
      description: 'Product 11 description',
      image:
        'https://sdmntprwestus.oaiusercontent.com/files/00000000-87f4-5230-aba3-056f9c03f80f/raw?se=2025-04-02T14%3A42%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=bd8dd3fb-0210-56be-9311-dfb81da8888d&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-02T06%3A48%3A27Z&ske=2025-04-03T06%3A48%3A27Z&sks=b&skv=2024-08-04&sig=B3CDMUSoSoJtOiCngCxTL/zCHwgL5X5sIpsSs/KihcY%3D',
    },
  ];
  return (
    <div className='flex flex-col gap-12 p-6'>
      <div className='flex flex-col gap-16 p-6'>
        <div className='grid grid-cols-3'>
          <p className='col-span-2 text-5xl font-bold'>
            Store.{' '}
            <span className='text-gray-600'>
              The best way to buy the products you love.
            </span>
          </p>
        </div>
        <ACarousel autoplay={{ dotDuration: true }} autoplaySpeed={4000}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className='!flex justify-center'>
              <AImage
                src='https://mzfoodtest.com/wp-content/uploads/2022/04/1-3.jpg'
                width={600}
              />
            </div>
          ))}
        </ACarousel>
      </div>
      <Horizontal
        items={items}
        title='New Products'
        renderItem={(item) => (
          <div
            key={item.id}
            className='flex min-w-36 flex-col gap-4 md:rounded'
          >
            <AImage src={item.image} />
            <p className='text-center text-lg font-bold'>{item.name}</p>
          </div>
        )}
      />
      <div className='flex flex-col p-6'>
        <div className='grid grid-cols-3'>
          <p className='col-span-2 text-5xl font-bold'>
            The latest generation.{' '}
            <span className='text-gray-600'> See what&apos;s new.</span>
          </p>
        </div>
        <Horizontal
          items={items}
          title='New Products'
          renderItem={(item) => (
            <div
              key={item.id}
              className='flex min-w-96 flex-col gap-4 rounded-xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl'
            >
              <div className='flex flex-col gap-2'>
                <p className='text-3xl font-bold'>{item.name}</p>
                <p className='line-clamp-2 text-lg font-semibold'>
                  {item.description}
                </p>
              </div>
              <AImage src={item.image} />
            </div>
          )}
        />
      </div>
    </div>
  );
};
