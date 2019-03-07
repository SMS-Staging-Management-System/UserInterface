import { IInterviewListState } from ".";
import { interviewListTypes } from "../actions/interviewList/interviewList.actions";

const initialState : IInterviewListState = {
    listOfInterviews : []
}

export const interviewListReducer = (state = initialState, action : any): IInterviewListState => {
    switch (action.type) {
        case interviewListTypes.GET_PAGES:
            return {
                ...state,
                listOfInterviews : action.payload.listOfInterviews
            }
        default:
            return state
    }
}