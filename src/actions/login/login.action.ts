import Auth from "@aws-amplify/auth";
import { setup } from "../auth/auth.actions";
/* import { setup } from "../auth/auth.actions"; */


export const loginTypes = {
    UPDATE_USERNAME: "L_UPDATE_USERNAME",
    UPDATE_PASSWORD: "L_UPDATE_PASSWORD",
    UPDATE_CONFIRMATION_PASSWORD: "L_UPDATE_CONFIRMATION_PASSWORD",
    UPDATE_NEW_PASSWORD: "L_UPDATE_NEW_PASSWORD",
    UPDATE_VERIFICATION_CODE: "L_UPDATE_VERIFICATION_CODE",
    LOGIN: "L_LOGIN",
    FAILED_LOGIN: "L_FAILED_LOGIN",
    RESET_PASSWORD_MODAL: "L_RESET_PASSWORD_MODAL"
}

export const updateUsername = (username: string) => {
    return {
        payload: {
            username: username
        },
        type: loginTypes.UPDATE_USERNAME
    }
}
export const updatePassword = (password: string) => {
    return {
        payload: {
            password: password
        },
        type: loginTypes.UPDATE_PASSWORD
    }
}
export const updateConfirmationPassword = (confirmationPassword: string) => {
    return {
        payload: {
            confirmationPassword: confirmationPassword
        },
        type: loginTypes.UPDATE_CONFIRMATION_PASSWORD
    }
}
export const updateNewPassword = (newPassword: string) => {
    return {
        payload: {
            newPassword: newPassword
        },
        type: loginTypes.UPDATE_NEW_PASSWORD
    }
}
export const updateVerificationCode = (verificationCode: string) => {
    return {
        payload: {
            verificationCode: verificationCode
        },
        type: loginTypes.UPDATE_VERIFICATION_CODE
    }
}
export const loginRequest = (username: string, password: string, history) => async (dispatch) => {
    try {
        const credentials = await Auth.signIn({
            password, 
            username
        })
        dispatch({
        payload: {
            credentials
        },
        type: loginTypes.LOGIN,
        })
        setup()(dispatch);
        if(credentials.challengeName === 'NEW_PASSWORD_REQUIRED'){
            history.push('/management/reset-password')
        }else{
<<<<<<< HEAD
            
            history.push('/dashboard');
=======
            history.push('/surveys');
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        }
    } catch (error) {
        console.log(error);
        dispatch({
            payload: {
            },
            type: loginTypes.FAILED_LOGIN
        })
    }
    
}
export const resetPasswordModal = (passwordNeedsResetModal: boolean) => {
    return {
        payload: {
            passwordNeedsResetModal: passwordNeedsResetModal,
        },
        type: loginTypes.RESET_PASSWORD_MODAL
    }
}
