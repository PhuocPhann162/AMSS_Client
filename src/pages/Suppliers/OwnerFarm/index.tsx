import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';

export function OwnerFarmSuppliers() {
  return (
    <div>
      <SuppliersByRole supplierRole={Role.OWNER_FARM} />
    </div>
  );
}
