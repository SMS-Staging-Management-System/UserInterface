/** @prettier */
import { IAnswer } from './IAnswer';
import { ISurvey } from './ISurvey';

export interface IResponse {
  id: number;
  surveyId: ISurvey;
  answerId: IAnswer;
  userEmailString: string;
}
