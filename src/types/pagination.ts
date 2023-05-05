export interface PaginationType {
  keyword?: string;
  page?: string;
}

export interface PaginationHeaderResponse {
  currentPage: number;
  totalPages: number;
}
