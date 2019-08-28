import { ICurrentSMSUserState } from ".";
import { authTypes } from "../../actions/auth/auth.actions";
import { currentSMSUserTypes } from "../../actions/current-sms-user/current-sms-user.actions";

const initialState: ICurrentSMSUserState = {
    currentSMSUser: {
        trainingAddress: {
            addressId: 0,
            street: '',
            alias: '',
            city: '',
            country: '',
            state: '',
            zip: '',
        },
        personalAddress: {
            addressId: 0,
            street: '',
            alias: '',
            city: '',
            country: '',
            state: '',
            zip: '',
        },
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        userId: 0,
        roles: [],
        userStatus: {
            statusId: 0,
            generalStatus: '',
            specificStatus: '',
            virtual: false
        }
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
                    //...state.currentSMSUser,
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