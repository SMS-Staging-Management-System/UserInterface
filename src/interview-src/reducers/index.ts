import { combineReducers } from 'redux';
import { IInterviewState } from '../../reducers/interview';
import { interviewListReducer } from './interview.reducer';


export interface IReportFormState {

}

export interface IInterviewListState {
    listOfInterviews : any[],
    numberOfPages : number
}

export interface IInterviewListState {
    listOfInterviews : any[]
}

export const state = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
})
