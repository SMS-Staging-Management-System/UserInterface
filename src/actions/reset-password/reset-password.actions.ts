import { loginRequest } from "../login/login.action";
import { Auth } from "aws-amplify";
import { setup } from "../auth/auth.actions";
import { toast } from "react-toastify";
import { ICognitoUser } from "../../model/ICognitoUser";

export const resetPasswordTypes = {
    UPDATE_CONFIRMATION_PASSWORD: "R_UPDATE_CONFIRMATION_PASSWORD",
    UPDATE_NEW_PASSWORD: "R_UPDATE_NEW_PASSWORD",
    UPDATE_VERIFICATION_CODE: "R_UPDATE_VERIFICATION_CODE",
    RESET_PASSWORD: "R_RESET_PASSWORD",
    SUBMIT_PASSWORD_RESET: "R_SUBMIT_PASSWORD_RESET",
    RESET_PASSWORD_MODAL: "R_RESET_PASSWORD_MODAL",
    TOGGLE_PASSWORD_TIP: "R_TOGGLE_PASSWORD_TIP",

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
export const submitPasswordReset = (needsVerificationCode: boolean, username: string, verificationCode: string, newPassword: string, history, cogUser?: ICognitoUser ) => async (dispatch) => {
    try {
        console.log(`needsverifictioncode: ${needsVerificationCode}, username: ${username}, verificationCode: ${verificationCode}, newpassword: ${newPassword}`
        )
        if (needsVerificationCode) {
            console.log('submitting code')
            await Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
            loginRequest(username, newPassword, history)(dispatch);
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
            loginRequest(username, newPassword, history)(dispatch)
        }
    } catch (err) {
        toast.error('failed to set new password');
        console.log(err);
    }
}

export const togglePasswordTip = (showPasswordTip) => {
    return {
        payload: {
            showPasswordTip: showPasswordTip,
        },
        type: resetPasswordTypes.TOGGLE_PASSWORD_TIP
    }
}
