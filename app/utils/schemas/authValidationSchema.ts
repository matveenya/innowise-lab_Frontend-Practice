import { z } from 'zod';
import {
  REQUIRED_EMAIL_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  REQUIRED_PASSWORD_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
} from './constants';

export const authSchema = z.object({
  email: z
    .string({ required_error: REQUIRED_EMAIL_MESSAGE })
    .email(INVALID_EMAIL_MESSAGE)
    .min(1, REQUIRED_EMAIL_MESSAGE),
  password: z
    .string({ required_error: REQUIRED_PASSWORD_MESSAGE })
    .min(6, INVALID_PASSWORD_MESSAGE),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: REQUIRED_EMAIL_MESSAGE })
    .email(INVALID_EMAIL_MESSAGE)
    .min(1, REQUIRED_EMAIL_MESSAGE),
});

export type AuthSchema = z.infer<typeof authSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
