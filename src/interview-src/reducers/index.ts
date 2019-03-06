import { combineReducers } from 'redux';

import { IInterviewState } from '../../reducers/interview';
import { interviewListReducer } from './interview.reducer';


export interface IReportFormState {

}

export interface IInterviewState {
    listOfInterviews: any[];
}

export const state = combineReducers<IInterviewState>({
   interviewList: interviewListReducer,
})

export interface IInterviewListState {
    listOfInterviews : any[]
}
