import { associateTypes } from '../actions/associate/associate.actions';
import { IAssociateState } from '.';

const initialState: IAssociateState = {
  checkIns: [], // checkin objects
  currentCheckIns: []
}

export const associateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case associateTypes.INIT:
      return {
        ...state,
        checkIns: action.payload.checkIns
      }
  }
  return state;
}