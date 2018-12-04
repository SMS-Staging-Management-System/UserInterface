import { managerTypes } from '../actions/manager/manager.actions';
import { IManagerState } from '.';

const initialState: IManagerState = {
  classes:  [],
  checkIns: [], // checkin objects
  checkInsFilter: []
}

export const managerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case managerTypes.INIT:
      return {
        ...state,
        classes:  action.payload.classes,
        checkIns: action.payload.checkIns
      }
  }
  return state;
}