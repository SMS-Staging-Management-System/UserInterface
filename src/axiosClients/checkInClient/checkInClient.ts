import { axiosClient } from '../axiosClient';

export const getAssociateCheckIns = () => {
  return axiosClient.get(`/checkins`)
}

export const submitCheckIn = (body: object) => {
  return axiosClient.post(`/checkins`, body);
}

export const getManagerCheckInToday = () => {
  return axiosClient.post(`/checkins/today`);
}

export const postManagerComment = (body: object, checkInId: number) => {
  return axiosClient.patch(`/checkins/${checkInId}`, body);
}