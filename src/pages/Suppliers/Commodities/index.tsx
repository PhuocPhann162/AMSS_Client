import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';
import { PageCommon } from '@/components/layout/page/page-common';

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
      <SuppliersByRole supplierRole={Role.SUPPLIER_COMMODITY} />
    </PageCommon>
  );
}
