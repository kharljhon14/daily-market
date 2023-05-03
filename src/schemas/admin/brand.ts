import { z } from 'zod';

export const BrandSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(100, 'Must be less than 100 characters'),
    description: z.string(),
  })
  .required({ name: true });

export type BrandSchemaType = z.infer<typeof BrandSchema>;
