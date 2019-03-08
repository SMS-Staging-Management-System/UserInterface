
export interface Interview {
  interviewId:      number,
  managerId: number,
  associateId: number,
  scheduled: Date,
  notified: Date,
  reviewed: Date,
  place: string,
}