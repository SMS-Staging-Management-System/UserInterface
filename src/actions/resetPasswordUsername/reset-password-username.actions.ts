import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { toast } from "react-toastify";

export const resetPasswordUsernameTypes = {
    RESET_PASSWORD: "RU_RESET_PASSWORD",
    UPDATE_USERNAME: "RU_UPDATE_USERNAME",
}
export const resetPassword = (username: string) => async (dispatch) => {
    try {
        await cognitoClient.resetPassword(username);
        dispatch({
            payload: {
                needsVerificationCode: true,
            },
            type: resetPasswordUsernameTypes.RESET_PASSWORD

        })
        console.log('password reset');
    } catch (err) {
        if (err.response && err.response.data.code === 'LimitExceededException') {
            toast.error('Too Many Password Reset Attempts');
        } else {
            console.log(err);
            toast.error('Failed to Reset Password');
        }
    }
}
export const updateUsername = (username: string) => {
    return {
        payload: {
            username: username
        },
        type: resetPasswordUsernameTypes.UPDATE_USERNAME
    }
}