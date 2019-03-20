import { interviewClient } from "../../axios/sms-clients/interview-client";

export const feedbackRequestedChartTypes = {
  GET_INFO: 'GET_INFO',
  SET_CANVAS: 'SET_CANVAS',
}

export const setCanvasAssociate = (canvasRef) => async (dispatch) => {
  dispatch({
    payload: {
      canvas: canvasRef
    },
    type: feedbackRequestedChartTypes.SET_CANVAS
  })
}

export const getInfoAssociate = (chartRef) => async (dispatch) => {
  const resp = await interviewClient.assocNeedFeedbackChart();

  dispatch({
    payload: {
      chartInfo: resp.data,
      canvas: chartRef
    },
    type: feedbackRequestedChartTypes.GET_INFO
  })
} 