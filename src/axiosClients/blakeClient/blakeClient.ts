import { blakeClient } from '../axiosClient';
// import { axiosClient } from '../axiosClient';

export const findUsersByRole = (role: string) => {
  return blakeClient.get(`/cognito/users/groups/${role}`);
}

// export const patchUserGroup = (email: string, groupName: string) => {
//   const body = {
//     email,
//     groupName
//   }
//   return blakeClient.delete(`cognito/users/groups`, {body});
// }