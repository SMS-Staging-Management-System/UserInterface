import { IInterviewFeedbackComponentState } from "../../reducers/interview";


export const interviewFeedbackTypes = {
  SET_INTERVIEW_FEEDBACK_COMPONENT_STATE: 'SET_INTERVIEW_FEEDBACK_COMPONENT_STATE'
}

export const setState = (newInterviewFeedbackComponentState: IInterviewFeedbackComponentState) => (dispatch) => {    
    dispatch({
        type: interviewFeedbackTypes.SET_INTERVIEW_FEEDBACK_COMPONENT_STATE,
        payload:  newInterviewFeedbackComponentState
    });
}