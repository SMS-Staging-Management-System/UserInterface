import { ISurveyBuildState } from ".";
import { surveyBuildTypes } from "../../actions/survey/SurveyBuild.action";

const initialState: ISurveyBuildState = {
    dummySurvey: {
        surveyId: 1,
        title: 'not filled',
        description: 'Example Survey 1 Description',
        dateCreated: new Date(),
        closingDate: null,
        template: false,
        published: true
    },
    dummyQuestionArray: [],
    dummyAnswerArray: [],
    parsedAnswers: [],
    junctionTable: {
        id: 0,
        questionId: {
            questionId: 0,
            question: 'not filled',
            typeId: 0,
        },
        questionOrder: 0,

        surveyId: {
            surveyId: 0,
            title: 'not fileld',
            description: 'not filled',
            dateCreated: new Date(),
            closingDate: null,
            template: false,
            published: false,
        }
    }
}

export const surveyBuildReducer = (state = initialState, action: any): ISurveyBuildState => {
    switch (action.type) {
        case surveyBuildTypes.CreatSurvey:
            return {
                ...state,
                dummySurvey: action.payload.actionSurvey,
                dummyQuestionArray: action.payload.actionQuestion,
                dummyAnswerArray: action.payload.actionAnswer,
                parsedAnswers: action.payload.actionParsedAnswers,
                junctionTable: action.payload.actionJunctionTable,
            }
    }
    return state;
}
