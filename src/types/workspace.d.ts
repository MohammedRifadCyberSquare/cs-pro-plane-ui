export type TUserWorkspaceRole = 5 | 10 | 15 | 20;

export interface IWorkspace {
  readonly id: string;
  readonly owner: IUser;
  readonly created_at: Date;
  readonly updated_at: Date;
  name: string;
  url: string;
  logo: string | null;
  slug: string;
  readonly total_members: number;
  readonly slug: string;
  readonly created_by: string;
  readonly updated_by: string;
  organization_size: string;
  total_issues: number;
}
export interface IWorkspaceMemberMe {
    company_role: string | null;
    created_at: Date;
    created_by: string;
    default_props: IWorkspaceViewProps;
    id: string;
    member: string;
    role: TUserWorkspaceRole;
    updated_at: Date;
    updated_by: string;
    view_props: IWorkspaceViewProps;
    workspace: string;
  }