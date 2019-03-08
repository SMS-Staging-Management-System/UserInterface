import { InterviewFormat } from "./Interview.format.model"

export interface IAssociateInput {
  id?: number;
  dateNotified: Date;
  dayNotice: boolean;
  descriptionProvided: boolean;
  interviewFormat: InterviewFormat | undefined;
  proposedFormat: InterviewFormat | undefined;
}