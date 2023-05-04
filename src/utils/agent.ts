import { BrandSchemaType } from '@/schemas/admin/brand';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/';

const responseBody = (res: AxiosResponse) => res.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const brand = {
  getAll: () => requests.get('admin/brands?keyword=goo'),
  create: (body: BrandSchemaType) => requests.post('admin/brands', body),
  update: (id: string, body: BrandSchemaType) =>
    requests.put(`admin/brands/${id}`, body),
  delete: (id: string) => requests.delete(`admin/brands/${id}`),
};

const agent = {
  brand,
};

export default agent;
