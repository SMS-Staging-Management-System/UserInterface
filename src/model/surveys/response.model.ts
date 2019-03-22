import { IAnswer } from "./answer.model";
import { ISurvey } from "./survey.model";

export interface IResponse {
    id: number;
    surveyId: ISurvey;
    answerId: IAnswer;
    userEmailString: string;
}