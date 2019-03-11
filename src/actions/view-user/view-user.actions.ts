import { IUser } from "../../model/user.model";
import { userClient } from "../../axios/sms-clients/user-client";

export const viewUserTypes = {  
  TOGGLE: 'TOGGLE_VIEW_USER_MODAL',
  VIEW_USER: 'VIEW_USER_UPDATE_USER',
  GET_USER_INFO:"GET_USER_INFO"
}

export const toggleViewUserModal = () => {
  return {
    payload: {
    },
    type: viewUserTypes.TOGGLE
  }
}

export const hoveredUser = (email: string) => async (dispatch) => {
  const resp = await userClient.findOneByEmail(email);
  dispatch ({
      payload: {
          newUser: resp.data
      },
      type: viewUserTypes.GET_USER_INFO
  })
}

export const updateUserInfo = (newUser: IUser) => {
  return {
    payload: {
      newUser: newUser
    },
    type: viewUserTypes.VIEW_USER
  }
}