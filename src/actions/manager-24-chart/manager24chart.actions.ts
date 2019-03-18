import { interviewClient } from "../../axios/sms-clients/interview-client";

export const managerChartTypes = {
    GET_INFO :'GET_INFO',
    SET_CANVAS :'SET_CANVAS',
}

export const setCanvasManager = (canvasRef) => async (dispatch) => {
    dispatch({
        payload: {
            canvas: canvasRef
        },
        type: managerChartTypes.SET_CANVAS
    })
}

export const getInfoManager = (chartRef) => async (dispatch) => {
    const resp = await interviewClient.fetchManager24();

    dispatch({
         payload : {             
			 chartInfo : resp.data,
			 canvas: chartRef
         },
         type: managerChartTypes.GET_INFO
    })
}