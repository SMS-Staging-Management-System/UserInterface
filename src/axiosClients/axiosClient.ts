import axios from 'axios';
import { userClient } from './userClient/userClient';
import { checkInClient } from './checkInClient/checkInClient';
import { cohortClient } from './cohortClient/cohortClient';
// import { environment }  from '../environment';

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
  baseURL: 'znc.anorexicseal.com:8765',
  headers: { 
    'Content-Type': 'application/json'
  }
});

export function createClient() {
  return axios.create({
    baseURL: 'znc.anorexicseal.com:8765',
    headers: { 
      'Content-Type': 'application/json'
    }
  });
}

function addTokenToHeaders(token: string) {
  userClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + token;
  checkInClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + token;
  cohortClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + token;
  return true;
}