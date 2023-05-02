import Table from '@/components/admin/table/Table';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import BrandForm from '@/features/admin/brands/BrandForm';
import useModal from '@/hooks/useModal';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { TableColumn } from '@/types/table';

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

  return (
    <AdminLayout>
      <Modal
        title="Add Brand"
        open={open}
        close={handleClose}
      >
        <BrandForm close={handleClose} />
      </Modal>
      <Table
        columns={columns}
        data={[]}
        actions={
          <div>
            <Button onClick={handleOpen}>Add Brand</Button>
          </div>
        }
      />
    </AdminLayout>
  );
}
