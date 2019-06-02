import { IManageUsersState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';
import { manageUsersTypes } from '../../actions/manage-users/manage-users.actions';

const initialState: IManageUsersState = {
    manageUsers: [],
    manageUsersCurrentPage: 0,
    manageUsersPageTotal: 0,
    emailSearch: '',
    option: 'all'
}

export const manageUsersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case manageUsersTypes.GET_USERS:
            return {
                ...state,
                manageUsers: action.payload.manageUsers,
                manageUsersCurrentPage: action.payload.manageUsersCurrentPage,
                manageUsersPageTotal: action.payload.manageUsersPageTotal
            }
        case manageUsersTypes.UPDATE_SEARCH_EMAIL:
            return {
                ...state,
                emailSearch: action.payload.newEmailSearch
            }
        case manageUsersTypes.UPDATE_SEARCH_OPTION:
            return {
                ...state,
                option: action.payload.option
            }
        case authTypes.LOGOUT:
            return initialState;
    }
    return state;
}
