import { axiosClient } from '../axiosClient';

export const getAllCheckIn = (fromDate?: number, toDate?: number) => {
  let params = {};
  if(fromDate && toDate) {
    params = {
      fromDate,
      toDate
    }
  }
  return axiosClient.get(`/checkins`, params);
}

export const getCheckInByUserId = (userId: number, fromDate?: number, toDate?: number) => {
  let params = {};
  if(fromDate && toDate) {
    params = {
      fromDate,
      toDate
    }
  }
  return axiosClient.get(`/checkins/users/${userId}`, params);
}

export const getCheckInByCohortId = (cohortId: number, fromDate: number, toDate: number) => {
  let params = {};
  if(fromDate && toDate) {
    params = {
      fromDate,
      toDate
    }
  }
  return axiosClient.get(`/checkins/cohorts/${cohortId}`, params);
}

export const getManagerCheckInToday = () => {
  return axiosClient.get(`/checkins`);
}

export const postCheckIn = (body: object) => {
  return axiosClient.post(`/checkins`, body);
}

export const postManagerComment = (body: object, checkInId: number) => {
  return axiosClient.patch(`/checkins/${checkInId}`, body);
}