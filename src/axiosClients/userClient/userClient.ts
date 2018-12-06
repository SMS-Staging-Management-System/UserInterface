import { createClient } from '../axiosClient';
import { RegisterDto } from '../../model/Register.model';

export const userClient = createClient();

export const verifyRegisterToken = (token: string) => {
  userClient.get(`/cohorts/verify?token=${token}`)
  .then(response => {
    console.log("error");
  })
  .catch(error => {
    console.log("error");
    // TODO error message
  });
}

export const register = (registerDto: RegisterDto, token: string) => {
  return userClient.post(`/users?token=${token}`, registerDto);
}

export const login = (username: string, password: string) => {
  // TODO use cognito
  // let user:object = {
  //   "username": username,
  //   "password": password
  // }
  // return userClient.get(`/users`, user);
  console.log("error");
}

export const getUserFromCognito = () => {
  return userClient.get(`/users/info`);
}