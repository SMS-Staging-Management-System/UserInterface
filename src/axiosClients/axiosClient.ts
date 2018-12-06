import axios from 'axios';
import { userClient } from './userClient/userClient';
import { checkInClient } from './checkInClient/checkInClient';
import { environment } from './environment';

export const addCognitoToHeader = (token?: any) => {
  if(token) {
    localStorage.setItem('REVATURE_SMS_COGNITO', token);
    userClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('REVATURE_SMS_COGNITO');
    checkInClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('REVATURE_SMS_COGNITO');
    return true;
  } else if(localStorage.getItem('REVATURE_SMS_COGNITO')) {
    let sToken = localStorage.getItem('REVATURE_SMS_COGNITO');
    userClient.defaults.headers.common['Authorization'] = 'Bearer ' + sToken;
    checkInClient.defaults.headers.common['Authorization'] = 'Bearer ' + sToken;
    return true;
  } else return false;
}

export const axiosClient = axios.create({
  baseURL: environment.smsContext,
  headers: { 
    'Content-Type': 'application/json'
  }
});

export const createClient = () => {
  return axios.create({
    baseURL: environment.smsContext,
    headers: { 
      'Content-Type': 'application/json'
    }
  });
}