import { ISCProfileUpdateState } from ".";
import { profileTypes } from "../../actions/profile/sc.profile.actions";

const initialState: ISCProfileUpdateState = {
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
            country: '',
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
    }
}

export const scProfileViewReducer  = (state = initialState, action: any) => {
    switch (action.type) {
        case profileTypes.UPDATE_USER_PROFILE:
            return {
                ...state,
                user: action.payload
            };
        case profileTypes.UPDATE_USER_PROFILE_FAILED:
            return {
                ...state
            };
    }
    return state;
}