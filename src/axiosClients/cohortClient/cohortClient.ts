import { createClient } from '../axiosClient';

export const cohortClient = createClient();

export const getManagerCohorts = () => {
  return cohortClient.get(`/cohorts`)
}