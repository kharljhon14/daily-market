import { BrandSchemaType } from '@/schemas/admin/brand';
import { PaginationType } from '@/types/pagination';
import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import parsePagination from './pagination';

axios.defaults.baseURL = 'http://localhost:3000/api/';

const responseBody = (res: AxiosResponse) => res.data;
const responseBodyWithPagination = (res: AxiosResponse) => {
  const header = res.headers;

  if (header instanceof AxiosHeaders && header.has('x-Pagination')) {
    const pagination = header.get('x-pagination')?.toString();
    const parsedPagination = JSON.parse(pagination ?? '');

    return { data: res.data, pagination: parsedPagination };
  }
  return res.data;
};

const requests = {
  get: (url: string) => axios.get(url).then(responseBodyWithPagination),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const brand = {
  getAll: (pagination?: PaginationType) =>
    requests.get(`admin/brands?${parsePagination(pagination ?? {})}`),
  create: (body: BrandSchemaType) => requests.post('admin/brands', body),
  update: (id: string, body: BrandSchemaType) =>
    requests.put(`admin/brands/${id}`, body),
  delete: (id: string) => requests.delete(`admin/brands/${id}`),
};

const agent = {
  brand,
};

export default agent;
