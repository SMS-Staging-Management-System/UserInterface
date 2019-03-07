import axios from 'axios';
import { environment } from '../../environment';

let jwt = '';

export const smsClient = axios.create({
  baseURL: environment.smsContext,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const surveyContext = axios.create({
  baseURL: environment.surveyContext,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create interceptor to add the token into the header for every request
smsClient.interceptors.request.use((config) => {
  config.headers.Authorization = jwt
  return config;
});

export function refreshJwt(newJwt: string) {
  jwt = newJwt;
}
