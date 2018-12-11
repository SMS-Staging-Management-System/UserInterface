import { axiosClient } from '../axiosClient';
import { RegisterDto } from '../../model/Register.model';
import { IUser } from 'src/model/User.model';

/**
 * 
 * @param registerDto Return promise to register user
 * @param token 
 */
export const register = (registerDto: RegisterDto) => {
  return axiosClient.post(`/users`, registerDto);
}

export const login = (username: string, password: string) => {
  // using cognito login now
  console.log("error");
}

/**
 * Return promise to get user info from server
 */
export const getUserFromCognito = () => {
  return axiosClient.get(`/users/info`);
}

/**
 * Return promise to get user info from server
 */
export const patchUser = (user: IUser) => {
  return axiosClient.patch(`/users`, user);
}