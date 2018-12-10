import * as axiosClients from '../../axiosClients/axiosClient';
import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import { ICheckIn } from '../../model/CheckIn.model';

export const associateTypes = {
  CHECK_IN_PAGE_CHANGE: 'CHECK_IN_PAGE_CHANGE',
  INIT: 'INIT',
  SUBMIT_CHECK_IN: 'SUBMIT_CHECK_IN'
}

/**
 * Set up associate past check-ins list
 */
export const associateInit = () => (dispatch) => {
  if(axiosClients.addCognitoToHeader()) {
    checkInClient.getAssociateCheckIns()
    .then(response => {
      localStorage.setItem('REVATURE_SMS_COGNITO', response.data.result.auth);
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
}

/**
 * Associate submit a new check in
 * @param description 
 */
export const submitCheckIn = (description: string) => {
  const body = {
    "description": description
  }
  checkInClient.submitCheckIn(body)
  .then(response => {
    console.log("error");
  })
  .catch(error => {
    console.log("error");
  });
}