import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { toast } from "react-toastify";

import { IStatus } from "../../model/status.model";

import { updateCurrentSMSUser } from "../current-sms-user/current-sms-user.actions";
<<<<<<< HEAD
import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { ICognitoUserAddGroup } from "../../model/cognito-user-add-group.model";
import { cognitoRoles } from "../../model/cognito-user.model";
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71


export const profileTypes = {
    UPDATE_USER_TRAINING_LOCATION: 'PROFILE_UPDATE_USER_TRAINING_LOCATION',
    UPDATE_USER_INFO: 'PROFILE_UPDATE_USER_INFO',
    SET_TO_CURRENT_SMS_USER: 'PROFILE_SET_TO_CURRENT_SMS_USER',
    TOGGLE_TRAINING_LOCATIONS_DROPDOWN: 'PROFILE_TOGGLE_TRAINING_LOCATIONS_DROPDOWN',
    USER_UPDATE_SUCCESSFUL: 'PROFILE_USER_UPDATE_SUCCESSFUL',
    UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
    TOGGLE_STATUS_DROPDOWN: 'TOGGLE_STATUS_DROPDOWN',
<<<<<<< HEAD
    TOGGLE_COHORT_DROPDOWN: 'TOGGLE_COHORT_DROPDOWN',
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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

<<<<<<< HEAD
export const toggleCohortDropdown = () => {
    return {
        payload: {},
        type: profileTypes.TOGGLE_COHORT_DROPDOWN
    }
}


export const updateUser = (userToUpdate: IUser, bIsCurrentUser: boolean, roles: boolean[]) => async (dispatch: (action: any) => void) => {
    let roleNames = [
        cognitoRoles.ADMIN,
        cognitoRoles.TRAINER,
        cognitoRoles.STAGING_MANAGER
    ]
    try {
        const resp = await userClient.updateSMSUserInfo(userToUpdate);

        
        for (let i = 0; i < roles.length; i++) {
            let newCogUser: ICognitoUserAddGroup = {
                email: userToUpdate.email,
                groupName: roleNames[i]
            };
            try {
                if (roles[i] && !userToUpdate.roles.includes(roleNames[i])) {
                    await cognitoClient.addUserToGroup(newCogUser);
                    userToUpdate.roles.push(roleNames[i]);
                }
            } catch (error) {
                toast.error('Failed to add role');
            }
            try {
                if (!roles[i] && userToUpdate.roles.includes(roleNames[i])) {
                    await cognitoClient.removeUserFromGroup(newCogUser);
                    userToUpdate.roles.splice(i,1);
                }
            } catch (error) {
                toast.error('Failed to remove role');
            }
        }
        const updatedUser = resp.data;
        updatedUser.roles = userToUpdate.roles;
        dispatch({
=======

export const updateUser = (userToUpdate: IUser, bIsCurrentUser: boolean) => async (dispatch: (action: any) => void) => {

    try {
        const resp = await userClient.updateSMSUserInfo(userToUpdate);
        toast.success('Info updated successfully');
        dispatch ({
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            payload: {
                updatedUser: resp.data as IUser
            },
            type: profileTypes.USER_UPDATE_SUCCESSFUL
        })
        if (bIsCurrentUser) {
            dispatch(updateCurrentSMSUser(resp.data));
        }
<<<<<<< HEAD
        toast.success('Info updated successfully');
    } catch (error) {
        toast.error('Failed to update user info');
    }
}

export const handleCheckboxChange = (status: IStatus) => (dispatch) => {
=======
    } catch (error) {
        toast.error('Failed to update');
    }
}

export const handleCheckboxChange = (status:IStatus) => (dispatch)=>{
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    dispatch({
        payload: {},
        type: profileTypes.UPDATE_VIRTUAL_STATUS_CHECKBOX
    });
    dispatch(updateUserStatus(status))
}