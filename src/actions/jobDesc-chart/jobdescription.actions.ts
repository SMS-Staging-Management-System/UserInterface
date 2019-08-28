import { interviewClient } from "../../axios/sms-clients/interview-client";

export const jobDescriptionChartTypes = {
<<<<<<< HEAD
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
=======
  GET_INFO: 'GET_INFO',
  SET_CANVAS: 'SET_CANVAS',
}

export const setCanvasJD = (canvasRef) => async (dispatch) => {
  dispatch({
    payload: {
      canvas: canvasRef
    },
    type: jobDescriptionChartTypes.SET_CANVAS
  })
}

export const getInfoJD = (chartRef) => async (dispatch) => {
  const resp = await interviewClient.interviewJDChart();

  dispatch({
    payload: {
      chartInfo: resp.data,
      canvas: chartRef
    },
    type: jobDescriptionChartTypes.GET_INFO
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  })
}