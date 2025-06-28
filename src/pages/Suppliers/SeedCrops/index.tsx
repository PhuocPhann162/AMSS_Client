import { SuppliersByRole } from '../components';
import { PageCommon } from '@/components/layout/page/page-common';
import { ROLE } from '@/interfaces/role/role';

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
      <SuppliersByRole supplierRole={ROLE.SUPPLIER_CROP} />
    </PageCommon>
  );
}
