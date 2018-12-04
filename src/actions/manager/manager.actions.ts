import * as axiosClients from '../../axiosClients/axiosClient';
import * as checkInClient from '../../axiosClients/checkInClients/checkInClients';
import { CheckIn } from '../../model/CheckIn.model';

export const managerTypes = {
  INIT: 'INIT',
}

/**
 * Set up manager list of classes and check-ins
 */
export const managerInit = () => (dispatch) => {
  if(localStorage.getItem('REVATURE_SMS_JWT')) {
    axiosClients.addJwtToHeader(localStorage.getItem('REVATURE_SMS_JWT'));
    checkInClient.managerGetCheckInToday()
    .then(response => {
      dispatch({
        type: managerTypes.INIT,
        payload: {
          checkIns:  response.data.result.checkIns,
          classes:   response.data.result.classes
        }
      });
    })
    .catch(error => {
    })
  }
}

/**
 * Update a check in with a comment
 * @param comment 
 */
export const submitCheckInComment = (comment: string, checkInId: number) => {
  if(localStorage.getItem('REVATURE_SMS_JWT')) {
    let body = {
      "comments": comment
    }

    checkInClient.managerAddComment(body, checkInId)
    .then(response => {
      // TODO snackbar
      // dispatch({
      //   type: snackbar.SNACKBAR_ADD,
      //   payload: {
      //     message: "Note submitted"
      //   }
      // });
    })
    .catch(error => {
    })
  }
}

export const filterCheckIn = (username: string, checkIn:CheckIn[]) => {

}