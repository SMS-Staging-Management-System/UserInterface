import { ISurveyBuildState } from ".";
import { surveyBuildTypes } from "../../actions/survey/SurveyBuild.action";


const initialState: ISurveyBuildState = {
}

export const surveyBuildReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case surveyBuildTypes.CreatSurvey:
            return {
                // ...state,

            }
    }

    return state;
}

