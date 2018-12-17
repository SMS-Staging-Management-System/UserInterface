import { axiosClient } from '../axiosClient';
import { getTodayTimeRange } from 'src/include/utcUtil';

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
  return axiosClient.get(`/checkins/associates/${userId}`, params);
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
  const params = getTodayTimeRange();
  return axiosClient.get(`/checkins/cohorts`, {
    params
  });
}

export const postCheckIn = (body: object) => {
  return axiosClient.post(`/checkins`, body);
}

export const postManagerComment = (body: object, checkInId: number) => {
  return axiosClient.patch(`/checkins/${checkInId}`, body);
}