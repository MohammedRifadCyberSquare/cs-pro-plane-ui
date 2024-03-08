import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";
import { IVerificationCode } from "@/app/onboarding/_components/verify-email";
;


export class EmailService extends APIService {
  constructor() {
    console.log('next url', API_BASE_URL
    );

    super(API_BASE_URL);
  }

  async requestCode(): Promise<any> {
    console.log( this.getAccessToken() ? this.getHeaders() : {},'pppppppppppppppp')
    return this.post("/api/user/email/", { headers: this.getAccessToken() ? this.getHeaders() : {}, })
      .then((response) => {
        if(response?.data?.access_token){
          this.setAccessToken(response?.data?.access_token);
          this.setRefreshToken(response?.data?.refresh_token);
        }
        return response?.data;
      }) 
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async verifyEmail(formData:IVerificationCode): Promise<any> {
    console.log(formData)
    
    return this.post("/api/user/email/verify", formData, { headers: this.getAccessToken() ? this.getHeaders() : {}, })
      .then((response) => {
        if(response?.data?.access_token){
          this.setAccessToken(response?.data?.access_token);
          this.setRefreshToken(response?.data?.refresh_token);
        }
        
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}