import Table from '@/components/admin/table/Table';
import Button from '@/components/button/Button';
import { useBrandContext } from '@/context/BrandContext';
import BrandForm from '@/features/admin/brands/BrandForm';
import useModal from '@/hooks/useModal';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { BrandResponseType } from '@/types/brand';
import { TableColumn } from '@/types/table';
import agent from '@/utils/agent';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Brands() {
  const { brands, set, deleteBrand } = useBrandContext();

  const handleDeleleteBrand = async (id: string) => {
    try {
      const { message } = await agent.brand
        .delete(id)
        .catch((err) => toast.error(err));

      deleteBrand(id);
      toast.info(message);
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err.message);
    }
  };

  const columns: TableColumn<any>[] = [
    {
      label: 'Brand Name',
      accessor: 'name',
    },
    {
      label: 'Actions',
      accessor: 'actions',
      render: (props: BrandResponseType) => (
        <div className="flex space-x-2">
          <Button>View</Button>
          <Button buttonType="secondary">Edit</Button>
          <Button
            onClick={() => handleDeleleteBrand(props._id)}
            buttonType="error"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const { open, handleClose, handleOpen } = useModal();

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
