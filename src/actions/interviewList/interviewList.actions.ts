import { interviewClient } from "../../axios/sms-clients/interview-client";

export const interviewListTypes = {
    GET_PAGES: 'GET_PAGES',
    SET_SELECTED: 'SET_SELECTED'
}

export const getInterviewPages = (
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string,
    direction?: string,
    associateEmail?: string,
    managerEmail?: string,
    place?: string,
    clientName?: string,
    staging?: string) => async (dispatch) => {
        const resp = await interviewClient.fetchPage(pageNumber, pageSize, orderBy, direction,
            associateEmail, managerEmail, place, clientName, staging)
        dispatch({
            payload: {
                listOfInterviews: resp.data.content,
                numberOfPages: resp.data.totalPages,
                currentPage: pageNumber,
                pageSize: pageSize,
                orderBy: orderBy,
                direction: direction
            },
            type: interviewListTypes.GET_PAGES
        })
    }

export const markAsReviewed = (id: number) => (dispatch) => {
    interviewClient.markInterviewAsReviewed(id);
}

export const setSelected = (current: any) => {
    console.log(current);
    return {
        type: interviewListTypes.SET_SELECTED,
        payload: current
    };
};
