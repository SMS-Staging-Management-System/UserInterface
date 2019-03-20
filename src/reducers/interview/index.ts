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

export interface IReportFormState {
    
}

export interface IManagerChartState {
    data: {
        datasets: [{
            data: number[],
    
        backgroundColor: [
            string,
            string
        ],
        borderColor: [
            string,
            string
        ],
        
        }],
    
        labels: [
          string,
          string
        ],

    },
	canvas: any
}

export interface IInterviewFeedbackComponentState {
    feedbackRequestedDate: string
    feedbackText: string
    feedbackReceivedDate: string
    feedbackDeliveredDate: string
    interviewFormat: InterviewFormat
}

export interface IAssociateChartState {
    data: {
        datasets: [{
            data: number[],
    
        backgroundColor: [
            string,
            string
        ],
        borderColor: [
            string,
            string
        ],
        
        }],
    
        labels: [
          string,
          string
        ],

    },
	canvas: any
}


export interface IFeedbackRequestedChartState {
    data: {
        datasets: [{
            data: number[],
    
        backgroundColor: [
            string,
            string
        ],
        borderColor: [
            string,
            string
        ],
        
        }],
    
        labels: [
          string,
          string
        ],

    },
	canvas: any
}


export interface IFeedbackDeliveredChartState {
    data: {
        datasets: [{
            data: number[],
    
        backgroundColor: [
            string,
            string
        ],
        borderColor: [
            string,
            string
        ],
        
        }],
    
        labels: [
          string,
          string
        ],

    },
	canvas: any
}

export interface IJobDescriptionChartState {
    data: {
        datasets: [{
            data: number[],
    
        backgroundColor: [
            string,
            string
        ],
        borderColor: [
            string,
            string
        ],
        
        }],
    
        labels: [
          string,
          string
        ],

    },
	canvas: any
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
    managerChart: IManagerChartState,
    associateChart: IAssociateChartState,
    associateInput: IAssociateInput,
    feedbackRequestedChart: IFeedbackRequestedChartState,
    feedbackDeliveredChart: IFeedbackDeliveredChartState,
	jobDescriptionChart: IJobDescriptionChartState
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
   jobDescriptionChart: jobDescriptionChartReducer
})