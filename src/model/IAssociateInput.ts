/** @prettier */
import { IInterviewFormat } from './IInterviewFormat';

export interface IAssociateInput {
  id?: number;
  dateNotified?: Date;
  descriptionProvided?: boolean;
  interviewFormat?: IInterviewFormat;
  proposedFormat?: IInterviewFormat;
}
