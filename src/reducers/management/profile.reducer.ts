import { IProfileUpdateState } from ".";
import { profileTypes } from "../../actions/profile/profile.actions";

const initialState: IProfileUpdateState = {
    user: {
        email: '',
        firstName: '',
        lastName: '',
        personalAddress: {
            addressId: 0,
            alias: '',
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        phoneNumber: '',
        roles: [],
        trainingAddress: {
            addressId: 0,
            alias: '',
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        userId: 0,
        userStatus: {
            generalStatus: '',
            specificStatus: '',
            statusId: 0,
            virtual: false
        }
    }
}

export const profileUpdateReducer  = (state = initialState, action: any) => {
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