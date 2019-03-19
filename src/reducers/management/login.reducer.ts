import { ILoginState } from ".";
import { loginTypes } from "../../actions/login/login.action";

const initialState: ILoginState = {
    username: '',
    password: '',
    cogUser: {
        email: '',
        roles: [],
    },
    incorrectUserPass: false,
    passwordNeedsReset: false,
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
    return state 
    
}