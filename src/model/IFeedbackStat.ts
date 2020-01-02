/** @prettier */
export interface IFeedbackStat {
  id: number;
  managerEmail: string;
  associateEmail: string;
  feedbackRequested: number | Date;
  feedbackRecieved: number | Date | null;
  feedbackDelivered: number | Date | null;
  managerName: string;
  associateName: string;
}
