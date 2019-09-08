import { IProfileViewState } from ".";
import { viewUserTypes } from "../../actions/view-user/view-user.actions";
import { profileTypes } from "../../actions/profile/profile.actions.old";

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
            virtual: false
        },
        roles: []
    },
    bUserInfoChanged: false,
    locationDropdownActive: false,
    statusDropdownActive: false,
    cohortDropdownActive: false,
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
        case profileTypes.TOGGLE_COHORT_DROPDOWN:
            return {
                ...state,
                cohortDropdownActive: !state.cohortDropdownActive,
                bUserInfoChanged: true
            }
        case profileTypes.UPDATE_USER_STATUS:
            return {
                ...state,
                user: {
                    ...state.user,
                    userStatus: action.payload.status
                }
            }
        case profileTypes.UPDATE_VIRTUAL_STATUS_CHECKBOX:
            return {
                ...state,
                virtual: !state.virtual
            }
    }
    return state;
}