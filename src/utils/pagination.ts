import { PaginationType } from '@/types/pagination';

export default function parsePagination(pagination: PaginationType) {
  const filteredData = Object.entries(pagination).reduce(
    (acc: any, [key, value]: [string, string | string[] | undefined]) => {
      if (value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  const params = new URLSearchParams(filteredData);
  return `${params}`;
}
