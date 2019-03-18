
import { Interview } from "./Interview.model";
import { FeedbackStatus } from "./Feedbackstatus.model"

export interface InterviewFeedback {
  interviewFeedbackId:      number,
  feedbackRequested:     Date,
  feedback:  string,
  feedbackReceived:   Date,
  feedbackDelivered: Date,
  status: FeedbackStatus,
  interview: Interview
}