import { interviewClient } from "../../axios/sms-clients/interview-client";

export const interviewListTypes = {
    GET_PAGES :'GET_PAGES'
}

export const getInterviewPages = (
  pageNumber? : number, 
  pageSize? : number,
  orderBy?: string, 
  direction? : string) => async (dispatch) => {
    const resp = await interviewClient.fetchPage(pageNumber, pageSize, orderBy, direction)
    dispatch({
        payload : {
            listOfInterviews : resp.data.content,
            numberOfPages : resp.data.totalPages,
            currentPage : pageNumber,
            pageSize : pageSize,
            orderBy : orderBy,
            direction : direction
        },
        type: interviewListTypes.GET_PAGES
    })
}