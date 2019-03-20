
import { IInterviewFormat } from "./Interview.format.model"

export interface IAssociateInput {
  id?: number;
  dateNotified: Date | undefined;
  // dayNotice: boolean | undefined;
  descriptionProvided: boolean | undefined;
  interviewFormat: IInterviewFormat | undefined;
  proposedFormat: IInterviewFormat | undefined;
}