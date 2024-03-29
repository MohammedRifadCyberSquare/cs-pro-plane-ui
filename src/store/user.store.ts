import { IProjectMember, TUserProjectRole } from "@/types/project";
import { IUser, IUserSettings } from "@/types/user.dt";
import { IWorkspaceMemberMe, TUserWorkspaceRole } from "@/types/workspace";
import { action, observable, runInAction, makeObservable, computed } from "mobx";
import { RootStore } from "./root";
import { UserService } from "@/services/user.service";


export interface IUserStore {

  currentUser: IUser | null;
  currentUserSettings: IUserSettings | null;
  fetchCurrentUser: () => Promise<IUser>;
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
  fetchCurrentUserSettings: () => Promise<IUserSettings>;

  // fetchUserWorkspaceInfo: (workspaceSlug: string) => Promise<IWorkspaceMemberMe>;
  // fetchUserProjectInfo: (workspaceSlug: string, projectId: string) => Promise<IProjectMember>;
  // fetchUserDashboardInfo: (workspaceSlug: string, month: number) => Promise<any>;

  updateUserOnBoard: () => Promise<void>;
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
      updateUserOnBoard: action,

    })
    this.userService = new UserService()
  }

  fetchCurrentUser = async () => {
    try {
      const response = await this.userService.currentUser();
      console.log(response,'111111111')
      if (response) {
        runInAction(() => {
          this.currentUser = response;

        });
      }
      return response;
    } catch (error) {
      runInAction(() => {

      });
      throw error;
    }
  };

  updateCurrentUser = async (data: Partial<IUser>) => {
    console.log(data, 'userrrrr')
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


  updateUserOnBoard = async () => {
    console.log('updatimg user onboard')
    try {
      runInAction(() => {
        this.currentUser = {
          ...this.currentUser,
          is_onboarded: true,
        } as IUser;
      });

      const user = this.currentUser ?? undefined;

      if (!user) return;

      await this.userService.updateUserOnBoard({ userRole: user.role }, user);
    } catch (error) {
      this.fetchCurrentUser();

      throw error;
    }
  };
  fetchCurrentUserSettings = async () => {
    try {
      const response = await this.userService.currentUserSettings();
      if (response) {
        runInAction(() => {
          this.currentUserSettings = response;
        });
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
}