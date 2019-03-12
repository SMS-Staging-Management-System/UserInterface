import { combineReducers } from 'redux';
import { interviewListReducer } from './interviewList.reducer';
import { reportFormReducer } from './reportform.reducer';
import { InterviewFormat } from '../model/Interview.format.model';
import { createInterviewReducer } from './createInterview.reducer';
import { assocInputReducer } from '../reducers/assoc-input.reducer';
import { IAssociateInput } from '../model/Associateinput.model';

export interface IReportFormState {
    
}

export interface ICreateInterviewComponentState {
    firstName: string,
    lastName: string,
    date: string,
    location: string,
    format: InterviewFormat,
  }

export interface IInterviewListState {
    listOfInterviews : any[],
    numberOfPages : number
}
    
export interface IInterviewState {
    interviewList : IInterviewListState,
    reportForm : IReportFormState,
    createInterviewComponentState: ICreateInterviewComponentState,
    associateInput: IAssociateInput
}

export const interviewState = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
   reportForm: reportFormReducer,
   createInterviewComponentState: createInterviewReducer,
   associateInput: assocInputReducer
});
