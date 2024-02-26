import { IProjectMember, TUserProjectRole } from "@/types/project";
import { IUser, IUserSettings } from "@/types/user.dt";
import { IWorkspaceMemberMe, TUserWorkspaceRole } from "@/types/workspace";
import { action, observable, runInAction, makeObservable, computed } from "mobx";
import { RootStore } from "./root";
import { UserService } from "@/services/user.service";
 

export interface IUserStore {
    
    currentUser: IUser | null;
    currentUserSettings: IUserSettings | null;
  
    // dashboardInfo: any;
  
    // workspaceMemberInfo: {
    //   [workspaceSlug: string]: IWorkspaceMemberMe;
    // };
    // hasPermissionToWorkspace: {
    //   [workspaceSlug: string]: boolean | null;
    // };
  
    // projectMemberInfo: {
    //   [projectId: string]: IProjectMember;
    // };
    // hasPermissionToProject: {
    //   [projectId: string]: boolean | null;
    // };
  
    // currentProjectMemberInfo: IProjectMember | undefined;
    // currentWorkspaceMemberInfo: IWorkspaceMemberMe | undefined;
    // currentProjectRole: TUserProjectRole | undefined;
    // currentWorkspaceRole: TUserWorkspaceRole | undefined;
  
    // hasPermissionToCurrentWorkspace: boolean | undefined;
    // hasPermissionToCurrentProject: boolean | undefined;
  
    // fetchCurrentUser: () => Promise<IUser>;
    // fetchCurrentUserSettings: () => Promise<IUserSettings>;
  
    // fetchUserWorkspaceInfo: (workspaceSlug: string) => Promise<IWorkspaceMemberMe>;
    // fetchUserProjectInfo: (workspaceSlug: string, projectId: string) => Promise<IProjectMember>;
    // fetchUserDashboardInfo: (workspaceSlug: string, month: number) => Promise<any>;
  
    // updateUserOnBoard: () => Promise<void>;
    // updateTourCompleted: () => Promise<void>;
    updateCurrentUser: (data: Partial<IUser>) => Promise<IUser>;
    // updateCurrentUserTheme: (theme: string) => Promise<IUser>;
  }



  export class UserStore implements IUserStore {
    currentUser: IUser | null = null;
    currentUserSettings: IUserSettings | null = null;
    userService;
    constructor(_rootStore: RootStore) {
      makeObservable(this, {
        currentUser: observable.ref,
        currentUserSettings: observable.ref,
      })
      this.userService = new UserService()
    }


    updateCurrentUser = async (data: Partial<IUser>) => {
      try {
        runInAction(() => {
          this.currentUser = {
            ...this.currentUser,
            ...data,
          } as IUser;
        });
  
        const response = await this.userService.updateUser(data);
  
        runInAction(() => {
          this.currentUser = response;
        });
        return response;
      } catch (error) {
        
  
        throw error;
      }
    };
  }