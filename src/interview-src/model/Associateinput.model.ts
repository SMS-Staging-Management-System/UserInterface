
import { Interview } from "./Interview.model";
import { InterviewFormat } from "./Interview.format.model"

export interface AssociateInput {
  associateInputId:      number,
  formatDesc: string,
  receivedNotifications: Date,
  descriptionProvided: boolean,
  interview: Interview,
  proposedFormat: InterviewFormat

}