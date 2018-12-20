import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import { ICheckIn } from '../../model/CheckIn.model';
import { getTodayStart, getTodayEnd } from 'src/include/utcUtil';
import { toast } from 'react-toastify';
import { sortCheckInByDate } from '../manager/manager.helpers';

export const associateTypes = {
  CHECK_IN_PAGE_CHANGE: 'CHECK_IN_PAGE_CHANGE',
  INIT: 'INIT',
  SUBMIT_CHECK_IN: 'SUBMIT_CHECK_IN'
}

/**
 * Get associate checkins
 */
export const associateInit = (userId: number) => (dispatch) => {  
  checkInClient.getCheckInByUserId(userId, getTodayStart(), getTodayEnd())
  .then(response => {
    const checkInList = response.data.models.map(checkIn => {
      return checkIn as ICheckIn;
    })
    const list = sortCheckInByDate(checkInList);
    dispatch({
      payload: {
        checkIns: list
      },
      type: associateTypes.INIT
    });
  })
  .catch(error => {
    console.log(error);
  })
}

/**
 * Associate submit a new check in
 * @param description 
 */
export const submitCheckIn = (description: string, userId: number) => {
  const body = {
    "checkinDescription": description,
    "userId": userId
  }
  checkInClient.postCheckIn(body)
  .then(response => {
    console.log("success: " + JSON.stringify(response.data));
    toast.success("Check in submitted")
  })
  .catch(error => {
    toast.warn("Unable to submit check in")    
  });
}