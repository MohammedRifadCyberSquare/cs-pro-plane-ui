import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";
import { IUser } from "@/types/user.dt";
import { IWorkspace } from "@/types/workspace";

export class WorkspaceService extends APIService {
    constructor() {
      super(API_BASE_URL);
    }


    async createWorkspace(data: Partial<IWorkspace>): Promise<any> {
        return this.post("/api/workspace/", data)
          .then((response) => {
            
          })
          .catch((error) => {
            throw error?.response?.data;
          });
      }
}