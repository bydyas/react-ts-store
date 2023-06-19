import { object, string, TypeOf } from 'zod';

export const schema = object({
  firstName: string()
    .nonempty('First name is required')
    .max(25, 'First name must be less than 25 characters')
    .optional(),
  lastName: string()
    .nonempty('Last name is required')
    .max(25, 'Last name must be less than 25 characters')
    .optional(),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(20, 'Password must be less than 32 characters'),
});

export type FormInputs = TypeOf<typeof schema>;
