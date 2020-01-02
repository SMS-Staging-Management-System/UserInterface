import { toast } from "react-toastify";
import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { userClient } from "../../axios/sms-clients/user-client";
import { ICognitoUserAddGroup } from "../../model/ICognitoUserAddGroup";
import { cognitoRoles } from "../../model/ICognitoUser";
import { IUser } from "../../model/users/IUser";
import { updateCurrentSMSUser } from "../current-sms-user/current-sms-user.actions";

export const profileTypes = {
    UPDATE_USER_PROFILE: 'UPDATE USER PROFILE',
    UPDATE_USER_PROFILE_FAILED: 'UPDATE USER PROFILE FAILED'
}

// tslint:disable-next-line: bool-param-default
export const updateUser = (userToUpdate: IUser, prevUser: IUser, isCurrentUser?: boolean) => async (dispatch: any) => {
    const roleNames = [
        cognitoRoles.ADMIN,
        cognitoRoles.TRAINER,
        cognitoRoles.STAGING_MANAGER
    ]
    try {
        const resp = await userClient.updateSMSUserInfo(userToUpdate);

        let cognitoFailure = false;
        try {
            // tslint:disable-next-line: prefer-for-of
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
        if (cognitoFailure) {
            newUser = {
                ...newUser,
                roles: prevUser.roles
            }
        }
        if (isCurrentUser) {
            dispatch(updateCurrentSMSUser(newUser));
        }
        dispatch({
            payload: {
                updatedUser: newUser
            },
            type: profileTypes.UPDATE_USER_PROFILE,
        })
    } catch (error) {
        toast.error('Failed to update User.');
        dispatch({
            payload: {},
            type: profileTypes.UPDATE_USER_PROFILE_FAILED,
        })
    }
    toast.success('User updated successfully.');
}