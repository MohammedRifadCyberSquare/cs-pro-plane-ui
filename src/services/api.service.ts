import axios from "axios";
import { getCookie, setCookie } from 'cookies-next';

export abstract class APIService {
  protected baseURL: string;
  protected headers: any = {};
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  setRefreshToken(token: string) {
    setCookie('refreshToken', token);
  }
  setAccessToken(token: string) {
    setCookie('accessToken', token);
  }
  purgeRefreshToken() {
    getCookie('yourCookieName');
    // Cookies.remove("refreshToken", { path: "/" });
  }



  getAccessToken() {
    console.log(getCookie('accessToken'))
    return getCookie('accessToken')
  }
  getRefreshToken() {
    return getCookie('refreshToken')
  }


  getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  }

  get(url: string, config = {}): Promise<any> {
    console.log(this.getAccessToken() ? this.getHeaders() : {}, 'kkkk')
    return axios({
      method: "get",
      url: this.baseURL + url,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    }).then((response) => {
      if (response?.data?.access_token) {
        console.log('llkkkk')
        this.setAccessToken(response?.data?.access_token);
        this.setRefreshToken(response?.data?.refresh_token);
      }
      else{
        console.log('no');
        
      }
    });
  }

  post(url: string, data = {}, config = {}): Promise<any> {
    console.log(this.baseURL + url, '****************');

    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
       headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  put(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "put",
      url: this.baseURL + url,
      data,
      //   headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  patch(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "patch",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  delete(url: string, data?: any, config = {}): Promise<any> {
    return axios({
      method: "delete",
      url: this.baseURL + url,
      data: data,
      //   headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  request(config = {}) {
    return axios(config);
  }
}

