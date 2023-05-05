import DeleteModal from '@/components/admin/modal/DeleteModal';
import Table from '@/components/admin/table/Table';
import Button from '@/components/button/Button';
import { useBrandContext } from '@/context/BrandContext';
import BrandForm from '@/features/admin/brands/BrandForm';
import useModal from '@/hooks/useModal';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { BrandResponseType } from '@/types/brand';
import { PaginationHeaderResponse, PaginationType } from '@/types/pagination';
import { TableColumn } from '@/types/table';
import agent from '@/utils/agent';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Brands() {
  const { brands, selectedBrand, set, setSelectedBrandToEdit, deleteBrand } =
    useBrandContext();

  const [paginationResponse, setPaginationResponse] =
    useState<PaginationHeaderResponse>({ currentPage: 1, totalPages: 1 });
  const { open, handleClose, handleOpen } = useModal();

  const handleDeleteBrand = async (id: string) => {
    try {
      const { message } = await agent.brand
        .delete(id)
        .catch((err) => toast.error(err));

      deleteBrand(id);
      toast.info(message);
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const handleUpdateBrand = (brand: BrandResponseType) => {
    setSelectedBrandToEdit(brand);
    handleOpen();
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
          <Button
            onClick={() => handleUpdateBrand(props)}
            buttonType="secondary"
          >
            Edit
          </Button>
          <DeleteModal
            deleteBy={props._id}
            name={props.name}
            deleteFunction={handleDeleteBrand}
          />
        </div>
      ),
    },
  ];
  const getBrands = async (params?: PaginationType) => {
    const { data, pagination } = await agent.brand.getAll(params);
    set(data.data);

    setPaginationResponse(pagination);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <AdminLayout>
      <BrandForm
        close={handleClose}
        open={open}
        brandToEdit={selectedBrand}
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
        onSearch={getBrands}
        onChange={getBrands}
        paginationResponse={paginationResponse}
      />
    </AdminLayout>
  );
}
