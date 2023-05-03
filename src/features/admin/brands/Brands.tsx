import Table from '@/components/admin/table/Table';
import Button from '@/components/button/Button';
import { useBrandContext } from '@/context/BrandContext';
import BrandForm from '@/features/admin/brands/BrandForm';
import useModal from '@/hooks/useModal';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { TableColumn } from '@/types/table';
import agent from '@/utils/agent';
import { useEffect } from 'react';

export default function Brands() {
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

  const { brands, set } = useBrandContext();

  useEffect(() => {
    const getBrands = async () => {
      const { data } = await agent.brand.getAll();

      set(data);
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
        rowId="_id"
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
