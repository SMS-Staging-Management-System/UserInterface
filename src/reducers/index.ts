import { combineReducers } from 'redux';
import { IManagementState, managementState } from './management';
import { IInterviewState, interviewState } from './interview';
import { ISurveyState, surveyState } from './survey';
import { IDashboardState, dashboardState } from './dashboard';
import {SurveyFuncState} from './survey/SurveyFunc.reducer'

export interface IState {
    managementState: IManagementState,
    interviewState: IInterviewState,
    surveyState: ISurveyState,
    dashboardState: IDashboardState
}

export const state = combineReducers<IState>({
    managementState,
    // tslint:disable-next-line: object-literal-sort-keys
    interviewState,
    surveyState,
    dashboardState,
})