import { IUser } from "@/types/user.dt";
import { UserStore ,IUserStore } from "./user.store";

export class RootStore {

    user: IUserStore;

    constructor(){
        this.user = new UserStore(this)
    }
}