import { combineReducers } from "redux";
import { surveyBuildReducer } from "./SurveyBuild.reducer";

export interface ISurveyBuildState {
    
  }


export interface ISurveyState {
  surveyBuild : ISurveyBuildState
  }

  export const surveyState = combineReducers<ISurveyState>({
    surveyBuild : surveyBuildReducer
  })