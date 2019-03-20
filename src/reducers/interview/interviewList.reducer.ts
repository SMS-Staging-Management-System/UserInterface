import { IInterviewListState } from ".";
import { interviewListTypes } from "../../actions/interviewList/interviewList.actions";

const initialState : IInterviewListState = {
    numberOfPages : 0,
    listOfInterviews : [],
    orderBy : 'id',
    direction : 'ASC',
    pageSize : 5,
    currentPage : 0,
    assocInput: undefined,
}

export const interviewListReducer = (state = initialState, action : any): IInterviewListState => {
    switch (action.type) {
        case interviewListTypes.GET_PAGES :
            return {
                ...state,
                ...action.payload
            }

        case interviewListTypes.SET_SELECTED :
            return {
                ...state,
                assocInput: { ...action.payload }
            };
            
        default:
            return state
    }
}