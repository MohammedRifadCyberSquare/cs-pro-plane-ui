import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";

 
export class EmailService extends APIService {
    constructor() {
      console.log('next url', API_BASE_URL
      );
      
      super(API_BASE_URL);
    }

    async userSignUp(email: string, password: string): Promise<any> {
      console.log({email, password })
        return this.post("/api/user/sign-up/", { email, password }, { headers: {} })
          .then((response) => {
            this.setAccessToken(response?.data?.access_token);
            this.setRefreshToken(response?.data?.refresh_token);
            return response?.data;
          })
          .catch((error) => {
            throw error?.response?.data;
          });
      }
}