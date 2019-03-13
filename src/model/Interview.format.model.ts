
export interface IInterviewFormat {
  interviewFormatId:      number,
  formatDesc:             string
}

export enum InterviewFormat {
  none = '',
  onSite ='On Site',
  inPerson = 'In Person',
  videoCall = 'Video Call',
  phoneCall = 'Phone Call'
}

/**
* returns all the print friendly and DB friendly representations of the formats
*/
export const allInterviewFormats =  Object.values(InterviewFormat)