import { profileTypes } from "../../actions/profile/profile.actions";
import { profileUpdateReducer } from "./profile.reducer";
import { IProfileUpdateState } from ".";

describe('Profile Reducer', () => {
    let initialState: IProfileUpdateState = {
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
            type: profileTypes.UPDATE_USER_PROFILE,
            payload: {
                ...initialState,
                user: mockUser
            }
        })
        expect(newState.user.user).toEqual(mockUser);
    })

    it('Should return intial state if no type is received', () => {
        const newState = profileUpdateReducer(initialState, {
            type: profileTypes.UPDATE_USER_PROFILE_FAILED,
            payload: {
                ...initialState
            }
        })
        expect(newState).toEqual(initialState);
    })
})