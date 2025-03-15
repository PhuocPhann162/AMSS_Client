import { Breadcrumb, TableTwo } from '@/components/UI';

export const Crop = () => {
  return (
    <div>
      <Breadcrumb pageParent='' pageName='Crops' />

      <div className='flex flex-col gap-10'>
        <TableTwo />
      </div>
    </div>
  );
};
