import { IAssociateInput } from '../../model/Associateinput.model';
import { AssocInputActions } from '../../actions/assoc-input/assoc-input.action';

const initalState: IAssociateInput = {
    dateNotified: undefined,
    descriptionProvided: undefined,
    interviewFormat: undefined,
    proposedFormat: undefined
};

export const assocInputReducer = (state = initalState, action: any) => {
    switch(action.type) {
        case AssocInputActions.UPDATE_DAY_NOTIFIED:
            return {
                ...state,
                dateNotified: action.payload
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
                interviewFormat: action.payload
            };

        case AssocInputActions.SUBMIT:
            return { ...action.payload };

        

        default: return state;
    }
};