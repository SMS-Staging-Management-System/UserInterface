import { axiosClient } from '../axiosClient';
// import { getTodayTimeRange } from 'src/include/utcUtil';

export const getAllCheckIn = (fromDate?: number, toDate?: number) => {
  let params = {};
  fromDate.toString();
  toDate.toString();

  if(fromDate && toDate) {
    params = {
      fromDate: fromDate.toString(),
      toDate: toDate.toString()
    }
  }
  return axiosClient.get(`/checkins/range`, params);
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

export const getCheckInByUserEmail = (email: number, fromDate: number, toDate: number) => {
  // let params = {};
  // if(fromDate && toDate) {
  //   params = {
  //     fromDate,
  //     toDate
  //   }
  // }
  // axiosClient.get(`/users/email/${email}`)
  // .then(response => {
    
  // })
}

export const getManagerCheckInToday = () => {

  return axiosClient.get(`/checkins/cohorts`, {
    params : {
      fromDate: 0,
      toDate: 1545145895377
    }
  });
}

export const postCheckIn = (body: object) => {
  return axiosClient.post(`/checkins`, body);
}

export const postManagerComment = (body: object, checkInId: number) => {
  return axiosClient.patch(`/checkins/${checkInId}`, body);
}