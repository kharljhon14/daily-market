import Table from '@/components/admin/table/Table';
import Button from '@/components/button/Button';
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
      <div className="flex justify-between mb-6">
        <Button buttonType="secondary">Add Brand</Button>
        <Button>Add Brand</Button>
      </div>
      <Table
        columns={columns}
        data={testData}
      />
    </AdminLayout>
  );
}
