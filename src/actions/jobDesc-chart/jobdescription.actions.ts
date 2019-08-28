import { interviewClient } from "../../axios/sms-clients/interview-client";

export const jobDescriptionChartTypes = {
  SET_JD_CHART_INFO: 'SET_JD_CHART_INFO',
}

export const setInfoJD = () => async (dispatch) => {
  const response = await interviewClient.interviewJDChart()
  const jdProvided = response.data.reduce((prev:number, curr:any) => (
    curr.jd? prev + 1: prev
  ), 0)
  // jdProveded is the number of interviews for which a job description was provided
  // response.data.length is the total number of interviews
  dispatch({
    type: jobDescriptionChartTypes.SET_JD_CHART_INFO,
    payload: [response.data.length - jdProvided, jdProvided]
  })
}