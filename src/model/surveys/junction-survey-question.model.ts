//import { IQuestion } from "./question.model";
import { ISurvey } from "./survey.model";
import { IQuestion } from "./question.model";
// let temp: IQuestion = {
//     questionId: {
//         questionId: 0,
//         question: '',
//         typeId: 0,
//     }
// }
export interface IJunctionSurveyQuestion {
    id: number;
    question: IQuestion;
    survey: ISurvey;
    questionOrder: number;
}