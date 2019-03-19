import { IStatusState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';
import { profileTypes } from '../../actions/profile/profile.actions';

const initialState: IStatusState = {
    userStatus: []
}

export const statusReducer = (state = initialState, action: any): IStatusState => {
  switch (action.type) {
    case profileTypes.UPDATE_USER_STATUS:
      return {
        ...state,
        userStatus: action.payload.statuses
      }
    case authTypes.LOGOUT: 
      return initialState
  }
  return state;
}