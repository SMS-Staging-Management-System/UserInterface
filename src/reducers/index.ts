import { combineReducers } from 'redux';

import { IManagementState, managementState } from './management';
import { IInterviewState, interviewState } from '../interview-src/reducers';
import { ISurveyState, surveyState } from './survey';




export interface IState {
    managementState: IManagementState,
    interviewState: IInterviewState,
    surveyState: ISurveyState
}

export const state = combineReducers<IState>({
    managementState,
    interviewState,
    surveyState
})