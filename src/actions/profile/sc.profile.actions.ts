import { toast } from "react-toastify";
import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { userClient } from "../../axios/sms-clients/user-client";
import { ICognitoUserAddGroup } from "../../model/cognito-user-add-group.model";
import { cognitoRoles } from "../../model/cognito-user.model";
import { IUser } from "../../model/user.model";

export const profileTypes = {
    UPDATE_USER_PROFILE: 'UPDATE USER PROFILE',
    UPDATE_USER_PROFILE_FAILED: 'UPDATE USER PROFILE FAILED'
}

export const updateUserSC = (userToUpdate: IUser, prevUser: IUser) => async (dispatch: any) => {
    let roleNames = [
        cognitoRoles.ADMIN,
        cognitoRoles.TRAINER,
        cognitoRoles.STAGING_MANAGER
    ]
    try {
        const resp = await userClient.updateSMSUserInfo(userToUpdate);

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
            toast.warn('Failed to update Cognito role.')
        }
        dispatch({
            type: profileTypes.UPDATE_USER_PROFILE,
            payload: {
                updatedUser: resp.data
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

// export const updateUserInStore = ()