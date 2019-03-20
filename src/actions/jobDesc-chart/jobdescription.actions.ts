import { interviewClient } from "../../axios/sms-clients/interview-client";

export const jobDescriptionChartTypes = {
    GET_INFO :'GET_INFO',
    SET_CANVAS :'SET_CANVAS',
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
         payload : {             
			 chartInfo : resp.data,
			 canvas: chartRef
         },
         type: jobDescriptionChartTypes.GET_INFO
    })
}