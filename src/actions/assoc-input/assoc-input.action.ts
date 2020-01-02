import { IAssociateInput } from '../../model/IAssociateInput';
import { getFormatById } from '../../components/associate-input/temp.util';
import { interviewClient } from '../../axios/sms-clients/interview-client';

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

export const submitInput = (interviewId: number, fields: IAssociateInput) => async (dispatch) => {
    // Better f***ing work.
    try {
        const res = await interviewClient.submitAssocInput({
            interviewId: interviewId,
            associateInputId: fields.id,
            receivedNotifications: fields.dateNotified,
            descriptionProvided: fields.descriptionProvided,
            interviewFormat: fields.interviewFormat,
            proposedFormat: fields.proposedFormat
        });
        if (res.status === 200) {
            console.log('Associate Input Submission: Success');
            dispatch({
                type: AssocInputActions.SUBMIT,
                payload: fields
            });
        }
    }
    catch {
        console.log('Associate Input Submission: Failed');
    }
};