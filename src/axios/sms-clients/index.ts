import axios from 'axios';
import { environment } from '../../environment';

let jwt = '';

export const smsClient = axios.create({
  baseURL: environment.smsContext,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create interceptor to add the token into the header for every request
//may need to comment the bottom for checking to work
smsClient.interceptors.request.use((config) => {
  config.headers.Authorization = jwt
  return config;
});

export function refreshJwt(newJwt: string) {
  jwt = newJwt;
}
