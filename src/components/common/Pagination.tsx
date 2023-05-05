import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { PaginationType, PaginationHeaderResponse } from '@/types/pagination';

import Button from '../button/Button';

interface Props {
  pagination?: PaginationHeaderResponse;
  keyword?: string;
  onChange: (pagination: PaginationType) => void;
}

export default function Pagination({ pagination, keyword, onChange }: Props) {
  const totalPages = Array.from(
    { length: pagination ? pagination.totalPages : 1 },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center mt-6">
      <div className="flex items-center justify-center text-dark_blue">
        <MdOutlineChevronLeft size={45} />
      </div>

      <div className="space-x-2">
        {totalPages.map((page) => (
          <Button
            disabled={pagination && page === pagination.currentPage}
            key={page}
            onClick={() => onChange({ keyword, page: page.toString() })}
          >
            {page}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-center text-dark_blue">
        <MdOutlineChevronRight size={45} />
      </div>
    </div>
  );
}
