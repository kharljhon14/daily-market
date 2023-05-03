import { BrandProvider } from '@/context/BrandContext';
import Brands from '@/features/admin/brands/Brands';

export default function AdminPage() {
  return (
    <BrandProvider>
      <Brands />
    </BrandProvider>
  );
}
