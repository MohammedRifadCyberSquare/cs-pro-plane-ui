import { IProjectMember, TUserProjectRole } from "@/types/project";
import { IUser, IUserSettings } from "@/types/user.dt";
import { IWorkspace, IWorkspaceMemberMe, TUserWorkspaceRole } from "@/types/workspace";
import { action, observable, runInAction, makeObservable, computed } from "mobx";
import { RootStore } from "./root";
import { UserService } from "@/services/user.service";
import { WorkspaceService } from "@/services/workspace.service";


export interface IWorkspaceStore {

    workspaceSlug: string | null;
    workspaces: IWorkspace[] | undefined;
    // labels: { [workspaceSlug: string]: IIssueLabels[] }; // workspaceSlug: labels[]
    setWorkspaceSlug: (workspaceSlug: string) => void;
    getWorkspaceBySlug: (workspaceSlug: string) => IWorkspace | null;
    // getWorkspaceLabelById: (workspaceSlug: string, labelId: string) => IIssueLabels | null;
    fetchWorkspaces: () => Promise<IWorkspace[]>;
    // fetchWorkspaceLabels: (workspaceSlug: string) => Promise<void>;

      // workspace write operations
  createWorkspace: (data: Partial<IWorkspace>) => Promise<IWorkspace>;
  // updateWorkspace: (workspaceSlug: string, data: Partial<IWorkspace>) => Promise<IWorkspace>;
  // deleteWorkspace: (workspaceSlug: string) => Promise<void>;

    // computed
    currentWorkspace: IWorkspace | null;
    workspacesCreateByCurrentUser: IWorkspace[] | null;
    // workspaceLabels: IIssueLabels[] | null;


  
}   

export class WorkspaceStore implements IWorkspaceStore {

  workspaceSlug: string | null = null;
  workspaces: IWorkspace[] | undefined = [];

  workspaceService;

  setWorkspaceSlug = (workspaceSlug: string) => (this.workspaceSlug = workspaceSlug);
  getWorkspaceBySlug = (workspaceSlug: string) => this.workspaces?.find((w) => w.slug == workspaceSlug) || null;
  rootStore
constructor(_rootStore: RootStore) {
    makeObservable(this, {

      // observables
      workspaceSlug: observable.ref,
      workspaces: observable.ref,

      // actions
      setWorkspaceSlug: action,
      getWorkspaceBySlug: action,
      fetchWorkspaces: action,

      // workspace write operations
      createWorkspace: action,
      

      // computed
      currentWorkspace: computed,
    })

    this.rootStore = _rootStore;
    this.workspaceService = new WorkspaceService()
  }

  get currentWorkspace() {
    if (!this.workspaceSlug) return null;

    return this.workspaces?.find((workspace) => workspace.slug === this.workspaceSlug) || null;
  }



  get workspacesCreateByCurrentUser() {
    if (!this.workspaces) return null;

    const user = this.rootStore.user.currentUser;

    if (!user) return null;

    return this.workspaces.filter((w) => w.created_by === user?.id);
  }


  fetchWorkspaces = async () => {
    try {
      

      const workspaceResponse = await this.workspaceService.userWorkspaces();

      runInAction(() => {
        this.workspaces = workspaceResponse;
         
      });

      return workspaceResponse;
    } catch (error) {
      console.log("Failed to fetch user workspaces in workspace store", error);

      runInAction(() => {
         
        this.workspaces = [];
      });

      throw error;
    }
  };


  createWorkspace = async (data: Partial<IWorkspace>) => {
    try {
      // runInAction(() => {
      //   this.loader = true;
      //   this.error = null;
      // });

      const user = this.rootStore.user.currentUser ?? undefined;

      const response = await this.workspaceService.createWorkspace(data);

      runInAction(() => {
        // this.loader = false;
        // this.error = null;
        this.workspaces = [...(this.workspaces ?? []), response];
      });

      return response;
    } catch (error) {
      // runInAction(() => {
      //   this.loader = false;
      //   this.error = error;
      // });

      throw error;
    }
  };
}


//     workspaceSlug: string | null = null;
//     workspaces: IWorkspace[] | undefined = [];
//     // projects: { [workspaceSlug: string]: IProject[] } = {}; // workspaceSlug: project[]
//     // labels: { [workspaceSlug: string]: IIssueLabels[] } = {};
//     // members: { [workspaceSlug: string]: IWorkspaceMember[] } = {};
//       // services
//   // workspaceService;
//   // constructor(_rootStore: RootStore) {
//   //   makeObservable(this, {
//   //       workspaceSlug: observable.ref,
//   //     workspaces: observable.ref,
     
      

//   //     // workspace write operations
//   //     createWorkspace: action,
//   //     updateWorkspace: action,
//   //     deleteWorkspace: action,

//   //     // computed
//   //     currentWorkspace: computed,
//   //     workspaceLabels: computed,
//     })
    
// }