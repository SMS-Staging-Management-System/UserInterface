import { axiosClient } from '../axiosClient';

export const getManagerCohorts = () => {
  return axiosClient.get(`/cohorts`)
}

export const postCohort = (cohortName: string, emails: string[]) => {
  return axiosClient.post(`/cohorts`)
}