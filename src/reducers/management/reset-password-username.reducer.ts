import { IResetPasswordUsernameState } from ".";
import { resetPasswordUsernameTypes } from "../../actions/resetPasswordUsername/reset-password-username.actions";

export const initialState: IResetPasswordUsernameState = {
    username: '',
    needsVerificationCode: false,
}


export const resetPasswordUsernameReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case resetPasswordUsernameTypes.UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload.username,

            }
        case resetPasswordUsernameTypes.RESET_PASSWORD:
            return {
                ...state,
                needsVerificationCode: action.payload.needsVerificationCode,

            }
            
    }
    return state;
}