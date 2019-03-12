// Temp import
import { getFormatById } from '../../component/associate-input/temp.util';
import { IAssociateInput } from '../../model/Associateinput.model';

export const AssocInputActions = {
    UPDATE_DAY_NOTIFIED: 'UPDATE_DAY_NOTIFIED',
    UPDATE_DESC_PROVIDED: 'UPDATE_DESC_PROVIDED',
    UPDATE_ACTUAL: 'UPDATE_ACTUAL',
    UPDATE_PROPOSED: 'UPDATE_PROPOSED',
    SUBMIT: 'SUBMIT'
};

export const updateDayNotified = (event: any) => {
    return {
        type: AssocInputActions.UPDATE_DAY_NOTIFIED,
        payload: event.target.valueAsDate
    };
};

export const updateDescProvided = (value: string, id: number) => {
    return {
        type: AssocInputActions.UPDATE_DESC_PROVIDED,
        payload: (value === 'Yes')
    };
};

export const updateActualFormat = (value: string, id: number) => {
    return {
        type: AssocInputActions.UPDATE_ACTUAL,
        payload: getFormatById(id)
    };
};

export const updateProposedFormat = (value: string, id: number) => {
    return {
        type: AssocInputActions.UPDATE_PROPOSED,
        payload: getFormatById(id)
    };
};

export const submit = (fields: IAssociateInput) => (dispatch) => {
    // interview id
    // recieved notification
    // description provided
    // interview format
    // proposed format.
    dispatch({
        type: AssocInputActions.SUBMIT,
        payload: fields
    });
};
