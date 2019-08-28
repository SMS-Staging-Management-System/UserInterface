import { combineReducers } from 'redux';
import { interviewListReducer } from './interviewList.reducer';
import { reportFormReducer } from './reportform.reducer';
import { createInterviewReducer } from './createInterview.reducer';
import { interviewFeedbackReducer } from './interviewFeedback.reducer';
<<<<<<< HEAD
// import { InterviewFormat } from '../../model/Interview.format.model';
=======
import { InterviewFormat } from '../../model/Interview.format.model';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
import { managerChartReducer } from './managerchart.reducer';
import { associateChartReducer } from './associatechart.reducer';
import { assocInputReducer } from './assoc-input.reducer';
import { IAssociateInput } from '../../model/Associateinput.model';
<<<<<<< HEAD
=======
import { feedbackDeliveredChartReducer } from './feedbackdelivered';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
import { feedbackRequestedChartReducer } from './feedbackrequested';
import { jobDescriptionChartReducer } from './jobdesc.reducer';
import { Client } from '../../model/Client.model';
import { Interview } from '../../model/Interview.model';
<<<<<<< HEAD
import { interviewsCountReducer } from './interviewscount.reducer';

// the reportform reducer seems to do nothing. remove later
export interface IReportFormState {   
}

export interface ISimpleChartDataState {
    chartData: number[]
}

export interface IAveragedChartDataState extends ISimpleChartDataState {
    totalNumber: number
=======

export interface IReportFormState {
    
}

export interface IManagerChartState {
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
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}

export interface IInterviewFeedbackComponentState {
    feedbackRequestedDate: string
    feedbackText: string
    feedbackReceivedDate: string
    feedbackDeliveredDate: string
<<<<<<< HEAD
    feedbackStatus: number
    interviewFormat: number
    noInterviewFound: boolean
    interviewStatus: number
=======
    interviewFormat: InterviewFormat
    noInterviewFound: boolean
}

export interface IAssociateChartState {
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
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
<<<<<<< HEAD
    managerChart: ISimpleChartDataState,
    associateChart: ISimpleChartDataState,
    associateInput: IAssociateInput,
    feedbackRequestedChart: ISimpleChartDataState,
    jobDescriptionChart: ISimpleChartDataState,
    interviewsCountChart: IAveragedChartDataState,
=======
    managerChart: IManagerChartState,
    associateChart: IAssociateChartState,
    associateInput: IAssociateInput,
    feedbackRequestedChart: IFeedbackRequestedChartState,
    feedbackDeliveredChart: IFeedbackDeliveredChartState,
	jobDescriptionChart: IJobDescriptionChartState
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
<<<<<<< HEAD
   jobDescriptionChart: jobDescriptionChartReducer,
   interviewsCountChart: interviewsCountReducer,
=======
   feedbackDeliveredChart: feedbackDeliveredChartReducer,
   jobDescriptionChart: jobDescriptionChartReducer
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
})