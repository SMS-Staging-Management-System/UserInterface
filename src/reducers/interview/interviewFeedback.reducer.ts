import { IInterviewFeedbackComponentState } from '.';
<<<<<<< HEAD
// import { InterviewFormat } from '../../model/Interview.format.model';
=======
import { InterviewFormat } from '../../model/Interview.format.model';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
import { interviewFeedbackTypes } from '../../actions/interviewFeedback/interviewFeedback.actions';

const initialState: IInterviewFeedbackComponentState = {
  feedbackRequestedDate: '',
  feedbackText: '',
  feedbackReceivedDate: '',
  feedbackDeliveredDate: '',
<<<<<<< HEAD
  feedbackStatus: 0,
  interviewFormat: 0,
  interviewStatus: 0,
=======
  interviewFormat: InterviewFormat.none,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
