import { interviewClient } from "../../axios/sms-clients/interview-client";

export const managerChartTypes = {
    SET_MANAGER_NOTICE_DATA: 'SET_MANAGER_NOTICE_DATA'
}

export const setNoticeDataManager = () => async dispatch => {
    const response = await interviewClient.fetchManager24()
    const { data } = response
    dispatch({
        type: managerChartTypes.SET_MANAGER_NOTICE_DATA,
        payload: [data[0] - data[1], data[1]]
    })
}
