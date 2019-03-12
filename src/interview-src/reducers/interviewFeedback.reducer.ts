import { IInterviewFeedbackComponentState } from '.';
import { interviewFeedbackTypes } from '../actions/interviewFeedback/interviewFeedback.actions';

const initialState: IInterviewFeedbackComponentState = {
}

// export interface IReduxAction {
//     type: string;
//     payload: any;
// }

export const interviewFeedbackReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case interviewFeedbackTypes.SET_INTERVIEW_FEEDBACK_COMPONENT_STATE:
      return {
        ...state,
        ...action.payload
      }
    default: return state;
  }
}
