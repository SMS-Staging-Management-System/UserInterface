import { InterviewFeedback } from "./Interview.feedback";
import { IAssociateInput } from "./Associateinput.model";

export interface Interview {
  interviewId:      number,
  managerId: number,
  associateId: number,
  scheduled: Date,
  notified: Date,
  reviewed: Date,
  place: string,
  feedback : InterviewFeedback,
  associateInput : IAssociateInput
}

/*
{
  id: 1,
  managerId: 1,
  associateId: 1001,
  scheduled: 1551373200000,
  notified: 1551380400000,
  reviewed: 1551474000000,
  place: "USF",
  feedback: {
    id: 1,
    feedbackRequested: 1551463200000,
    feedback: "Solid interview.",
    feedbackReceived: 1551553200000,
    status: {
      feedback_status_id: 1,
      feedback_status_desc: "Pending"
    }
  },
  associateInput: {
    id: 1,
    receivedNotifications: 1551380400000,
    descriptionProvided: true,
    interviewFormat: {
      id: 1,
      formatDesc: "On Site"
    },
    proposedFormat: {
      id: 1,
      formatDesc: "On Site"
    }
  }
}
*/