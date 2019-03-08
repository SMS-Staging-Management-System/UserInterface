import { IAssociateInput } from "../component/associate-input/interview-interfaces";
import { AssocInputActions } from '../actions/assoc-input.action';

const initalState: IAssociateInput = {
    dateNotified: new Date(0),
    dayNotice: false,
    descriptionProvided: false,
    interviewFormat: undefined,
    proposedFormat: undefined
};

export const assocInputReducer = (state = initalState, action: any): IAssociateInput => {
    switch(action.type) {
        case AssocInputActions.UPDATE_DAY_NOTIFIED:
            return {
                ...state,
                dateNotified: action.payload
            };

        case AssocInputActions.UPDATE_DAY_NOTICE:
            return {
                ...state,
                dayNotice: action.payload
            };

        case AssocInputActions.UPDATE_DESC_PROVIDED:
            return {
                ...state,
                descriptionProvided: action.payload
            };

        case AssocInputActions.UPDATE_PROPOSED:
            return {
                ...state,
                proposedFormat: action.payload
            };

        case AssocInputActions.UPDATE_ACTUAL:
            return {
                ...state,
                proposedFormat: action.payload
            };

        case AssocInputActions.SUBMIT:
            return { ...action.payload };

        default: return state;
    }
};