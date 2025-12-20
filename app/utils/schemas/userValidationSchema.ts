import { z } from 'zod';

const emptyStringToNull = z.literal('').transform(() => null);

export const userProfileSchema = z.object({
  firstName: z
    .union([z.string().trim().min(1), emptyStringToNull])
    .nullable()
    .optional(),
  lastName: z
    .union([z.string().trim().min(1), emptyStringToNull])
    .nullable()
    .optional(),
  departmentId: z.string().nullable(),
  positionId: z.string().nullable(),
});
export type UserProfileForm = z.infer<typeof userProfileSchema>;

export const updateUserSchema = z.object({
  email: z.string().email(),
  firstName: z
    .union([z.string().trim().min(1), emptyStringToNull])
    .nullable()
    .optional(),
  lastName: z
    .union([z.string().trim().min(1), emptyStringToNull])
    .nullable()
    .optional(),
  departmentId: z.string().nullable(),
  positionId: z.string().nullable(),
  role: z.string(),
});
export type UpdateUserForm = z.infer<typeof updateUserSchema>;
