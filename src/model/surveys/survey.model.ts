export interface ISurvey {
  id: number;
  title: string;
  description: string;
  dateCreated: string;
  closingDate: Date;
  template: boolean;
  published: boolean;
}