import Table from '@/components/admin/table/Table';
import Button from '@/components/button/Button';
import BrandForm from '@/features/admin/brands/BrandForm';
import useModal from '@/hooks/useModal';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { BrandSchemaType } from '@/schemas/admin/brand';
import { TableColumn } from '@/types/table';
import agent from '@/utils/agent';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const columns: TableColumn<any>[] = [
    {
      label: 'Brand Name',
      accessor: 'name',
    },
    {
      label: 'Actions',
      accessor: 'actions',
      render: () => (
        <div className="flex space-x-2">
          <Button>View</Button>
          <Button buttonType="secondary"> Edit</Button>
          <Button buttonType="error">Delete</Button>
        </div>
      ),
    },
  ];
  const { open, handleClose, handleOpen } = useModal();

  const [brands, setBrands] = useState<BrandSchemaType[]>([]);

  useEffect(() => {
    const getBrands = async () => {
      const { data } = await agent.brand.getAll();

      setBrands(data);
    };

    getBrands();
  }, []);

  return (
    <AdminLayout>
      <BrandForm
        close={handleClose}
        open={open}
      />
      <Table
        columns={columns}
        data={brands}
        actions={
          <div>
            <Button onClick={handleOpen}>Add Brand</Button>
          </div>
        }
      />
    </AdminLayout>
  );
}
