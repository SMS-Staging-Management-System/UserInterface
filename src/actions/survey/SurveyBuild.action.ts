// import { surveyClient } from "../../axios/sms-clients/survey-client";
import { ISurvey } from "../../model/surveys/survey.model";

export const surveyBuildTypes = {
    CreatSurvey: 'CreatSurvey'

}

export const CreatSurvey = (survey : ISurvey) => async (dispatch) => {
console.log('CreatSurvey was called');

    // surveyClient.saveSurvey(survey);

    dispatch({
        payload: {
        },
        type: surveyBuildTypes.CreatSurvey
    });
}
