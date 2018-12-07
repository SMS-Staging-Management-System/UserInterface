import axios from 'axios';
import { userClient } from './userClient/userClient';
import { checkInClient } from './checkInClient/checkInClient';
// import environment  from './environment';

const AUTHORIZATION_HEADER = 'Authorization';
const CONGNITO_TOKEN  = 'REVATURE_SMS_COGNITO';

export const addCognitoToHeader = (token?: any) => {
  if(token) {
    localStorage.setItem(CONGNITO_TOKEN , token); 
    userClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + localStorage.getItem(CONGNITO_TOKEN );
    checkInClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + localStorage.getItem(CONGNITO_TOKEN );
    return true;
  } else if(localStorage.getItem(CONGNITO_TOKEN )) {
    const sToken = localStorage.getItem(CONGNITO_TOKEN );
    userClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + sToken;
    checkInClient.defaults.headers.common[AUTHORIZATION_HEADER] = 'Bearer ' + sToken;
    return true;
  } else {
    return false;
  }
}

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_PRODUCTION_SERVER_ADDRESS,
  headers: { 
    'Content-Type': 'application/json'
  }
});

export function createClient() {
  return axios.create({
    baseURL: process.env.REACT_APP_PRODUCTION_SERVER_ADDRESS,
    headers: { 
      'Content-Type': 'application/json'
    }
  });
}