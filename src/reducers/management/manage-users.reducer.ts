import { IManageUsersState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';
import { manageUsersTypes } from '../../actions/manage-users/manage-users.actions';

const initialState: IManageUsersState = {
    manageUsers: [],
    manageUsersCurrentPage: 0,
    manageUsersPageTotal: 0,
    emailSearch: '',
    option: 'All',
    componentLoaded: false,
    userTableSort: 'sorted',
    emailList: [],
    adminResponse: 0,
    trainerResponse: 0,
    stagingManagerResponse: 0,
    maxPage: 0 ,
    areMore: false
}

export const manageUsersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case manageUsersTypes.GET_USERS:
            return {
                ...state,
                manageUsers: action.payload.manageUsers,
                manageUsersCurrentPage: action.payload.manageUsersCurrentPage,
                manageUsersPageTotal: action.payload.manageUsersPageTotal,
                areMore: action.payload.areMore,
                componentLoaded: true
            }
        case manageUsersTypes.UPDATE_SEARCH_EMAIL:
            return {
                ...state,
                emailSearch: action.payload.emailSearch
            }
        case manageUsersTypes.UPDATE_EMAIL_LIST:
            return {
                ...state,
                emailList: action.payload.emailList
            }
        case manageUsersTypes.GET_USERS_SORTED:
            return {
                ...state,
                manageUsers: action.payload.manageUsers,
                componentLoaded: true,
                userTableSort: action.payload.userTableSort
            }
        case manageUsersTypes.UPDATE_SEARCH_OPTION:
            return {
                ...state,
                option: action.payload.option
            }
        case manageUsersTypes.UPDATE_ADMIN_RESPONSE:
            return {
                ...state,
                adminResponse: action.payload.adminResponse
            }
        case manageUsersTypes.UPDATE_TRAINER_RESPONSE:
            return {
                ...state,
                trainerResponse: action.payload.trainerResponse
            }
        case manageUsersTypes.UPDATE_STAGING_MANAGER_RESPONSE:
            return {
                ...state,
                stagingManagerResponse: action.payload.stagingManagerResponse
            }
        case manageUsersTypes.UPDATE_MAX_PAGE:
            return {
                ...state,
                maxPage: action.payload.maxPage
            }
        case authTypes.LOGOUT:
            return initialState;
    }
    return state;
}