import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { toast } from "react-toastify";
import { IStatus } from "../../model/status.model";

export const profileTypes = {
    UPDATE_USER_TRAINING_LOCATION: 'PROFILE_UPDATE_USER_TRAINING_LOCATION',
    UPDATE_USER_INFO: 'PROFILE_UPDATE_USER_INFO',
    SET_TO_CURRENT_SMS_USER: 'PROFILE_SET_TO_CURRENT_SMS_USER',
    TOGGLE_TRAINING_LOCATIONS_DROPDOWN: 'PROFILE_TOGGLE_TRAINING_LOCATIONS_DROPDOWN',
    USER_UPDATE_SUCCESSFUL: 'PROFILE_USER_UPDATE_SUCCESSFUL',
    UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
    TOGGLE_STATUS_DROPDOWN: 'TOGGLE_STATUS_DROPDOWN',
    UPDATE_VIRTUAL_STATUS_CHECKBOX: 'UPDATE_VIRTUAL_STATUS_CHECKBOX',
}

export const updateUserTrainingLocation = (location: IAddress) => {
    return {
        payload: {
            location
        },
        type: profileTypes.UPDATE_USER_TRAINING_LOCATION
    }
}

export const updateUserStatus = (status: IStatus) => {
    return {
        payload: {
            status
        },
        type: profileTypes.UPDATE_USER_STATUS
    }
}

export const updateUserInfo = (user: IUser) => {
    return {
        payload: {
            user: user
        },
        type: profileTypes.UPDATE_USER_INFO
    }
}

export const setToCurrentSMSUser = (currentSMSUser: IUser) => {
    return {
        payload: {
            currentSMSUser
        },
        type: profileTypes.SET_TO_CURRENT_SMS_USER
    }
}

export const toggleTrainingLocationsDropdown = () => {
    return {
        payload: {},
        type: profileTypes.TOGGLE_TRAINING_LOCATIONS_DROPDOWN
    }
}

export const toggleStatusDropdown = () => {
    return {
        payload: {},
        type: profileTypes.TOGGLE_STATUS_DROPDOWN
    }
}

export const updateUser = (userToUpdate: IUser) => async (dispatch: (action: any) => void) => {
    try {
        const resp = await userClient.updateSMSUserInfo(userToUpdate);
        console.log(resp.data);
        toast.success('Info updated successfully');
        dispatch ({
            payload: {
                updatedUser: resp.data as IUser
            },
            type: profileTypes.USER_UPDATE_SUCCESSFUL
        })
    } catch (error) {
        toast.error('Failed to update');
    }
}

export const handleCheckboxChange = (status:IStatus) => (dispatch)=>{
    dispatch({
        payload: {},
        type: profileTypes.UPDATE_VIRTUAL_STATUS_CHECKBOX
    });
    dispatch(updateUserStatus(status))
}