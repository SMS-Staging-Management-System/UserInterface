import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import { ICheckIn } from '../../model/CheckIn.model';

export const associateTypes = {
  CHECK_IN_PAGE_CHANGE: 'CHECK_IN_PAGE_CHANGE',
  INIT: 'INIT',
  SUBMIT_CHECK_IN: 'SUBMIT_CHECK_IN'
}

/**
 * Get associate checkins
 */
export const associateInit = (userId: number) => (dispatch) => {
  const fromDate = new Date();
  fromDate.setUTCHours(0,0,0,0);
  
  const toDate = new Date();
  toDate.setUTCHours(11,59,59,59);
  
  checkInClient.getCheckInByUserId(userId)
  .then(response => {
    const checkInList = response.data.result.checkIns.map(checkIn => {
      return checkIn as ICheckIn;
    })
    dispatch({
      payload: {
        checkIns: checkInList
      },
      type: associateTypes.INIT
    });
  })
  .catch(error => {
    console.log("error");
  })
}

/**
 * Associate submit a new check in
 * @param description 
 */
export const submitCheckIn = (description: string) => {
  const body = {
    "description": description
  }
  checkInClient.postCheckIn(body)
  .then(response => {
    console.log("error");
  })
  .catch(error => {
    console.log("error");
  });
}