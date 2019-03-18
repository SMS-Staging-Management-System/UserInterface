import { interviewClient } from "../../axios/sms-clients/interview-client";

export const associateChartTypes = {
    GET_INFO :'GET_INFO',
}


export const getInfoAssociate = () => async (dispatch) => {
    const resp = await interviewClient.fetchAssoc24();

    console.log(resp.data);

    dispatch({
         payload : {
             chartInfo : resp.data
         },
         type: associateChartTypes.GET_INFO
     })
}
