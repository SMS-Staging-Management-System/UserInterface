import { interviewClient } from "../../axios/sms-clients/interview-client";

export const feedbackRequestedChartTypes = {
  SET_ASSOC_FEEDBACK_CHART_INFO: 'SET_ASSOC_FEETBACK_CHART_INFO'
}

export const setInfoAssoc = () => async dispatch => {
  try {
    const response = await interviewClient.assocNeedFeedbackChart();
    // notes coppied from server:
    // [0] is the total number of interviews
    // [1] is the number of interviews with no feedback requested
    // [2] is the number of interviews with feedback requested
    // [3] is the number of interviews that received feedback that hasn't been delivered to associate
    // [4] is the number of interviews that received feedback that has been delivered to associate
    const { data } = response
    let toDispatch = [data[1], data[3], data[4]]
    dispatch({
      type: feedbackRequestedChartTypes.SET_ASSOC_FEEDBACK_CHART_INFO,
      payload: toDispatch
    })
  } catch (error) {
    console.log(error)
  }
}