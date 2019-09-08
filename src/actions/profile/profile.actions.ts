import { toast } from "react-toastify";
import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { userClient } from "../../axios/sms-clients/user-client";
import { ICognitoUserAddGroup } from "../../model/cognito-user-add-group.model";
import { cognitoRoles } from "../../model/cognito-user.model";
import { IUser } from "../../model/user.model";
import { updateCurrentSMSUser } from "../current-sms-user/current-sms-user.actions";

export const profileTypes = {
    UPDATE_USER_PROFILE: 'UPDATE USER PROFILE',
    UPDATE_USER_PROFILE_FAILED: 'UPDATE USER PROFILE FAILED'
}

export const updateUser = (userToUpdate: IUser, prevUser: IUser, isCurrentUser?: boolean) => async (dispatch: any) => {
    let roleNames = [
        cognitoRoles.ADMIN,
        cognitoRoles.TRAINER,
        cognitoRoles.STAGING_MANAGER
    ]
    try {
        const resp = await userClient.updateSMSUserInfo(userToUpdate);

        let cognitoFailure = false;
        try {
            for (let i = 0; i < roleNames.length; i++) {
                const newCogUser: ICognitoUserAddGroup = {
                    email: userToUpdate.email,
                    groupName: roleNames[i]
                };

                if (userToUpdate.roles.includes(roleNames[i]) && !prevUser.roles.includes(roleNames[i])) {
                    await cognitoClient.addUserToGroup(newCogUser);
                } else if (!userToUpdate.roles.includes(roleNames[i]) && prevUser.roles.includes(roleNames[i])) {
                    await cognitoClient.removeUserFromGroup(newCogUser);
                }
            }
        } catch (error) {
            toast.warn('Failed to update Cognito role.');
            cognitoFailure = true;
        }
        let newUser: IUser = resp.data;
        if(cognitoFailure) {
            newUser = {
                ...newUser,
                roles: prevUser.roles
            }
        }
        if(isCurrentUser){
            dispatch(updateCurrentSMSUser(newUser));
        }
        dispatch({
            type: profileTypes.UPDATE_USER_PROFILE,
            payload: {
                updatedUser: newUser
            }            
        })
    } catch (error) {
        toast.error('Failed to update User.');
        dispatch({
            type: profileTypes.UPDATE_USER_PROFILE_FAILED,
            payload: {}
        })
    }
    toast.success('User updated successfully.');
}