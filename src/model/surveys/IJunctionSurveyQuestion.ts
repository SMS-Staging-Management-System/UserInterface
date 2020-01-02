/** @prettier */
import { ISurvey } from './ISurvey';
import { IQuestion } from './IQuestion';

export interface IJunctionSurveyQuestion {
  id: number;
  question: IQuestion;
  survey: ISurvey;
  questionOrder: number;
}
