import { combineReducers } from 'redux';
import { IManagementState, managementState } from './management';
import { IInterviewState, interviewState } from './interview';
import { ISurveyState, surveyState } from './survey';


export interface IState {
    managementState: IManagementState,
    interviewState: IInterviewState,
<<<<<<< HEAD
    surveyState: ISurveyState,

=======
    surveyState: ISurveyState
>>>>>>> be512af81b57dc0c0307296a81624dd642b5a07e
}

export const state = combineReducers<IState>({
    managementState,
    interviewState,
    surveyState
})