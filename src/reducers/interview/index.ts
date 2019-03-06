import { combineReducers } from "redux";
import { createInterviewReducer } from "../../interview-src/reducers/createInterview.reducer";

export interface ICreateInterviewComponentState {
    
}

export interface IInterviewState {
  createInterviewComponentState: ICreateInterviewComponentState
}

export const interviewState = combineReducers<IInterviewState>({
  createInterviewComponentReducer: createInterviewReducer
})