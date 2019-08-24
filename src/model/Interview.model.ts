import { InterviewFeedback } from "./Interview.feedback";
import { IAssociateInput } from "./Associateinput.model";
import { IClient } from "./Client.model";

export interface Interview {
  interviewId: number;
  managerId: number;
  associateId: number;
  scheduled: Date;
  notified: Date;
  reviewed: Date;
  place: string;
  feedback : InterviewFeedback;
  associateInput : IAssociateInput;
  client: IClient;
}
