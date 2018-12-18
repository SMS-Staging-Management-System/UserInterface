import { axiosClient } from '../axiosClient';

export const getManagerCheckIn = (fromDate: number, toDate: number) => {
  const params = {
    fromDate: 0,
    toDate
  }
  return axiosClient.get(`/checkins/range`, {params});
}

export const getCheckInByUserId = (userId: number, fromDate: number, toDate: number) => {
  const params = {
    fromDate,
    toDate
  }
  return axiosClient.get(`/checkins/associates/${userId}`, {params});
}

export const getCheckInByCohortId = (cohortId: number, fromDate: number, toDate: number) => {
  const params = {
    fromDate,
    toDate
  }
  return axiosClient.get(`/checkins/cohorts/${cohortId}`, {params});
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

export const getAssociateCheckIn = (userId: number, fromDate: number, toDate: number) => {
  const params = {
    fromDate,
    toDate
  }
  return axiosClient.get(`/checkins/associates/${userId}`, {params})
}

export const postCheckIn = (body: object) => {
  return axiosClient.post(`/checkins`, body);
}

export const postManagerComment = (body: object, checkInId: number) => {
  return axiosClient.patch(`/checkins/${checkInId}`, body);
}