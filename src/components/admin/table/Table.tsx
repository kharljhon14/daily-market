import Button from '@/components/button/Button';
import InputField from '@/components/input/Input';
import { SearchSchema, SearchSchemaType } from '@/schemas/admin/search';
import { PaginationHeaderResponse, PaginationType } from '@/types/pagination';
import { TableColumn } from '@/types/table';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PaginationComponent from '@/components/common/Pagination';

interface Props<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: ReactNode | ReactNode[];
  rowId?: string;
  onSearch?: (pagination: PaginationType) => Promise<void>;
  paginationResponse?: PaginationHeaderResponse;
  onChange: (pagination: PaginationType) => void;
}

export default function Table({
  columns,
  data,
  actions,
  rowId = '',
  onSearch,
  onChange,
  paginationResponse,
}: Props<any>) {
  const { register, handleSubmit, getValues } = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
  });

  const onSubmit: SubmitHandler<SearchSchemaType> = async ({ keyword }) => {
    try {
      if (onSearch) await onSearch({ keyword });
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err?.response?.data.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-between space-x-2"
          >
            <div className="flex-1">
              <InputField
                name="keyword"
                placeholder="Search"
                register={register}
              />
            </div>

            <Button type="submit">Search</Button>
          </form>
        </div>
        {actions}
      </div>
      <table className="border-collapse w-full shadow-md">
        <thead className="">
          <tr className="text-left text-dark_blue uppercase border-b-2">
            {columns.map((col) => (
              <th
                className="p-3 bg-dark_blue text-white"
                key={col.label}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={row[rowId]}
                className={`${idx % 2 !== 0 ? 'bg-light_grey' : ''}`}
              >
                {columns.map((col) => {
                  if (col.accessor === 'actions' || col.render)
                    return (
                      <td
                        key={row[rowId] + row[col.accessor]}
                        className="p-3"
                      >
                        {col.render && col.render(row)}
                      </td>
                    );

                  return (
                    <td
                      key={row[rowId] + row[col.accessor]}
                      className="p-3"
                    >
                      {row[col.accessor]}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-3 h-60 text-center"
              >
                <h1 className="text-2xl uppercase text-dark_blue">
                  Table is empty
                </h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <PaginationComponent
        onChange={onChange}
        keyword={getValues('keyword')}
        pagination={paginationResponse}
      />
    </div>
  );
}
