import { combineReducers } from 'redux';
import { interviewListReducer } from './interviewList.reducer';
import { reportFormReducer } from './reportform.reducer';
import { createInterviewReducer } from './createInterview.reducer';
import { interviewFeedbackReducer } from './interviewFeedback.reducer';
import { InterviewFormat } from '../../model/Interview.format.model';
import { managerChartReducer } from './managerchart.reducer';
import { associateChartReducer } from './associatechart.reducer';
import { assocInputReducer } from './assoc-input.reducer';
import { IAssociateInput } from '../../model/Associateinput.model';
import { feedbackDeliveredChartReducer } from './feedbackdelivered';
import { feedbackRequestedChartReducer } from './feedbackrequested';
import { jobDescriptionChartReducer } from './jobdesc.reducer';
import { Client } from '../../model/Client.model';
import { Interview } from '../../model/Interview.model';
import { totalWeeklyReducer } from './total-weekly.reducer';

export interface IReportFormState {
    
}

export interface IManagerChartState {
    managerNoticeData: number[]
}

export interface IInterviewFeedbackComponentState {
    feedbackRequestedDate: string
    feedbackText: string
    feedbackReceivedDate: string
    feedbackDeliveredDate: string
    interviewFormat: InterviewFormat
    noInterviewFound: boolean
}

export interface IAssociateChartState {
    assocNoticeData: number[]
}

export interface IFeedbackRequestedChartState {
    data: {
        datasets: [{
            data: number[],    
            backgroundColor: [ string, string ],
            borderColor: [ string, string ],
        }],
        labels: [ string, string ],
    },
    options: {
        legend: {labels:{}},
        pointLabels: {}
    },
    canvas: any
}

export interface IFeedbackDeliveredChartState {
    data: {
        datasets: [{
            data: number[],    
            backgroundColor: [ string, string ],
            borderColor: [ string, string ],
        }],
        labels: [ string, string ],
    },
    options: {
        legend: {labels:{}},
        pointLabels: {}
    },
	canvas: any
}

export interface IJobDescriptionChartState {
    JDdata: number[]
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

export interface ITotalWeeklyState {
    interviewList: Interview[];
    totalScheduled: number;
    totalNotified: number;
    totalReviewed: number;
}
    
export interface IInterviewState {
    interviewList : IInterviewListState,
    reportForm : IReportFormState,
    createInterviewComponentState: ICreateInterviewComponentState,
    interviewFeedbackComponentState: IInterviewFeedbackComponentState,
    managerChart: IManagerChartState,
    associateChart: IAssociateChartState,
    associateInput: IAssociateInput,
    feedbackRequestedChart: IFeedbackRequestedChartState,
    feedbackDeliveredChart: IFeedbackDeliveredChartState,
    jobDescriptionChart: IJobDescriptionChartState,
    totalWeekly: ITotalWeeklyState
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
   feedbackDeliveredChart: feedbackDeliveredChartReducer,
   jobDescriptionChart: jobDescriptionChartReducer,
   totalWeekly: totalWeeklyReducer
})