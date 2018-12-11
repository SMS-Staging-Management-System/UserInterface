import axios from 'axios';
import { environment }  from '../environment';
const smsContext = environment.smsContext;

const AUTHORIZATION_HEADER = 'Authorization';
const CONGNITO_TOKEN  = 'REVATURE_SMS_COGNITO';

export const addCognitoToHeader = (token?: any) => {
  if(token) {
    localStorage.setItem(CONGNITO_TOKEN , token); 
    return addTokenToHeaders(token);
  } else if(localStorage.getItem(CONGNITO_TOKEN)) {
    const sToken = localStorage.getItem(CONGNITO_TOKEN );
    return addTokenToHeaders(sToken);
  } else {
    return false;
  }
}

export const axiosClient = axios.create({
  baseURL: smsContext,
  headers: { 
    'Content-Type': 'application/json'
  }
});

function addTokenToHeaders(token: string) {
  axiosClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + token;
  return true;
}