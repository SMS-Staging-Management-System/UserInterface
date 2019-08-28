import { interviewClient } from "../../axios/sms-clients/interview-client";

export const associateChartTypes = {
<<<<<<< HEAD
    SET_ASSOC_NOTICE_DATA: 'SET_ASSOC_NOTICE_DATA'
}

export const setNoticeDataAssoc = () => async dispatch => {
    const response = await interviewClient.fetchAssoc24()
    const { data } = response
    dispatch({
        type: associateChartTypes.SET_ASSOC_NOTICE_DATA,
        payload: [data[0] - data[1], data[1]]
=======
    GET_INFO: 'GET_INFO',
    SET_CANVAS: 'SET_CANVAS',
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

    console.log(resp.data);

    dispatch({
        payload: {
            chartInfo: resp.data,
            canvas: chartRef
        },
        type: associateChartTypes.GET_INFO
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    })
}
