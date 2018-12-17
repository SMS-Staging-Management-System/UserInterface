export interface ICheckIn {
  checkInId:          number;
  email:              string;
  userId:             number;
  firstName:          string;
  lastName:           string;
  dateSubmitted:      number;
  checkinDescription: string;
  managerComments:    string;
}