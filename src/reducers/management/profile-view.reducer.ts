import { IProfileViewState } from ".";
import { viewUserTypes } from "../../actions/view-user/view-user.actions";

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
        status: {
            statusId: 0,
            genericStatus: '',
            specificStatus: '',
            virtual: false     
        },
        roles: []
    }
}

export const profileViewReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (viewUserTypes.VIEW_USER):
            return {
                ...state,
                user: action.payload.newUser
            }
    }
    return state;
}