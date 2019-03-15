import { interviewClient } from "../../axios/sms-clients/interview-client";

export const managerChartTypes = {
    GET_INFO :'GET_INFO',
}


export const getInfoManager = (chartRef) => async (dispatch) => {
    const resp = await interviewClient.fetchManager24();


    console.log(resp.data);
    
    dispatch({
         payload : {
             chartInfo : resp.data
         },
         type: managerChartTypes.GET_INFO
     })
}
