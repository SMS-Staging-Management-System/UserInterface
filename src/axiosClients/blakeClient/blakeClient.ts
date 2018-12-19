import { blakeClient } from '../axiosClient';
// import { axiosClient } from '../axiosClient';

export const findUsersByRole = (role: string) => {
  return blakeClient.get(`/cognito/users/groups/${role}`);
}

export const addUserGroup = (email: string, groupName: string) => {
  const body = {
    email,
    groupName
  }
  return blakeClient.post(`cognito/users/groups`, {body});
}

export const deleteUserGroup = (email: string, groupName: string) => {
  const body = {
    email,
    groupName
  }
  return blakeClient.delete(`cognito/users/groups`, {data: body});
}