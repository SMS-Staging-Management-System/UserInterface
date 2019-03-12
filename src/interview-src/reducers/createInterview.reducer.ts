import { createInterviewTypes } from '../actions/createInterview/createInterview.actions';
import { ICreateInterviewComponentState } from '.';

const initialState: ICreateInterviewComponentState = {
  allCohorts: undefined,
  selectedCohort: undefined,
  associatesInSelectedCohort: undefined,
  selectedAssociate: undefined,
  date: 0,
  location: ''
}

// export interface IReduxAction {
//     type: string;
//     payload: any;
// }

export const createInterviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case createInterviewTypes.SET_CREATE_INTERVIEW_COMPONENT_STATE:
      return {
        ...state,
        ...action.payload
      }
    default: return state;
  }
}
