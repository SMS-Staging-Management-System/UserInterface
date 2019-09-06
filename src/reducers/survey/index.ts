import { combineReducers } from "redux";
import { ISurvey } from "../../model/surveys/survey.model";
import { IQuestion } from "../../model/surveys/question.model";
import { IAnswer } from "../../model/surveys/answer.model";
import { IJunctionSurveyQuestion } from "../../model/surveys/junction-survey-question.model";
import { surveyBuildReducer } from "./SurveyBuild.reducer";
//import { templateModalReducer } from "./template-modal-reducer";


export interface IModalTemplateState {
  //showModal: boolean,
}

export interface ISurveyBuildState {
  dummySurvey: ISurvey,
  dummyQuestionArray: IQuestion[],
  dummyAnswerArray: IAnswer[],
  //beacuse there was a bug of sending data to the api(answers were out of order) 
  //we had to create another answer array that carried all of the parsed answers
  parsedAnswers: IAnswer[],
  junctionTable: IJunctionSurveyQuestion
}
export interface ISurveyState {
  templateModal: IModalTemplateState,
  surveyBuildState: ISurveyBuildState
}
export const surveyState = combineReducers<ISurveyState>({
  //templateModal: templateModalReducer,
  surveyBuildState: surveyBuildReducer
})

