import { interviewClient } from "../../axios/sms-clients/interview-client";

export const associateChartTypes = {
    SET_ASSOC_NOTICE_DATA: 'SET_ASSOC_NOTICE_DATA'
}

export const setNoticeDataAssoc = () => async dispatch => {
    const response = await interviewClient.fetchAssoc24()
    const { data } = response
    dispatch({
        type: associateChartTypes.SET_ASSOC_NOTICE_DATA,
        payload: [data[0] - data[1], data[1]]
    })
}
