import { statusClient } from "../../axios/sms-clients/status-client";


export const statusTypes = {
  UPDATE_USER_STATUSES: 'UPDATE_USER_STATUSES'
}

export const updateStatuses = () => async (dispatch) => {
    try {    
    let res = await statusClient.findAllStatuses();
    
      dispatch({
        payload: {
          statuses: res.data
        },
        type: statusTypes.UPDATE_USER_STATUSES
      })
    } catch (e){

    }
}
