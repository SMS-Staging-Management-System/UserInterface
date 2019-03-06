import { combineReducers } from 'redux';

import { IManagementState, managementState } from '../../reducers/management';
import { IInterviewState, interviewState } from '../../reducers/interview';
import { ISurveyState, surveyState } from '../../reducers/survey';



export interface IReceiptFormState {

}

export interface IState {
    managementState: IManagementState,
    interviewState: IInterviewState,
    surveyState: ISurveyState,
}

export const state = combineReducers<IState>({
    managementState,
    interviewState,
    surveyState,

})
export interface IInterviewListState {
    listOfInterviews : any[]
}

export interface IInterviewState {
    interviewList : IInterviewListState
}
