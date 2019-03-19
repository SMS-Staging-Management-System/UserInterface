
import { resetPasswordTypes } from "../../actions/reset-password/reset-password.actions";
import { IResetPasswordState } from ".";
export const initialState: IResetPasswordState = {
    showPasswordTip: false,
    confirmationPassword: '',
    newPassword: '',
    verificationCode: '',
}


export const resetPasswordReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case resetPasswordTypes.UPDATE_CONFIRMATION_PASSWORD:
            return {
                ...state,

                confirmationPassword: action.payload.confirmationPassword,

            }
        case resetPasswordTypes.UPDATE_NEW_PASSWORD:
            return {
                ...state,
                newPassword: action.payload.newPassword,

            }

        case resetPasswordTypes.UPDATE_VERIFICATION_CODE:
            return {
                ...state,
                verificationCode: action.payload.verificationCode,
            }
        /* case resetPasswordTypes.RESET_PASSWORD:
            return {
                ...state,
                needsVerificationCode: action.payload.needsVerificationCode,
                passwordNeedsReset: action.payload.passwordNeedsReset,
            } */

        case resetPasswordTypes.TOGGLE_PASSWORD_TIP:
            return {
                ...state,
                showPasswordTip: action.payload.showPasswordTip,
            }


    }
    return state;

}