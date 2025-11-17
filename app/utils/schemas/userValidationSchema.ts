import { z } from 'zod';

export const userProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  departmentId: z.string().nullable(),
  positionId: z.string().nullable(),
});
export type UserProfileForm = z.infer<typeof userProfileSchema>;
