import { createClient } from '../axiosClient';
import environment from '../environment';

export const checkInClient = createClient();

export const getAssociateCheckIns = () => {
  return checkInClient.get(`${environment}/checkins`)
}

export const submitCheckIn = (body: object) => {
  return checkInClient.post(`${environment}/checkins`, body);
}

export const getManagerCheckInToday = () => {
  return checkInClient.post(`${environment}/checkins/today`);
}

export const postManagerComment = (body: object, checkInId: number) => {
  return checkInClient.patch(`${environment}/checkins/${checkInId}`, body);
}