import { combineReducers } from "redux";
import { interviewListReducer } from "./interviewList.reducer";

export interface IInterviewListState {
    listOfInterviews : any[],
    numberOfPages : number
}

export interface IInterviewState {
    interviewList : IInterviewListState
}

export const interviewState = combineReducers<IInterviewState> ({
    interviewList : interviewListReducer
})
