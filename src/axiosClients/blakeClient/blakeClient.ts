import { blakeClient } from '../axiosClient';

export const getTrainers = () => {
  return blakeClient.get(`/dev/cognito/users/groups/trainers`);  
}

export const getStagingManagers = () => {
  return blakeClient.get(`/dev/cognito/users/groups/staging-manager`);  
}

export const getAdmin = () => {
  return blakeClient.get(`/dev/cognito/users/groups/admin`);  
}

export const findUsersByRole = (role: string) => {
  return blakeClient.get(`/cognito/users/groups/${role}`);
}