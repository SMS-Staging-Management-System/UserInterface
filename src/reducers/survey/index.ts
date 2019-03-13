import { combineReducers } from "redux";
//import { templateModalReducer } from "./template-modal-reducer";


export interface IModalTemplateState{
  //showModal: boolean,
}
export interface ISurveyState {
  templateModal: IModalTemplateState,
}
  export const surveyState = combineReducers<ISurveyState>({
    //templateModal: templateModalReducer,
  })

  