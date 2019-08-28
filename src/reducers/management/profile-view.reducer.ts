import { IProfileViewState } from ".";
import { viewUserTypes } from "../../actions/view-user/view-user.actions";
import { profileTypes } from "../../actions/profile/profile.actions";

const initialState: IProfileViewState = {
    user: {
        userId: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        personalAddress: {
            addressId: 0,
            street: '',
            alias: '',
            city: '',
            state: '',
            country: 'United States',
            zip: ''
        },
        trainingAddress: {
            addressId: 0,
            street: '',
            alias: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        },
        userStatus: {
            statusId: 0,
            generalStatus: '',
            specificStatus: '',
<<<<<<< HEAD
            virtual: false
=======
            virtual: false     
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        },
        roles: []
    },
    bUserInfoChanged: false,
    locationDropdownActive: false,
    statusDropdownActive: false,
<<<<<<< HEAD
    cohortDropdownActive: false,
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    virtual: false
}

export const profileViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case viewUserTypes.VIEW_USER:
            return {
                ...state,
                user: action.payload.newUser
            }
        case profileTypes.UPDATE_USER_TRAINING_LOCATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    trainingAddress: action.payload.location,
                    bUserInfoChanged: true
                }
            }
        case profileTypes.UPDATE_USER_INFO:
            return {
                ...state,
                user: action.payload.user,
                bUserInfoChanged: true
            }
        case profileTypes.SET_TO_CURRENT_SMS_USER:
            return {
                ...state,
                user: action.payload.currentSMSUser
            }
        case profileTypes.TOGGLE_TRAINING_LOCATIONS_DROPDOWN:
            return {
                ...state,
                locationDropdownActive: !state.locationDropdownActive,
                bUserInfoChanged: true
            }
        case profileTypes.USER_UPDATE_SUCCESSFUL:
            return {
                ...state,
                user: action.payload.updatedUser,
                bUserInfoChanged: false
            }
        case profileTypes.TOGGLE_STATUS_DROPDOWN:
            return {
                ...state,
                statusDropdownActive: !state.statusDropdownActive,
                bUserInfoChanged: true
            }
<<<<<<< HEAD
        case profileTypes.TOGGLE_COHORT_DROPDOWN:
            return {
                ...state,
                cohortDropdownActive: !state.cohortDropdownActive,
                bUserInfoChanged: true
            }
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        case profileTypes.UPDATE_USER_STATUS:
            return {
                ...state,
                user: {
                    ...state.user,
<<<<<<< HEAD
                    userStatus: action.payload.status
                }
=======
                    userStatus: action.payload.status}
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            }
        case profileTypes.UPDATE_VIRTUAL_STATUS_CHECKBOX:
            return {
                ...state,
                virtual: !state.virtual
            }
<<<<<<< HEAD


=======
    
    
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    }
    return state;
}