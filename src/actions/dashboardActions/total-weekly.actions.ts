import { interviewClient } from "../../axios/sms-clients/interview-client";
import { IInterview } from "../../model/IInterview";

export const TOTAL_WEEKLY_TYPES = {
  SET_INTERVIEW_LIST: 'T.W.T_SET_INTERVIEW_LIST'
}

export const getInterviews = (date: number | Date) => async (dispatch) => {
  try {
    let response = await interviewClient.getCalendarWeek(date);
    if (response.status === 200) {
      let interviewList: IInterview[] = response.data;
      let totalScheduled = 0;
      let totalNotified = 0;
      let totalReviewed = 0;
      for (let interview of interviewList) {
        if (interview.scheduled !== null) totalScheduled++;
        if (interview.notified !== null) totalNotified++;
        if (interview.reviewed !== null) totalReviewed++;
      }
      let payload = {
        interviewList,
        totalScheduled,
        totalNotified,
        totalReviewed
      }
      dispatch({
        type: TOTAL_WEEKLY_TYPES.SET_INTERVIEW_LIST,
        payload
      });
    }
  } catch(err) {
    console.log('Retrieval of calendar week interviews failed');
  }
}