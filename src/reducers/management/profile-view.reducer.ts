import { IProfileViewState } from ".";
import { viewUserTypes } from "../../actions/view-user/view-user.actions";

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
    }
}

export const profileViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (viewUserTypes.GET_USER_INFO):
            return {
                ...state,
                user: action.payload.newUser
            }
    }
    return state;
}