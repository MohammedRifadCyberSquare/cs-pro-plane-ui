import { z } from 'zod';

export const SignUpValidator = z.object({

    email: z.string().refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: 'Invalid email format',
    }),
    password: z.string().min(8, {
        message: 
        'Password Should be minimum 8 characters long.'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Confirm password should be minimum 8 characters long.',
      }),
    }).refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match.',
    });
 
export type TSignUpValidator = z.infer<typeof SignUpValidator>