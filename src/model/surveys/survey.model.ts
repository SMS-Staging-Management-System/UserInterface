export interface ISurvey {
  surveyId: number;
  title: string;
  description: string;
  dateCreated: Date;
  closingDate: Date;
  template: boolean;
  published: boolean;
}