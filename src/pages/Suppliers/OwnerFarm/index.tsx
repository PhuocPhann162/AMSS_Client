import { SuppliersByRole } from '../components';
import { PageCommon } from '@/components/layout/page/page-common';
import { ROLE } from '@/interfaces/role/role';

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
      <SuppliersByRole supplierRole={ROLE.OWNER_FARM} />
    </PageCommon>
  );
}
