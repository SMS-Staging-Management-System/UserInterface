/** @prettier */
import { IInterview } from './IInterview';
import { IFeedbackStatus } from './IFeedbackStatus';

export interface IInterviewFeedback {
  interviewFeedbackId: number;
  feedbackRequested: Date;
  feedback: string;
  feedbackReceived: Date;
  feedbackDelivered: Date;
  status: IFeedbackStatus;
  interview: IInterview;
}
