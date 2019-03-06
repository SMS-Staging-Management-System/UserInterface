import { ICreateInterviewComponentState } from '../../reducers/interview';
import { createInterviewTypes } from '../actions/createInterview.actions';

const initialState: ICreateInterviewComponentState = {
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
        createInterviewComponentState: action.payload
      }
    default: return state;
  }
}
