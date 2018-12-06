import { createClient } from '../axiosClient';
import { environment } from '../environment';

export const cohortClient = createClient();

export const getManagerCohorts = () => {
  return cohortClient.get(`${environment}/cohorts`)
}