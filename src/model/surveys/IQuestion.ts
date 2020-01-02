/** @prettier */
import { IAnswer } from './IAnswer';

export interface IQuestion {
  questionId: number;
  question: string;
  typeId: number;
  answers: IAnswer[];
}
