import { z } from 'zod';

export const SearchSchema = z.object({
  keyword: z.string().max(100, 'Must be less than 100 characters'),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;
