import { z } from 'zod';

export const ProfileValidator = z.object({

    firstName: z.string(),
    lastName: z.string(),
    // role: z.string(),
    }) 
export type TProfileValidator = z.infer<typeof ProfileValidator>