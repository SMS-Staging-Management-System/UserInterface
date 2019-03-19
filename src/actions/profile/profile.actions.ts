import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { toast } from "react-toastify";
import { updateCurrentSMSUser } from "../current-sms-user/current-sms-user.actions";

export const profileTypes = {
    UPDATE_USER_TRAINING_LOCATION: 'PROFILE_UPDATE_USER_TRAINING_LOCATION',
    UPDATE_USER_INFO: 'PROFILE_UPDATE_USER_INFO',
    SET_TO_CURRENT_SMS_USER: 'PROFILE_SET_TO_CURRENT_SMS_USER',
    TOGGLE_TRAINING_LOCATIONS_DROPDOWN: 'PROFILE_TOGGLE_TRAINING_LOCATIONS_DROPDOWN',
    USER_UPDATE_SUCCESSFUL: 'PROFILE_USER_UPDATE_SUCCESSFUL'
}

export const updateUserTrainingLocation = (location: IAddress) => {
    return {
        payload: {
            location
        },
        type: profileTypes.UPDATE_USER_TRAINING_LOCATION
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

export const updateUser = (userToUpdate: IUser, bIsCurrentUser: boolean) => async (dispatch: (action: any) => void) => {
    try {
        const resp = await userClient.updateSMSUserInfo(userToUpdate);
        toast.success('Info updated successfully');
        dispatch ({
            payload: {
                updatedUser: resp.data as IUser
            },
            type: profileTypes.USER_UPDATE_SUCCESSFUL
        })
        if (bIsCurrentUser) {
            dispatch(updateCurrentSMSUser(resp.data));
        }
    } catch (error) {
        toast.error('Failed to update');
    }
}