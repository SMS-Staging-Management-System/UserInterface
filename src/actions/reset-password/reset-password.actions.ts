import { loginRequest } from "../login/login.action";
import { Auth } from "aws-amplify";
import { setup } from "../auth/auth.actions";
import { toast } from "react-toastify";
import { ICognitoUser } from "../../model/cognito-user.model";
import { cognitoClient } from "../../axios/sms-clients/cognito-client";

export const resetPasswordTypes = {
    UPDATE_CONFIRMATION_PASSWORD: "R_UPDATE_CONFIRMATION_PASSWORD",
    UPDATE_NEW_PASSWORD: "R_UPDATE_NEW_PASSWORD",
    UPDATE_VERIFICATION_CODE: "R_UPDATE_VERIFICATION_CODE",
    RESET_PASSWORD: "R_RESET_PASSWORD",
    SUBMIT_PASSWORD_RESET: "R_SUBMIT_PASSWORD_RESET"

}

export const updateConfirmationPassword = (confirmationPassword: string) => {
    return {
        payload: {
            confirmationPassword: confirmationPassword
        },
        type: resetPasswordTypes.UPDATE_CONFIRMATION_PASSWORD
    }
}
export const updateNewPassword = (newPassword: string) => {
    return {
        payload: {
            newPassword: newPassword
        },
        type: resetPasswordTypes.UPDATE_NEW_PASSWORD
    }
}
export const updateVerificationCode = (verificationCode: string) => {
    return {
        payload: {
            verificationCode: verificationCode
        },
        type: resetPasswordTypes.UPDATE_VERIFICATION_CODE
    }
}
export const submitPasswordReset = (needsVerificationCode: boolean, username: string, verificationCode: string, newPassword: string, history, cogUser: ICognitoUser) => async (dispatch) => {
    try {
        if (needsVerificationCode) {
            console.log('submitting code')
            await Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
            loginRequest(username, newPassword, history);
        } else {
            await Auth.completeNewPassword(
                cogUser,               // the Cognito User Object
                newPassword,       // the new password
                // OPTIONAL, the required attributes
                {
                    email: username,
                }
            );
            setup();
            //this.props.history.push('/check-ins');
        }

    } catch (err) {
        toast.error('failed to set new password');
        console.log(err);
    }
}
export const resetPassword = (username) => async (dispatch) => {
    try {
        await cognitoClient.resetPassword(username);
        dispatch({
            payload: {
                needsVerificationCode: true,
                passwordNeedsReset: true
            }

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