import { ILoginState } from ".";
import { loginTypes } from "../../actions/login/login.action";

const initialState: ILoginState = {
    username: '',
    password: '',
    cogUser: {
        email: '',
        roles: [],
    },
    confirmationPassword: '',
    newPassword: '',
    passwordNeedsReset: '',
    incorrectUserPass: false,
    verificationCode: '',
    needsVerificationCode: false,
    showPasswordTip: false
}

export const loginReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case loginTypes.UPDATE_USERNAME:
        return{
            ...state,
            
            username: action.payload.username

        }
        case loginTypes.UPDATE_PASSWORD:
        return{
            ...state,
            password: action.payload.password
            
        }
        case loginTypes.UPDATE_CONFIRMATION_PASSWORD:
        return{
            ...state,
            confirmationPassword: action.payload.confirmationPassword
            
        }
        case loginTypes.UPDATE_NEW_PASSWORD:
        return{
            ...state,
            newPassword: action.payload.newPassword
        }
        case loginTypes.UPDATE_VERIFICATION_CODE:
        return{
            ...state,
            verificationCode: action.payload.verificationCode
        }
        case loginTypes.LOGIN:
        const username = '';
        const password = '';
        if (action.payload.credentials.challengeName === 'NEW_PASSWORD_REQUIRED') {
            return{

            ...state,
              cogUser: action.payload.credentials,
              passwordNeedsReset: true,
            }
         }
            else {
                return{
                    ...state,
                    username: username,
                    password: password,
          }
            
        }
        case loginTypes.FAILED_LOGIN:
        return{
            ...state,
            incorrectUserPass: true,
        }
        

    }
    return{
           state 
    }
}