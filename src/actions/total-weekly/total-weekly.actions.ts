import { interviewClient } from "../../axios/sms-clients/interview-client";

export const TOTAL_WEEKLY_TYPES = {
  SET_INTERVIEW_LIST: 'T.W.T_SET_INTERVIEW_LIST'
}

export const getInterviews = (date: number | Date) => async (dispatch) => {
  try {
    let response = await interviewClient.getCalendarWeek(date);
    if (response.status === 200) {
      dispatch({
        type: TOTAL_WEEKLY_TYPES.SET_INTERVIEW_LIST,
        payload: response.data
      });
    }
  } catch(err) {
    console.log('Retrieval of calendar week interviews failed');
  }
}