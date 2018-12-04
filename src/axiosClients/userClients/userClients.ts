import { axiosClient } from '../axiosClient';
import { environment } from '../environment';
import { RegisterDto } from '../../model/Register.model';

export const verifyRegisterToken = (token: string) => {
  axiosClient.get(`${environment}/cohorts/verify?token=${token}`)
  .then(response => {
 
  })
  .catch(error => {
    // TODO error message
  });
}

export const register = (registerDto: RegisterDto, token: string) => {
  return axiosClient.post(`${environment}/users?token=${token}`, registerDto);
}

export const login = (username: string, password: string) => {
  let user:object = {
    "username": username,
    "password": password
  }
  return axiosClient.get(`${environment}/users`, user);
}

export const getUserFromJwt = () => {
  return axiosClient.get(`${environment}/users/info`);
}