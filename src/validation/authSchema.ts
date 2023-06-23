import { object, string } from 'zod';

export const authSchema = object({
  firstName: string()
    .nonempty('First name is required')
    .max(15, 'First name must be less than 15 characters')
    .optional(),
  lastName: string()
    .nonempty('Last name is required')
    .max(15, 'Last name must be less than 15 characters')
    .optional(),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(6, 'Password must be more than 6 characters')
    .max(20, 'Password must be less than 20 characters')
    .regex(/^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message:
        'Password must contain at least 1 uppercase letter and 1 number, and no special characters',
    }),
});
