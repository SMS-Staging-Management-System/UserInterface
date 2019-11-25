/** @prettier */
import { IJunctionSurveyQuestion } from './IJunctionSurveyQuestion';

export interface ISurvey {
  surveyId: number;
  title: string;
  description: string;
  creator: string;
  dateCreated: Date;
  closingDate: Date | null;
  template: boolean;
  questionJunctions: IJunctionSurveyQuestion[];
}
