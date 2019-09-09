import { profileTypes } from "../../actions/profile/profile.actions";
import { profileUpdateReducer, blankUser } from "./profile.reducer";
import { IProfileUpdateState } from ".";

describe('Profile Reducer', () => {
    const initialState: IProfileUpdateState = {
        user: blankUser
    }

    // Ensure initial state is passed (default)
    it('Should return initial state', () => {
        const newInitialState = profileUpdateReducer(undefined, {});
        expect(newInitialState).toEqual(initialState);
    })

    it('Should return initial state if receiving type', () => {
        const mockUser = {
            ...initialState.user,
            email: 'test.gmail.com'
        }
        const newState = profileUpdateReducer(initialState, {
            payload: {
                ...initialState,
                user: mockUser
            },
            type: profileTypes.UPDATE_USER_PROFILE,
        })
        expect(newState.user.user).toEqual(mockUser);
    })

    it('Should return intial state if no type is received', () => {
        const newState = profileUpdateReducer(initialState, {
            payload: {
                ...initialState
            },
            type: profileTypes.UPDATE_USER_PROFILE_FAILED,
        })
        expect(newState).toEqual(initialState);
    })
})