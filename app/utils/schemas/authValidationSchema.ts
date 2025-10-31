import { z } from 'zod';

const REQUIRED_EMAIL_MESSAGE = 'Email is required';
const INVALID_EMAIL_MESSAGE = 'Email Incorrect';
const REQUIRED_PASSWORD_MESSAGE = 'Password is required';
const INVALID_PASSWORD_MESSAGE = 'Password should be at least 6 symbols';

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
