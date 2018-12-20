import axios from 'axios';
import { environment }  from '../environment';
const smsContext = environment.smsContext;
const blakeContext = environment.blakeContext;

const AUTHORIZATION_HEADER = 'Authorization';

export const addCognitoToHeader = (token: any) => {
  axiosClient.defaults.headers.common[AUTHORIZATION_HEADER] = token;
  blakeClient.defaults.headers.common[AUTHORIZATION_HEADER] = token;
  return true;
}

export const axiosClient = axios.create({
  baseURL: smsContext,
  headers: { 
    'Content-Type': 'application/json'
  }
});

export const blakeClient = axios.create({
  baseURL: blakeContext,
  headers: { 
    'Content-Type': 'application/json'
  }
})