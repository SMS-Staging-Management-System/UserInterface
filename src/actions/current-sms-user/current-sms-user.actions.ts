import { userClient } from "../../axios/sms-clients/user-client";

export const currentSMSUserTypes = {
    GET_USER_INFO: 'GET_USER_INFO',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO'
}

export const getUserByEmail = (email: string) => async (dispatch) => {
    const resp = await userClient.findOneByEmail(email);
    dispatch ({
        payload: {
            user: resp.data
        },
        type: currentSMSUserTypes.GET_USER_INFO
    })
}

// export const updateCurrentSMSUser = async (dispatch) => {
//      const resp = await userClient
// }