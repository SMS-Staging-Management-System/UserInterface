import { IInterviewFeedbackComponentState } from '.';
// import { InterviewFormat } from '../../model/Interview.format.model';
import { interviewFeedbackTypes } from '../../actions/interviewFeedback/interviewFeedback.actions';

const initialState: IInterviewFeedbackComponentState = {
  feedbackRequestedDate: '',
  feedbackText: '',
  feedbackReceivedDate: '',
  feedbackDeliveredDate: '',
  feedbackStatus: 0,
  interviewFormat: 0,
  interviewStatus: 0,
  noInterviewFound: true,
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