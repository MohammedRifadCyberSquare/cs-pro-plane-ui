import { IUser } from "@/types/user.dt";
import { UserStore ,IUserStore } from "./user.store";
import { IWorkspaceStore, WorkspaceStore } from "./workspace.store";
 

export class RootStore {

    user: IUserStore;
    workspace: IWorkspaceStore;
    constructor(){
        this.user = new UserStore(this)
        this.workspace = new WorkspaceStore(this)
    }
}