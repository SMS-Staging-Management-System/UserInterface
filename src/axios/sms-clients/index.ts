import axios from 'axios';
import { environment } from '../../environment';


export const smsClient = axios.create({
  baseURL: environment.smsContext,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create interceptor to add the token into the header for every request
smsClient.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});