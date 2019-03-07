import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { userClient } from "../../axios/sms-clients/user-client";

export const viewUserTypes = {  
  TOGGLE: 'TOGGLE_VIEW_USER_MODAL',
  VIEW_USER: 'VIEW_USER',
  VIEW_USER_LOCATION: 'VIEW_USER_LOCATION',
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
          user: resp.data
      },
      type: viewUserTypes.GET_USER_INFO
  })
}


export const viewUserLocation = (location: IAddress) => {
  return {
    payload: {
      location
    },
    type: viewUserTypes.VIEW_USER_LOCATION
  }
}

export const viewUserInfo = (newUser: IUser) => {
  return {
    payload: {
      newUser
    },
    type: viewUserTypes.VIEW_USER
  }
}