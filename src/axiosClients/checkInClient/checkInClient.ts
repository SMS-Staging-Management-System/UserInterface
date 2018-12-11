import { createClient } from '../axiosClient';

export const checkInClient = createClient();

export const getAssociateCheckIns = () => {
  return checkInClient.get(`/checkins`)
}

export const submitCheckIn = (body: object) => {
  return checkInClient.post(`/checkins`, body);
}

export const getManagerCheckInToday = () => {
  return checkInClient.post(`/checkins/today`);
}

export const postManagerComment = (body: object, checkInId: number) => {
  return checkInClient.patch(`/checkins/${checkInId}`, body);
}