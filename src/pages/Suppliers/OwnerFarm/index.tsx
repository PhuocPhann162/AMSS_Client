import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';
import { PageCommon } from '@/components/layout/page/page-common';

export function OwnerFarmSuppliers() {
  return (
    <PageCommon
      headerTitle='Owner Farms'
      renderHeader={(HeaderComp, title) => (
        <HeaderComp className='flex items-center justify-between'>
          {title}
        </HeaderComp>
      )}
    >
      <SuppliersByRole supplierRole={Role.OWNER_FARM} />
    </PageCommon>
  );
}
