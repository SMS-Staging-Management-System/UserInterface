import { ICreateInterviewComponentState } from '../../reducers/interview';
import { createInterviewTypes } from '../actions/createInterview.actions';
import { InterviewFormat } from '../model/interviewFormat.model';

const initialState: ICreateInterviewComponentState = {
    firstName: '',
    lastName: '',
    date: '',
    location: '',
    format: InterviewFormat.none,
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
