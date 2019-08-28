import { interviewClient } from "../../axios/sms-clients/interview-client";

export const managerChartTypes = {
<<<<<<< HEAD
    SET_MANAGER_NOTICE_DATA: 'SET_MANAGER_NOTICE_DATA'
}

export const setNoticeDataManager = () => async dispatch => {
    const response = await interviewClient.fetchManager24()
    const { data } = response
    dispatch({
        type: managerChartTypes.SET_MANAGER_NOTICE_DATA,
        payload: [data[0] - data[1], data[1]]
=======
    GET_INFO: 'GET_INFO',
    SET_CANVAS: 'SET_CANVAS',
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


    console.log(resp.data);

    dispatch({
        payload: {
            chartInfo: resp.data,
            canvas: chartRef
        },
        type: managerChartTypes.GET_INFO
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    })
}
