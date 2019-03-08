import { createInterviewTypes } from '../actions/createInterview/createInterview.actions';
import { ICreateInterviewComponentState } from '.';
import { InterviewFormats } from '../model/Interview.format.model';

const initialState: ICreateInterviewComponentState = {
    firstName: '',
    lastName: '',
    date: '',
    location: '',
    format: {
      interviewFormatId: 0,
      formatDesc: InterviewFormats.none
    }
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
