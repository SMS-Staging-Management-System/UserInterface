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

/**
 * Get the current login user with the jwt token from cognito
 */
export const getUserByJwtToken = () => {
  return axiosClient.get(`/users`);
}

/**
 * Return promise to get user info from server
 */
export const getUserFromCognitoJwt = () => {
  return axiosClient.get(`/users/info`);
}

/**
 * Return promise to get user info from server
 */
export const patchUser = (user: IUser) => {
  return axiosClient.patch(`/users`, user);
}