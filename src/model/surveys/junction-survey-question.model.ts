//import { IQuestion } from "./question.model";
import { ISurvey } from "./survey.model";
// let temp: IQuestion = {
//     questionId: {
//         questionId: 0,
//         question: '',
//         typeId: 0,
//     }
// }
export interface IJunctionSurveyQuestion {

    id: number;

    questionId :{ 
        questionId: number;
    question: string;
    typeId: number;
    }
    questionOrder: number;

    surveyId: ISurvey;
}