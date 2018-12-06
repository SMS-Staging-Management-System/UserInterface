import * as axiosClients from '../../axiosClients/axiosClient';
import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import { CheckIn } from '../../model/CheckIn.model';

export const associateTypes = {
  INIT: 'INIT',
  SUBMIT_CHECK_IN: 'SUBMIT_CHECK_IN',
  CHECK_IN_PAGE_CHANGE: 'CHECK_IN_PAGE_CHANGE'
}

/**
 * Set up associate past check-ins list
 */
export const associateInit = () => (dispatch) => {
  if(axiosClients.addCognitoToHeader()) {
    checkInClient.getAssociateCheckIns()
    .then(response => {
      localStorage.setItem('REVATURE_SMS_COGNITO', response.data.result.auth);
      let checkInList = response.data.result.checkIns.map(checkIn => {
        return <CheckIn> checkIn;
      })
      dispatch({
        type: associateTypes.INIT,
        payload: {
          checkIns: checkInList
        }
      });
    })
    .catch(error => {
    })
  }
}

/**
 * Associate submit a new check in
 * @param description 
 */
export const submitCheckIn = (description: string) => {
  let body = {
    "description": description
  }
  checkInClient.submitCheckIn(body)
  .then(response => {})
  .catch(error => {});
}