import { SuppliersByRole } from '../components';
import { PageCommon } from '@/components/layout/page/page-common';
import { ROLE } from '@/interfaces/role/role';

export function CommoditySuppliers() {
  return (
    <PageCommon
      headerTitle='Commodity Suppliers'
      renderHeader={(HeaderComp, title) => (
        <HeaderComp className='flex items-center justify-between'>
          {title}
        </HeaderComp>
      )}
    >
      <SuppliersByRole supplierRole={ROLE.SUPPLIER_COMMODITY} />
    </PageCommon>
  );
}
