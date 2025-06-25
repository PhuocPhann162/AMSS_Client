import { Product } from '@/interfaces/product';
import imgTemp from '../../../public/img-1.jpg';
const productData: Product[] = [
  {
    image: imgTemp,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: imgTemp,
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: imgTemp,
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: imgTemp,
    name: 'HP Probook 450',
    category: 'Electronics',
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableTwo = () => {
  return (
    <div className='shadow-default rounded-sm border border-gray-300 bg-white dark:border-slate-800 dark:bg-slate-900'>
      <div className='xl:px-7.5 px-4 py-6 md:px-6'>
        <h4 className='text-xl font-semibold text-black dark:text-white'>
          Top Products
        </h4>
      </div>

      <div className='py-4.5 2xl:px-7.5 grid grid-cols-6 border-t border-gray-300 px-4 dark:border-slate-800 sm:grid-cols-8 md:px-6'>
        <div className='col-span-3 flex items-center'>
          <p className='font-medium'>Product Name</p>
        </div>
        <div className='col-span-2 hidden items-center sm:flex'>
          <p className='font-medium'>Category</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Price</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Sold</p>
        </div>
        <div className='col-span-1 flex items-center'>
          <p className='font-medium'>Profit</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className='py-4.5 2xl:px-7.5 grid grid-cols-6 border-t border-gray-300 px-4 dark:border-slate-800 sm:grid-cols-8 md:px-6'
          key={key}
        >
          <div className='col-span-3 flex items-center'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
              <div className='h-12.5 w-15 rounded-md'>
                <img src={product.image} alt='Product' />
              </div>
              <p className='text-sm text-black dark:text-white'>
                {product.name}
              </p>
            </div>
          </div>
          <div className='col-span-2 hidden items-center sm:flex'>
            <p className='text-sm text-black dark:text-white'>
              {product.category}
            </p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='text-sm text-black dark:text-white'>
              ${product.price}
            </p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='text-sm text-black dark:text-white'>{product.sold}</p>
          </div>
          <div className='col-span-1 flex items-center'>
            <p className='text-sm text-emerald-500'>${product.profit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
