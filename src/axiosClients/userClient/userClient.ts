import { axiosClient } from '../axiosClient';
import { IUser } from 'src/model/User.model';
import { IUserCreateDto } from 'src/model/UserCreateDto.model';

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