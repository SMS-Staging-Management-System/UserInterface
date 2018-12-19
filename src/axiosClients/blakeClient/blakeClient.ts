import { blakeClient } from '../axiosClient';
// import { axiosClient } from '../axiosClient';

export const findUsersByRole = (role: string) => {
  return blakeClient.get(`/cognito/users/groups/${role}`);
}