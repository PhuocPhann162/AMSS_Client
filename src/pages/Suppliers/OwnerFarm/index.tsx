import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';
import { Breadcrumb } from '@/components/UI';

export function OwnerFarmSuppliers() {
  return (
    <div>
      <Breadcrumb pageParent='Suppliers' pageName='Owner Farm' />
      <SuppliersByRole supplierRole={Role.OWNER_FARM} />
    </div>
  );
}
