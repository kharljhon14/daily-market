import Table from '@/components/admin/table/Table';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
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

  const testData = [
    {
      name: 'Hello',
    },
    {
      name: 'Hello1',
    },
    {
      name: 'Hello2',
    },
    {
      name: 'Hello3',
    },
  ];

  return (
    <AdminLayout>
      <Modal />
      <Table
        columns={columns}
        data={testData}
        actions={
          <div className="">
            <Button>Add Brand</Button>
          </div>
        }
      />
    </AdminLayout>
  );
}
