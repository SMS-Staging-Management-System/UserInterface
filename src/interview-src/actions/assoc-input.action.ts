import { IAssociateInput, IInterviewFormat } from "../component/associate-input/interview-interfaces";

export const AssocInputActions = {
    UPDATE_DAY_NOTIFIED: 'UPDATE_DAY_NOTIFIED',
    UPDATE_DAY_NOTICE: 'UPDATE_DAY_NOTICE',
    UPDATE_DESC_PROVIDED: 'UPDATE_DESC_PROVIDED',
    UPDATE_ACTUAL: 'UPDATE_ACTUAL',
    UPDATE_PROPOSED: 'UPDATE_PROPOSED',
    SUBMIT: 'SUBMIT'
};

export const updateDayNotified = () => {
    return {
        type: AssocInputActions.UPDATE_DAY_NOTIFIED,
        payload: new Date(0)
    };
};

export const updateDayNotice = () => {
    return {
        type: AssocInputActions.UPDATE_DAY_NOTICE,
        payload: false
    };
};

export const updateDescProvided = () => {
    return {
        type: AssocInputActions.UPDATE_DAY_NOTICE,
        payload: false
    };
};

export const updateActualFormat = () => {
    const payload: IInterviewFormat = {
        id: 0,
        description: ''
    };
    return {
        type: AssocInputActions.UPDATE_ACTUAL,
        payload: payload
    };
};

export const updateProposedFormat = () => {
    const payload: IInterviewFormat = {
        id: 0,
        description: ''
    };
    return {
        type: AssocInputActions.UPDATE_PROPOSED,
        payload: payload
    };
};
