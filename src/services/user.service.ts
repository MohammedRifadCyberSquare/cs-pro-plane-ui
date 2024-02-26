import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";
import { IUser } from "@/types/user.dt";

export class UserService extends APIService {
    constructor() {
      console.log('next url', API_BASE_URL
      );
      
      super(API_BASE_URL);
    }

    async fetchUserEmail(): Promise<any> {
      
        return this.get("/api/user/email/")
          .then((response) => {
            console.log(response?.data.access_token)
            
             
            return response?.data;
          })
          .catch((error) => {
            throw error?.response?.data;
          });
      }


      async updateUser(data: Partial<IUser>): Promise<any> {
        return this.patch("/api/users/me/", data)
          .then((response) => response?.data)
          .catch((error) => {
            throw error?.response?.data;
          });
      }
}