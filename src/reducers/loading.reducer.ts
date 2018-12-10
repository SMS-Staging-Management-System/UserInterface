import { loadingTypes } from '../actions/loading/loading.actions';
import { ILoadingState } from '.';

const initialState: ILoadingState = {
  isLoading: false
}

export const loadingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case loadingTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
  }
  return state;
}