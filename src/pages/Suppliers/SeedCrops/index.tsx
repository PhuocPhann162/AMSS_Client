import { Role } from '@/interfaces';
import { SuppliersByRole } from '../components';
import { Breadcrumb } from '@/components/UI';

export function SeedCropSuppliers() {
  return (
    <div>
      <Breadcrumb pageParent='Suppliers' pageName='Seed Crop' />
      <SuppliersByRole supplierRole={Role.SUPPLIER_CROP} />
    </div>
  );
}
