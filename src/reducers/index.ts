import { combineReducers } from 'redux';
import { IManagementState, managementState } from './management';
import { IInterviewState, interviewState } from './interview';
import { ISurveyState, surveyState } from './survey';
<<<<<<< HEAD
import { IDashboardState,dashboardState } from './dashboard';

// import { ISurveyState, surveyState } from './survey';

=======
// import { ISurveyState, surveyState } from './survey';

>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

export interface IState {
    managementState: IManagementState,
    interviewState: IInterviewState,
<<<<<<< HEAD
    surveyState : ISurveyState,
    dashboardState:IDashboardState
=======
    surveyState : ISurveyState
    // surveyState: ISurveyState
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}

export const state = combineReducers<IState>({
    managementState,
    interviewState,
<<<<<<< HEAD
    surveyState,
    dashboardState
=======
    surveyState
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
})