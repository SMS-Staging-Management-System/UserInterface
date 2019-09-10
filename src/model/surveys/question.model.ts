import { IAnswer } from "./answer.model";

export interface IQuestion {
    questionId: number;
    question: string;
    typeId: number;
    answers: IAnswer[];

}

