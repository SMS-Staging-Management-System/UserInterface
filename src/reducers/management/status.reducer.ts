import { IStatusState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';
import { statusTypes } from '../../actions/status/status.actions';


const initialState: IStatusState = {
    userStatus: [],
    
}

export const statusReducer = (state = initialState, action: any): IStatusState => {
  switch (action.type) {
    case statusTypes.UPDATE_USER_STATUSES:
      return {
        ...state,
        userStatus: action.payload.statuses
      }
    case authTypes.LOGOUT: 
      return initialState
  }
  return state;
}