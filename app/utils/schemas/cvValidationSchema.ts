import { z } from 'zod';
import { REQUIRED_INPUT_NAME } from './constants';

export const cvSchema = z.object({
  name: z.string({ required_error: REQUIRED_INPUT_NAME }).min(1, REQUIRED_INPUT_NAME),
  education: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
});

export type CvForm = z.infer<typeof cvSchema>;
