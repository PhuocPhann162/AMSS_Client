import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';
import { PageCommon } from '@/components/layout/page/page-common';

export function SeedCropSuppliers() {
  return (
    <PageCommon
      headerTitle='Seed Crop Suppliers'
      renderHeader={(HeaderComp, title) => (
        <HeaderComp className='flex items-center justify-between'>
          {title}
        </HeaderComp>
      )}
    >
      <SuppliersByRole supplierRole={Role.SUPPLIER_CROP} />
    </PageCommon>
  );
}
