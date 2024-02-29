import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";
import { IUser, IUserSettings } from "@/types/user.dt";

export class UserService extends APIService {
    constructor() {
      console.log('next url', API_BASE_URL
      );
      
      super(API_BASE_URL);
    }

    async fetchUserEmail(): Promise<any> {
        console.log('fetching')
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

      async currentUser(): Promise<IUser> {
        return this.get("/api/users/me/")
          .then((response) => response?.data)
          .catch((error) => {
            throw error?.response;
          });
      }

      async updateUserOnBoard({ userRole }: any, user: IUser | undefined): Promise<any> {
        return this.patch("/api/users/me/onboard/", {
          is_onboarded: true,
        })
          .then((response) => {
             console.log('onboardrd')
            return response?.data;
          })
          .catch((error) => {
            throw error?.response?.data;
          });
      }

      async currentUserSettings(): Promise<IUserSettings> {
        return this.get("/api/users/me/settings/")
          .then((response) => response?.data)
          .catch((error) => {
            throw error?.response;
          });
      }
    
}