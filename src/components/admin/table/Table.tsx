import InputField from '@/components/input/Input';
import { TableColumn } from '@/types/table';
import { ReactNode } from 'react';

interface Props<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: ReactNode | ReactNode[];
  rowId?: string;
}

export default function Table({
  columns,
  data,
  actions,
  rowId = '',
}: Props<any>) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="w-1/2">
          {/* <InputField
            name="search"
            placeholder="Search"
          /> */}
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
    </div>
  );
}
