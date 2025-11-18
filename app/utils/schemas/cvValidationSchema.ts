import { z } from 'zod';

export const cvSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  education: z.string().trim().optional(),
  description: z.string().trim().min(1, 'Description is required'),
});

export type CvForm = z.infer<typeof cvSchema>;
