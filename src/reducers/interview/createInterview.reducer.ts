import { ICreateInterviewComponentState } from '.';
import { createInterviewTypes } from '../../actions/createInterview/createInterview.actions';

const initialState: ICreateInterviewComponentState = {
  allCohorts: undefined,
  selectedCohort: undefined,
  associatesInSelectedCohort: undefined,
  selectedAssociate: undefined,
  date: '',
  location: '',
  client: '',
  clientArr: []
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
