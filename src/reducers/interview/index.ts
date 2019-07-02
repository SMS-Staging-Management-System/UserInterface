import { combineReducers } from 'redux';
import { interviewListReducer } from './interviewList.reducer';
import { reportFormReducer } from './reportform.reducer';
import { createInterviewReducer } from './createInterview.reducer';
import { interviewFeedbackReducer } from './interviewFeedback.reducer';
// import { InterviewFormat } from '../../model/Interview.format.model';
import { managerChartReducer } from './managerchart.reducer';
import { associateChartReducer } from './associatechart.reducer';
import { assocInputReducer } from './assoc-input.reducer';
import { IAssociateInput } from '../../model/Associateinput.model';
import { feedbackRequestedChartReducer } from './feedbackrequested';
import { jobDescriptionChartReducer } from './jobdesc.reducer';
import { Client } from '../../model/Client.model';
import { Interview } from '../../model/Interview.model';

// the reportform reducer seems to do nothing. remove later
export interface IReportFormState {   
}

export interface ISimpleChartDataState {
    chartData: number[]
}

export interface IInterviewFeedbackComponentState {
    feedbackRequestedDate: string
    feedbackText: string
    feedbackReceivedDate: string
    feedbackDeliveredDate: string
    interviewFormat: number
    noInterviewFound: boolean
    interviewStatus: number
}

export interface ICreateInterviewComponentState {
    allCohorts: any[] | undefined,
    selectedCohort: any | undefined,
    associatesInSelectedCohort: any[] | undefined,
    selectedAssociate: any | undefined,
    date: string,
    location: string,
    client: string,
    clientArr: Client[]
}

export interface IInterviewListState {
    listOfInterviews : Interview[],
    numberOfPages : number,
    orderBy : string,
    direction : string,
    pageSize : number,
    currentPage : number,
    assocInput: any
}
    
export interface IInterviewState {
    interviewList : IInterviewListState,
    reportForm : IReportFormState,
    createInterviewComponentState: ICreateInterviewComponentState,
    interviewFeedbackComponentState: IInterviewFeedbackComponentState,
    managerChart: ISimpleChartDataState,
    associateChart: ISimpleChartDataState,
    associateInput: IAssociateInput,
    feedbackRequestedChart: ISimpleChartDataState,
	jobDescriptionChart: ISimpleChartDataState,
}

export const interviewState = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
   reportForm: reportFormReducer,
   createInterviewComponentState: createInterviewReducer,
   interviewFeedbackComponentState: interviewFeedbackReducer,
   managerChart: managerChartReducer,
   associateChart: associateChartReducer,
   associateInput: assocInputReducer,
   feedbackRequestedChart: feedbackRequestedChartReducer,
   jobDescriptionChart: jobDescriptionChartReducer
})