import { interviewClient } from "../../axios/sms-clients/interview-client";

export const associateChartTypes = {
    GET_INFO :'GET_INFO',
    SET_CANVAS :'SET_CANVAS',
}

export const setCanvasAssociate = (canvasRef) => async (dispatch) => {
    dispatch({
        payload: {
            canvas: canvasRef
        },
        type: associateChartTypes.SET_CANVAS
    })
}

export const getInfoAssociate = (chartRef) => async (dispatch) => {
    const resp = await interviewClient.fetchAssoc24();

    dispatch({
         payload : {
             chartInfo : resp.data,
			 canvas: chartRef
         },
         type: associateChartTypes.GET_INFO
    })
}