import { interviewClient } from "../../axios/sms-clients/interview-client";

export const interviewCountTypes = {
  SET_INTERVIEWCOUNT_CHARTDATA: 'SET_INTERVIEWCOUNT_CHARTDATA',
}

export const getInterviewCountData = () => async dispatch => {
  try {
    const response = await interviewClient.interviewPerAssocStats();
    dispatch({
      type: interviewCountTypes.SET_INTERVIEWCOUNT_CHARTDATA,
      payload: response.data
    })
  } catch (error) {
    console.log(error)
  }
}