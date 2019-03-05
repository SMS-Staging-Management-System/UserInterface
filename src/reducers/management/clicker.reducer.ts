import { clickerTypes } from '../../actions/clicker/clicker.actions';
import { IClickerState } from '.';

const initialState: IClickerState = {
  clicks: 0
}

export const clickerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case clickerTypes.INCREMENT:
      return {
        ...state,
        clicks: action.payload.amount + state.clicks
      }
  }
  return state;
}
