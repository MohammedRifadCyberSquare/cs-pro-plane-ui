import { z } from 'zod';

export const WorkspaceValidator = z.object({

    workspaceName: z.string(),
    workspaceSlug: z.string(),
    // role: z.string(),
    }) 
export type TWorkspaceValidator = z.infer<typeof WorkspaceValidator>