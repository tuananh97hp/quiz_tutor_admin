import { z } from 'zod';

export const ZCurrentPasswordSchema = z.string().max(72);

export const ZPasswordSchema = z
  .string()
  .min(8, { message: 'Must be at least 8 characters in length' })
  .max(72, { message: 'Cannot be more than 72 characters in length' });
