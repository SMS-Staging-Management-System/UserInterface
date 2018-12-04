import axios from 'axios';
import { environment } from './environment';

export const addJwtToHeader = (token: any) => {
  localStorage.setItem('REVATURE_SMS_JWT', token);
  axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('REVATURE_SMS_JWT');
}

export const axiosClient = axios.create({
  baseURL: environment.smsContext,
  headers: { 
    'Content-Type': 'application/json'
  }
});