import { IQuestion } from "./question.model";

export interface IAnswer {
    answerId: number;
    answer: string;
    question: IQuestion;
}