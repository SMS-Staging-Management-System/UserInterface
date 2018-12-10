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

/**
 * 
 * @param registerDto Return promise to register user
 * @param token 
 */
export const register = (registerDto: RegisterDto, token: string) => {
  return userClient.post(`/users?token=${token}`, registerDto);
}

export const login = (username: string, password: string) => {
  // using cognito login now
  console.log("error");
}

/**
 * Return promise to get user info from server
 */
export const getUserFromCognito = () => {
  return userClient.get(`/users/info`);
}

/**
 * Return promise to get user info from server
 */
export const patchUser = () => {
  return userClient.patch(`/users`);
}