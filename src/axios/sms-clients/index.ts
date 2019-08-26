import axios from 'axios';
import { environment } from '../../environment';

let jwt = '';

export const smsClient = axios.create({
  baseURL: environment.smsContext,
  headers: {
    'Content-Type': 'application/json'
  }
});
//COMMENT OUT BLOCK BELOW TO MAKE BACKEND CALLS WORK (AS OF 8/26/2019)
// Create interceptor to add the token into the header for every request
smsClient.interceptors.request.use((config) => {
 config.headers.Authorization = jwt
 return config;
});

export function refreshJwt(newJwt: string) {
  jwt = newJwt;
}
