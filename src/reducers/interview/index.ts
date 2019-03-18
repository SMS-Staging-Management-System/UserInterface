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


export interface ICreateInterviewComponentState {
    allCohorts: any[] | undefined,
    selectedCohort: any | undefined,
    associatesInSelectedCohort: any[] | undefined,
    selectedAssociate: any | undefined,
    date: string,
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
    managerChart: IManagerChartState,
    associateChart: IAssociateChartState,
    associateInput: IAssociateInput
}

export const interviewState = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
   reportForm: reportFormReducer,
   createInterviewComponentState: createInterviewReducer,
   interviewFeedbackComponentState: interviewFeedbackReducer,
   managerChart: managerChartReducer,
   associateChart: associateChartReducer,
   associateInput: assocInputReducer
})
