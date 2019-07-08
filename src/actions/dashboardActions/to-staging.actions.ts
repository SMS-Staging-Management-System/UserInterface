import { cohortClient } from "../../axios/sms-clients/cohort-client";


export const TO_STAGING_TYPES = {
  SET_COHORT_LIST: 'T.S.T_SET_COHORT_LIST'
}

export const getCohorts = (date: number | Date) => async (dispatch) => {
  try {
    let response = await cohortClient.getEndingCohorts(date);
    if (response.status === 200) {
      dispatch({
        type: TO_STAGING_TYPES.SET_COHORT_LIST,
        payload: response.data
      });
    }
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}