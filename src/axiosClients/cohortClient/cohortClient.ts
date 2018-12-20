import { axiosClient } from '../axiosClient';
import { IUserCreateDto } from '../../model/UserCreateDto.model'

export const getManagerCohorts = () => {
  return axiosClient.get(`/cohorts`)
}

export const getUsersByCohortId = (cohortId: number) => {
  return axiosClient.get(`/users/cohorts/${cohortId}`)
}

export const postCohort = (cohortName: string, cohortDescription: string, userList: IUserCreateDto[]) => {
  const body = {
    cohortDescription,
    cohortName,
    userList
  }
  return axiosClient.post(`/cohorts`, body)
}

export const postUser = (user: any) => {
  return axiosClient.post(`/users`, user)
}

export const addUserToCohort = (cohortId: number, userId: number) => {
  return axiosClient.patch(`/users/${userId}/cohorts/${cohortId}`)
}