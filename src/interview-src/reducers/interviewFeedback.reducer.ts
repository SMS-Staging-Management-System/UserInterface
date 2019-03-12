import { IInterviewFeedbackComponentState } from '.';
import { interviewFeedbackTypes } from '../actions/interviewFeedback/interviewFeedback.actions';
import { InterviewFormat } from '../model/Interview.format.model';

const initialState: IInterviewFeedbackComponentState = {
  feedbackRequestedDate: '',
  feedbackText: '',
  feedbackReceivedDate: '',
  feedbackDeliveredDate: '',
  interviewFormat: InterviewFormat.none
}

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
