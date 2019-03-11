import { interviewClient } from "../../../axios/sms-clients/interview-client";

export const interviewListTypes = {
    GET_PAGES :'GET_PAGES',
    GET_NUMBER_OF_PAGES : "GET_NUMBER_OF_PAGES"
}

export const getInterviewPages = (
  pageNumber? : number, 
  pageSize? : number,
  orderBy?: string, 
  direction? : string) => async (dispatch) => {
    const resp = await interviewClient.fetchPage(pageNumber, pageSize, orderBy, direction)

    dispatch({
        payload : {
            listOfInterviews : resp.data.content
        },
        type: interviewListTypes.GET_PAGES
    })
}

export const getNumberOfPages = (pageSize = 5) => async (dispatch) => {
    const resp = await interviewClient.fetchPage(0, pageSize);

    dispatch({
         payload : {
             numberOfPages : resp.data.totalPages
         },
         type: interviewListTypes.GET_NUMBER_OF_PAGES
     })
}