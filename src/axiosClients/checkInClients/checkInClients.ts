import { axiosClient } from '../axiosClient';
import { environment } from '../environment';

export const associateGetCheckIns = () => {
  return axiosClient.get(`${environment}/checkins`)
}

export const submitCheckIn = (body: object) => {
  return axiosClient.post(`${environment}/checkins`, body);
}

export const managerGetCheckInToday = () => {
  return axiosClient.post(`${environment}/checkins/today`);
}

export const managerAddComment = (body: object, checkInId: number) => {
  return axiosClient.patch(`${environment}/checkins/${checkInId}`, body);
}