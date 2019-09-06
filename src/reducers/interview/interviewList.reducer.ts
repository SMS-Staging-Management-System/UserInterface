import { IInterviewListState } from ".";
import { interviewListTypes } from "../../actions/interviewList/interviewList.actions";
import { authTypes } from "../../actions/auth/auth.actions";

const initialState: IInterviewListState = {
    numberOfPages: 0,
    listOfInterviews: [],
    orderBy: 'id',
    direction: 'ASC',
    pageSize: 5,
    currentPage: 0,
    assocInput: undefined,
    dropdowns: []
}

export const interviewListReducer = (state = initialState, action: any): IInterviewListState => {
    switch (action.type) {
        case interviewListTypes.GET_PAGES:
            return {
                ...state,
                ...action.payload
            }

        case interviewListTypes.SET_SELECTED:
            return {
                ...state,
                assocInput: { ...action.payload }
            };

        case interviewListTypes.DROP_DOWN:
            return {
                ...state,
                dropdowns: action.payload.listOfInterviews
            };
            
        case authTypes.LOGOUT:
            return initialState

        default:
            return state
    }
}
