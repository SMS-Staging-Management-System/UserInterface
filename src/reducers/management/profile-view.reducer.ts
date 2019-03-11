import { IProfileViewState } from ".";
import { profileTypes } from "../../actions/profile/profile.actions";

const initialState: IProfileViewState = {
    user: {
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
    },
    bIsLoggedInUser: true 
}

export const profileViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (profileTypes.VIEW_PROFILE):
            return {
                ...state,
                user: action.payload.user
            }
    }
    return state;
}