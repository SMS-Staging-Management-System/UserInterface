import axios from 'axios';
import { environment }  from '../environment';
const smsContext = environment.smsContext;

const AUTHORIZATION_HEADER = 'Authentication';

export const addCognitoToHeader = (token: any) => {
  axiosClient.defaults.headers.common[AUTHORIZATION_HEADER] = token;
  return true;
}

export const axiosClient = axios.create({
  baseURL: smsContext,
  headers: { 
    'Content-Type': 'application/json'
  }
});