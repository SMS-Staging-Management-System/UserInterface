import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { toast } from "react-toastify";

export const manageUsersTypes = {
  GET_USERS: 'MANAGE_GET_USERS',
}

export const manageGetUsersByGroup = (groupName: string) => async (dispatch) => {
  try {
    const response = await cognitoClient.findUsersByGroup(groupName)
    dispatch({
      payload: {
        manageUsers: response.data.Users.map(user => ({
          email: user.Attributes.find(attr => attr.Name === 'email').Value,

        }))
      },
      type: manageUsersTypes.GET_USERS
    })
  } catch (e) {
    toast.warn('Unable to retreive users')
    dispatch({
      payload: {
      },
      type: ''
    })
  }
}

