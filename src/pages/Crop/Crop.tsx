import { Breadcrumb, TableTwo } from '~/components';

export const Crop = () => {
  return (
    <div>
      <Breadcrumb pageName='Tables' />

      <div className='flex flex-col gap-10'>
        <TableTwo />
      </div>
    </div>
  );
};
