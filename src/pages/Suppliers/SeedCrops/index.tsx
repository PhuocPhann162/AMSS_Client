import { Role } from '@/interfaces';
import SuppliersByRole from '../components/suppliers-by-role';

export function SeedCropSuppliers() {
  return (
    <div>
      <SuppliersByRole supplierRole={Role.SUPPLIER_CROP} />
    </div>
  );
}
