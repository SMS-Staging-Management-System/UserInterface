import { ISurveyBuildState } from ".";
import { surveyBuildTypes } from "../../actions/survey/SurveyBuild.action";

const initialState: ISurveyBuildState = {
    dummySurvey: {
        surveyId: 1,
        title: 'not filled',
        description: 'Example Survey 1 Description',
        creator: '',
        dateCreated: new Date(),
        closingDate: null,
        template: false,
<<<<<<< HEAD
=======
        // published: true,
>>>>>>> af7983502415a77cdf2a8e993d2991dfc639ef32
        questionJunctions: []
    },
    dummyQuestionArray: [],
    dummyAnswerArray: [],
    parsedAnswers: [],
    junctionTable: {
        id: 0,
        question: {
            questionId: 0,
            question: 'not filled',
            typeId: 0,
            answers: []
        },
        questionOrder: 0,
        survey: {
            surveyId: 0,
            title: 'not fileld',
            description: 'not filled',
            creator: '',
            dateCreated: new Date(),
            closingDate: null,
            template: false,
<<<<<<< HEAD
=======
            // published: false,
>>>>>>> af7983502415a77cdf2a8e993d2991dfc639ef32
            questionJunctions: []
        }
    }
}

export const surveyBuildReducer = (state = initialState, action: any): ISurveyBuildState => {
    switch (action.type) {
        case surveyBuildTypes.CreateSurvey:
            return {
                ...state,
                dummySurvey: action.payload.actionSurvey
            }
    }
    return state;
}
