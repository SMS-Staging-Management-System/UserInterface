import { interviewClient } from "../../axios/sms-clients/interview-client";

export const interviewListTypes = {
    GET_PAGES :'GET_PAGES',
    GET_NUMBER_OF_PAGES : "GET_NUMBER_OF_PAGES",
    SET_ORDER_BY : "SET_OREDR_BY",
    SET_DIRECTION : "SET_DIRECTION",
    SET_CURRENT_PAGE : "SET_CURRENT_PAGE",
    SET_PAGE_SIZE : "SET_PAGE_SIZE"
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

export const setDirection = (direction : string) => (dispatch) => {
    dispatch({
        payload : {
            direction : direction
        },
        type : interviewListTypes.SET_DIRECTION
    });
}

export const setOrderBy = (orderBy : string) => (dispatch) => {
    dispatch({
        payload : {
            orderBy : orderBy
        },
        type : interviewListTypes.SET_ORDER_BY
    });
}

export const setCurrentPage = (currentPage : number) => (dispatch) => {
    dispatch({
        payload : {
            currentPage : currentPage
        },
        type : interviewListTypes.SET_CURRENT_PAGE
    });
}

export const setPageSize = (pageSize : number) => (dispatch) => {
    dispatch({
        payload : {
            pageSize : pageSize
        },
        type : interviewListTypes.SET_PAGE_SIZE
    });
}