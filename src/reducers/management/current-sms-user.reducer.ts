import { ICurrentSMSUserState } from ".";
import { authTypes } from "../../actions/auth/auth.actions";
import { currentSMSUserTypes } from "../../actions/current-sms-user/current-sms-user.actions";


const initialState: ICurrentSMSUserState = {
    currentSMSUser: {
        userId: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: {
            addressId: 0,
            street: '',
            alias: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        },
        roles: []
    }
}

export const currentSMSUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (authTypes.UPDATE_CURRENT_USER):
            return {
                ...state,
                currentSMSUser: {
                    ...state.currentSMSUser,
                    email: action.payload.currentUser.email,
                    roles: action.payload.currentUser.roles
                }

            }

        case (currentSMSUserTypes.GET_USER_INFO): 
            return {
                ...state,
                currentSMSUser: {
                    ...state.currentSMSUser,
                    ...action.payload.user,
                    roles: state.currentSMSUser.roles
                }
            }
        case (currentSMSUserTypes.UPDATE_CURRENT_SMS_USER): {
            return {
                ...state,
                currentSMSUser: {
                    ...state.currentSMSUser,
                    ...action.payload.updatedUser,
                    roles: state.currentSMSUser.roles
                }
            }
        }

        case (authTypes.LOGOUT):
            return initialState;
        
    }
    return state;
}