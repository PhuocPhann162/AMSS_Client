import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';

export function CommoditySuppliers() {
  return (
    <div>
      <SuppliersByRole supplierRole={Role.SUPPLIER_COMMODITY} />
    </div>
  );
}
