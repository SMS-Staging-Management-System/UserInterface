import { IProfileUpdateState } from ".";
import { profileTypes } from "../../actions/profile/profile.actions";
import { blankUser } from "../../components/profile/profile.component";

const initialState: IProfileUpdateState = {
    user: blankUser
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