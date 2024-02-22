import axios from "axios";
import { setCookie } from 'cookies-next';

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
    setCookie('AccessToken', token);
  }
  get(url: string, config = {}): Promise<any> {
    return axios({
      method: "get",
      url: this.baseURL + url,
      //   headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  post(url: string, data = {}, config = {}): Promise<any> {
    console.log(this.baseURL + url, '****************');

    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
      //   headers: this.getAccessToken() ? this.getHeaders() : {},
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
      //   headers: this.getAccessToken() ? this.getHeaders() : {},
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

