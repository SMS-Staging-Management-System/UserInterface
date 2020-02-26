import * as actionTypes from '../../actions/survey/actionTypes';
import{History} from 'history';

export interface SurveyFuncState {
    displaySurvey?: any,
    displayChoice: boolean,
    isSuccessfullySubmitted: boolean,
    showModal: boolean,
    todos: any,
    completedTasks: any,
    submitQuestions: any,
    notRenderedFirstTime: boolean,
    isCreating: boolean
}


const initialState:SurveyFuncState = {
    displaySurvey: history.state ? history.state.displaySurvey : { questionJunctions: [] },
    displayChoice: false,
    isSuccessfullySubmitted: false,
    showModal: false,
    todos: [],
    submitQuestions: [],
    completedTasks: [],
    notRenderedFirstTime: true,
    isCreating: false
}

const surveyFuncReducer = (state = initialState, action: any) => {
    switch(action.type)
    {
        case actionTypes.CHANGE_FIELD:
            const newQuestion = state.displaySurvey.questionJunctions.map((questionJunction, indexArr) => {
                if(indexArr === action.payload.index) {
                    return {
                        ...questionJunction,
                        question: {
                            ...questionJunction.question,
                            [name]: action.payload.value
                        }
                    }
                } else {
                    return questionJunction;
                }
            })
            return {
                ...state,
                displaySurvey: {
                    ...state.displaySurvey,
                    questionJunctions: newQuestion
                }
            }
    }
    return state;
}

export default surveyFuncReducer;