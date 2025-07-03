import { Card } from 'antd';
import { ACard } from '@/common/ui-common';

const { Meta } = Card;

// Array of images related to agricultural tools and plants
const images = [
  'https://example.com/tools1.jpg',
  'https://example.com/tools2.jpg',
  'https://example.com/plant1.jpg',
  'https://example.com/plant2.jpg',
  // Add more images here
];

// Generate 30 cards by looping over the images array
const cards = Array.from({ length: 30 }, (_, index) => ({
  img: images[index % images.length],
  title: `Product ${index + 1}`,
  description: 'High-quality agricultural product',
}));

export const OnlineStore = () => {
  return (
    <div>
      {/* Banner Section */}
      <div
        style={{
          background: `url('/farmOnlineStore.jpg') center/cover no-repeat`,
          padding: '50px',
          color: '#fff',
          textAlign: 'center',
          height: '500px',
        }}
        className='flex items-center justify-center'
      >
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            Agriculture E-commerce Store
          </h1>
          <p style={{ fontSize: '1.2rem' }}>
            Discover the best tools and plants for your farm!
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {cards.map((card, index) => (
          <ACard
            key={index}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={card.title} src={'/avocado.jpg'} />}
          >
            <Meta title={card.title} description={card.description} />
          </ACard>
        ))}
      </div>
    </div>
  );
};
