import { userClient } from "../../axios/sms-clients/user-client";

export const currentSMSUserTypes = {
    GET_USER_INFO: 'GET_USER_INFO'
}

export const getUserByEmail = (email: string) => async (dispatch) => {
    const resp = await userClient.findOneByEmail(email);
    return {
        payload: {
            user: resp.data
        },
        type: currentSMSUserTypes.GET_USER_INFO
    }
}