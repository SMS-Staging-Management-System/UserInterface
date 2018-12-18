import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import { ICheckIn } from '../../model/CheckIn.model';
import { getTodayStart, getTodayEnd } from 'src/include/utcUtil';
import { toast } from 'react-toastify';

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
export const submitCheckIn = (checkinDescription: string, userId: number) => {
  const body = {
    checkinDescription,
    userId
  }
  checkInClient.postCheckIn(body)
  .then(response => {
    toast.success("Check in submitted")
  })
  .catch(error => {
    toast.warn("Unable to submit check in")    
  });
}