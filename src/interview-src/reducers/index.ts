import { combineReducers } from 'redux';
import { interviewListReducer } from './interviewList.reducer';
import { reportFormReducer } from './reportform.reducer';
import { createInterviewReducer } from './createInterview.reducer';
import { interviewFeedbackReducer } from './interviewFeedback.reducer';
import { InterviewFormat } from '../model/Interview.format.model';

export interface IReportFormState {

}

export interface IInterviewFeedbackComponentState {
    feedbackRequestedDate: string
    feedbackText: string
    feedbackReceivedDate: string
    feedbackDeliveredDate: string
    interviewFormat: InterviewFormat
}

export interface ICreateInterviewComponentState {
    allCohorts: any[] | undefined,
    selectedCohort: any | undefined,
    associatesInSelectedCohort: any[] | undefined,
    selectedAssociate: any | undefined,
    date: number,
    location: string,
}

export interface IInterviewListState {
    listOfInterviews : any[],
    numberOfPages : number
}
    
export interface IInterviewState {
    interviewList : IInterviewListState,
    reportForm : IReportFormState,
    createInterviewComponentState: ICreateInterviewComponentState,
    interviewFeedbackComponentState: IInterviewFeedbackComponentState,
}

export const interviewState = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
   reportForm: reportFormReducer,
   createInterviewComponentState: createInterviewReducer,
   interviewFeedbackComponentState: interviewFeedbackReducer
})
