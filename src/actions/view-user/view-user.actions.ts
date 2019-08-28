import { IUser } from "../../model/user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { ICognitoUser } from "../../model/cognito-user.model";

export const viewUserTypes = {
    TOGGLE: 'TOGGLE_VIEW_USER_MODAL',
    VIEW_USER: 'VIEW_USER_UPDATE_USER',
    GET_USER_INFO: "GET_USER_INFO"
}

export const toggleViewUserModal = () => {
    return {
        payload: {
        },
        type: viewUserTypes.TOGGLE
    }
}

export const hoveredUser = (email: string) => async (dispatch: (action: any) => void) => {
    const resp = await userClient.findOneByEmail(email);
    dispatch({
        payload: {
            newUser: resp.data
        },
        type: viewUserTypes.VIEW_USER
    })
}

export const selectUserForDisplay = (selectedUser: ICognitoUser) => async (dispatch: (action: any) => void) => {
  let resp = await userClient.findOneByEmail(selectedUser.email);
  const roles = selectedUser.roles
  const userWithRoles = {...resp.data, roles}
  dispatch ({
      payload: {
          newUser: userWithRoles
      },
      type: viewUserTypes.VIEW_USER
  })
}

export const updateUserInfo = (newUser: IUser) => {
    return {
        payload: {
            newUser: newUser
        },
        type: viewUserTypes.GET_USER_INFO
    }
}