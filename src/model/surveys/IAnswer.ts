/** @prettier */
import { IQuestion } from './IQuestion';

export interface IAnswer {
  answerId: number;
  answer: string;
  question: IQuestion;
}
