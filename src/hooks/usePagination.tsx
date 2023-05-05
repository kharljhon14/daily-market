import { PaginationHeaderResponse } from '@/types/pagination';
import { useState } from 'react';

export default function usePagination(pagination: PaginationHeaderResponse) {
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const nextPage = () => {
    if (currentPage < pagination.totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return { currentPage, nextPage, prevPage };
}
