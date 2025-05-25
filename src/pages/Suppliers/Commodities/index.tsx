import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';
import { Breadcrumb } from '@/components/UI';

export function CommoditySuppliers() {
  return (
    <div>
      <Breadcrumb pageParent='Suppliers' pageName='Commodity' />
      <SuppliersByRole supplierRole={Role.SUPPLIER_COMMODITY} />
    </div>
  );
}
