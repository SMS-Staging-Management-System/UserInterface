import { combineReducers } from 'redux';
import { interviewListReducer } from './interviewList.reducer';
import { reportFormReducer } from './reportform.reducer';
import { createInterviewReducer } from './createInterview.reducer';
import { managerChartReducer } from './managerchart.reducer';
import { associateChartReducer } from './associatechart.reducer';
import { assocInputReducer } from '../reducers/assoc-input.reducer';
import { IAssociateInput } from '../model/Associateinput.model';

export interface IReportFormState {
    
}

export interface IManagerChartState {
    type: string,
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
    chartInfo:[number, number]
}

export interface IAssociateChartState {
    type: string,
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
    chartInfo:[number, number]
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
    managerChart: IManagerChartState,
    associateChart: IAssociateChartState,
}

export const interviewState = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
   reportForm: reportFormReducer,
   createInterviewComponentState: createInterviewReducer,
   managerChart: managerChartReducer,
   associateChart: associateChartReducer,
})
