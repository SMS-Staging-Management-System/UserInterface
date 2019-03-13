export interface ISurvey {
  surveyId: number;
  title: string;
  description: string;
  dateCreated: Date;
  closingDate: Date | null;
  template: boolean;
  published: boolean;
}