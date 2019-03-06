import { combineReducers } from "redux";
import { createInterviewReducer } from "../../interview-src/reducers/createInterview.reducer";
import { InterviewFormat } from "../../interview-src/model/interviewFormat.model";

export interface ICreateInterviewComponentState {
  firstName: string,
  lastName: string,
  date: string,
  location: string,
  format: InterviewFormat,
}

export interface IInterviewState {
  createInterviewComponentState: ICreateInterviewComponentState
}

export const interviewState = combineReducers<IInterviewState>({
  createInterviewComponentState: createInterviewReducer
})