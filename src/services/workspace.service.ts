import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";
import { IUser } from "@/types/user.dt";
import { IWorkspace } from "@/types/workspace";

export class WorkspaceService extends APIService {
    constructor() {
      super(API_BASE_URL);
    }


    async createWorkspace(data: Partial<IWorkspace>): Promise<any> {
        return this.post("/api/users/me/workspaces/", data)
          .then((response) => {
            
          })
          .catch((error) => {
            throw error?.response?.data;
          });
      }


      async userWorkspaces(): Promise<IWorkspace[]> {
        return this.get("/api/users/me/workspaces/")
          .then((response) => response?.data)
          .catch((error) => {
            throw error?.response?.data;
          });
      }


      async workspaceSlugCheck(slug: string): Promise<any> {
        return this.get(`/api/workspace-slug-check/?slug=${slug}`)
          .then((response) => response?.data)
          .catch((error) => {
            throw error?.response?.data;
          });
      }


      async getWorkspace(workspaceSlug: string): Promise<IWorkspace> {
        return this.get(`/api/workspaces/${workspaceSlug}/`)
          .then((response) => response?.data)
          .catch((error) => {
            throw error?.response;
          });
      }
}