import { combineReducers } from "redux";
import { ISurvey } from "../../model/surveys/ISurvey";
import { IQuestion } from "../../model/surveys/IQuestion";
import { IAnswer } from "../../model/surveys/IAnswer";
import { IJunctionSurveyQuestion } from "../../model/surveys/IJunctionSurveyQuestion";
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
  // templateModal: IModalTemplateState,
  surveyBuildState : ISurveyBuildState
}
export const surveyState = combineReducers<ISurveyState>({
  //templateModal: templateModalReducer,
  surveyBuildState: surveyBuildReducer
})

