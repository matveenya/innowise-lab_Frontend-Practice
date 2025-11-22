import { z } from 'zod';
import { REQUIRED_INPUT_NAME, REQUIRED_TEXTAREA_DESCRIPTION } from './constants';

export const cvSchema = z.object({
  name: z.string({ required_error: REQUIRED_INPUT_NAME }).min(1, REQUIRED_INPUT_NAME),
  education: z.string().optional(),
  description: z
    .string({ required_error: REQUIRED_TEXTAREA_DESCRIPTION })
    .min(1, REQUIRED_TEXTAREA_DESCRIPTION),
});

export type CvForm = z.infer<typeof cvSchema>;
