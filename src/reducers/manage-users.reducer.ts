import { IManageUsersState } from '.';
import { authTypes } from '../actions/auth/auth.actions';
import { manageUsersTypes } from '../actions/manage-users/manage-users.actions';

const initialState: IManageUsersState = {
  manageUsers: []
}

export const manageUsersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case manageUsersTypes.GET_USERS:
      return {
        ...state,
        manageUsers: action.payload.manageUsers
      }
    case authTypes.LOGOUT:
      return initialState;
  }
  return state;
}
