import { TableColumn } from '@/types/table';

interface Props<T> {
  columns: TableColumn<T>[];
  data: T[];
}

export default function Table({ columns, data }: Props<any>) {
  return (
    <table className="border-collapse w-full shadow-md border">
      <thead>
        <tr className="text-left text-dark_blue uppercase border-b-2">
          {columns.map((col) => (
            <th
              className="p-5"
              key={col.label}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr className={`${idx % 2 !== 0 ? 'bg-light_grey' : ''}`}>
            {columns.map((col) => {
              if (col.accessor === 'actions' || col.render)
                return <td className="p-3">{col.render && col.render(row)}</td>;

              return <td className="p-3">{row[col.accessor]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
