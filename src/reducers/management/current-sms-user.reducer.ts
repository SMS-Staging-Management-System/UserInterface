import { ICurrentSMSUserState } from ".";
import { authTypes } from "../../actions/auth/auth.actions";
import { currentSMSUserTypes } from "../../actions/current-sms-user/current-sms-user.actions";

const initialState: ICurrentSMSUserState = {
<<<<<<< HEAD
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
=======
    currentSMSUser:  {
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
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        },
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        userId: 0,
        roles: [],
        userStatus: {
<<<<<<< HEAD
            statusId: 0,
            generalStatus: '',
            specificStatus: '',
            virtual: false
        }
    }
=======
          statusId: 0,
          generalStatus: '',
          specificStatus: '',
          virtual: false
        }
      }
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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

<<<<<<< HEAD
        case (currentSMSUserTypes.GET_USER_INFO):
            return {
                ...state,
                currentSMSUser: {
                    //...state.currentSMSUser,
=======
        case (currentSMSUserTypes.GET_USER_INFO): 
            return {
                ...state,
                currentSMSUser: {
                    ...state.currentSMSUser,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
<<<<<<< HEAD

=======
        
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    }
    return state;
}