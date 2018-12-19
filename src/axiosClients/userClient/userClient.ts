import { axiosClient } from '../axiosClient';
import { IUser } from 'src/model/User.model';
import { IUserCreateDto } from 'src/model/UserCreateDto.model';

/**
 * Return promise to get user info from server
 */
export const getUserFromCognitoJwt = () => {
  return axiosClient.get(`/users/info`);
}

export const getAllUsers = () => {
  return axiosClient.get(`users`);
}

/**
 * Return promise to create a user
 */
export const postUser = (user: IUserCreateDto) => {
  return axiosClient.post(`/users`, user);
}

/**
 * Return promise to get user info from server
 */
export const patchUser = (user: IUser) => {
  return axiosClient.patch(`/users`, user);
}

export const getUserByEmail = (email: string) => {
  return axiosClient.get(`/users/email/${email}/`);
}