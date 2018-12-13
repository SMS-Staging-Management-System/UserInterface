import { axiosClient } from '../axiosClient';
import { IUserCreateDto } from '../../model/UserCreateDto.model'

export const getManagerCohorts = () => {
  return axiosClient.get(`/cohorts`)
}

export const postCohort = (cohortName: string, cohortDescription: string, users: IUserCreateDto[]) => {
  const body = {
    cohortName,
    cohortDescription,
    users
  }
  return axiosClient.post(`/cohorts`, body)
}