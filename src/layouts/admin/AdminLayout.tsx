import AdminSideNav from '@/components/admin/navbar/SideNav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex">
      <AdminSideNav />
      <div className="flex-1 p-16">{children}</div>
    </div>
  );
}
