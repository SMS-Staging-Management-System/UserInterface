import { combineReducers } from 'redux';
import { interviewListReducer } from './interviewList.reducer';
<<<<<<< HEAD
import { reportFormReducer } from './reportform.reducer';
=======

>>>>>>> ce4e66e1e2751fa9ba2fc91ba6d7b34dff3a9e1d

export interface IReportFormState {

}

export interface IInterviewListState {
    listOfInterviews : any[],
    numberOfPages : number
}
    
export interface IInterviewState {
    interviewList : IInterviewListState,
    reportForm : IReportFormState
}

export const interviewState = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
   reportForm: reportFormReducer
})
