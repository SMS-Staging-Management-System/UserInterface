import { axiosClient } from '../axiosClient';

export const getManagerCohorts = () => {
  return axiosClient.get(`/cohorts`)
}