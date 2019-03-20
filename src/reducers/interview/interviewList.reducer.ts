import { IInterviewListState } from ".";
import { interviewListTypes } from "../../actions/interviewList/interviewList.actions";

const initialState : IInterviewListState = {
    listOfInterviews : [],
    numberOfPages : 0
}

export const interviewListReducer = (state = initialState, action : any): IInterviewListState => {
    switch (action.type) {
        case interviewListTypes.GET_PAGES:
            return {
                ...state,
                ...action.payload
            }
        case interviewListTypes.GET_NUMBER_OF_PAGES:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}