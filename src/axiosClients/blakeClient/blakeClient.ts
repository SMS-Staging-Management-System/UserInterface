// import { blakeClient } from '../blakeClient';
import { axiosClient } from '../axiosClient';


export const findUsersByRole = (role: string) => {
  return axiosClient.get(`/cognito/users/groups/${role}`);
}

export const addUserGroup = (email: string, groupName: string) => {
  const body = {
    email,
    groupName
  }
  return axiosClient.put(`/cognito/users/groups`, body);
}

export const deleteUserGroup = (email: string, groupName: string) => {
  const body = {
    email,
    groupName
  }
  return axiosClient.delete(`/cognito/users/groups`, {data: body});
}