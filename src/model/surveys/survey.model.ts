export interface ISurvey {
  surveyId: number;
  title: string;
  description: string;
  dateCreated: string;
  closingDate: Date;
  template: boolean;
  published: boolean;
}