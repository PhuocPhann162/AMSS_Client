import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';

export function SeedCropSuppliers() {
  return (
    <div>
      <SuppliersByRole supplierRole={Role.SUPPLIER_CROP} />
    </div>
  );
}
