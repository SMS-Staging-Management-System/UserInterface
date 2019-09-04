import { IJunctionSurveyQuestion } from "./junction-survey-question.model";

export interface ISurvey {
  surveyId: number;
  title: string;
  description: string;
  creator: string;
  dateCreated: Date;
  closingDate: Date | null;
  template: boolean;
  published: boolean;
  questionJunctions: IJunctionSurveyQuestion[];
}