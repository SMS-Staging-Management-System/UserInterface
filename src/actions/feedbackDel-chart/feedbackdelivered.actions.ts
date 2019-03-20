import { interviewClient } from "../../axios/sms-clients/interview-client";

export const feedbackDeliveredChartTypes = {
  GET_INFO: 'GET_INFO',
  SET_CANVAS: 'SET_CANVAS',
}

export const setCanvasManager = (canvasRef) => async (dispatch) => {
  dispatch({
    payload: {
      canvas: canvasRef
    },
    type: feedbackDeliveredChartTypes.SET_CANVAS
  })
}

export const getInfoManager = (chartRef) => async (dispatch) => {
  const resp = await interviewClient.assocNeedFeedbackChart();

  dispatch({
    payload: {
      chartInfo: resp.data,
      canvas: chartRef
    },
    type: feedbackDeliveredChartTypes.GET_INFO
  })
}