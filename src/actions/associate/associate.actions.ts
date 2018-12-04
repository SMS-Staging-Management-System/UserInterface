import * as axiosClients from '../../axiosClients/axiosClient';
import * as checkInClient from '../../axiosClients/checkInClients/checkInClients';

export const associateTypes = {
  INIT: 'INIT',
  SUBMIT_CHECK_IN: 'SUBMIT_CHECK_IN'
}

/**
 * Set up associate list of past check-ins
 */
export const associateInit = () => (dispatch) => {
  if(localStorage.getItem('REVATURE_SMS_JWT')) {
    axiosClients.addJwtToHeader(localStorage.getItem('REVATURE_SMS_JWT'));
    checkInClient.associateGetCheckIns()
    .then(response => {
      localStorage.setItem('REVATURE_SMS_JWT', response.data.result.auth);
      dispatch({
        type: associateTypes.INIT,
        payload: {
          checkIns: response.data.result.checkIns
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
  .then(response => {
    // TODO snackbar
    // dispatch({
    //   type: snackbar.SNACKBAR_ADD,
    //   payload: {
    //     message: "Check in submitted"
    //   }
    // });
  })
  .catch(error => {
    // TODO snackbar
    // dispatch({
    //   type: snackbar.SNACKBAR_ADD,
    //   payload: {
    //     message: "Unable to submit check in"
    //   }
    // });
  })
}